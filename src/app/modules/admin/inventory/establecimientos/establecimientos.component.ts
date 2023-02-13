import { Component } from '@angular/core';
import {  OnInit, ViewChild } from '@angular/core';
import { IEstablecimientos } from 'src/app/interfaces/establecimientos';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InventoryService } from '../../../../services/inventory.service';
import { UtilService } from '../../../../services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { functions } from '../../../../helpers/functions';
import { NewEstablecimientosComponent } from './new-establecimientos/new-establecimientos.component';
import { EditEstablecimientosComponent } from './edit-establecimientos/edit-establecimientos.component';


@Component({
  selector: 'app-establecimientos',
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.css']
})
export class EstablecimientosComponent implements OnInit {

  //array que almacenaproductos
  establecimientos: IEstablecimientos[] = [];
  
  //imagen temporal

  //columnas tabla
  displayedColumns: string[] = [
    'posicion',
    'establecimiento',
    'provincia',
    'distrito',
    'tipo_atencion',
    'eod',
    'tipologia'];



  //VAriable para definir pantalla
  screenSize: boolean = false;
  
  //variable global para  mostrar tabla
  dataSource!: MatTableDataSource<IEstablecimientos>;

  constructor(
    private _inventoryService: InventoryService,
    private _utilService: UtilService,
    public dialog: MatDialog) {
  }

  async ngOnInit() {

    await this.inicializarData();

    //definir tamaño de

    if (functions.screenSize(0, 767)) {
      this.screenSize = true;
    } else {
      this.screenSize = false;

    }

  }


  async inicializarData() {
    (await this._inventoryService.getAllEstablecimientos()).subscribe((resp: any) => {
      let posicion = 1;
      this.establecimientos = Object.keys(resp.data).map(a => ({
        codigo: resp.data[a].id_establecimiento,
        posicion: posicion++,
        establecimiento: resp.data[a].establecimiento,
        provincia: resp.data[a].provincia,
        distrito: resp.data[a].distrito,
        tipo_atencion: resp.data[a].tipo_atencion,
        eod: resp.data[a].eod,
        tipologia: resp.data[a].tipologia,
      } as IEstablecimientos));
      this.dataSource = new MatTableDataSource(this.establecimientos);
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirIngreso() {
     const dialogRef = this.dialog.open(NewEstablecimientosComponent, {width:'100%'});

    dialogRef.afterClosed().subscribe(result =>{
				this.inicializarData();


		})
  }



  abrirEditar(id: number) {

    const dialogRef = this.dialog.open(EditEstablecimientosComponent, {

      width: '100%',
      data: {
        id: id
      }

    })

    /*=============================================
    Actualizar el listado de la tabla
    =============================================*/

    dialogRef.afterClosed().subscribe(result => {
        this.inicializarData();

    })

  }


  delete (ide: string, establecimiento: string) {
    this._utilService.confirmationAlert(`¿Desea eliminar el establecimiento ${establecimiento}?`, () => this.deleteEstablecimientos(ide));
  
  }
  
  deleteEstablecimientos(ide: string) {
    this._inventoryService.eliminarEstablecimientos(ide).subscribe((resp: any) => {
      this._utilService.addMessageSuccess(resp.message, 'Exito');
      this.inicializarData();
    });
  }


}
