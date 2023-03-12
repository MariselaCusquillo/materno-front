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
  
  loadData: boolean = false;

  //columnas tabla
  displayedColumns: string[] = [
    'posicion',
    'unicodigo',
    'establecimiento',
    'provincia',
    'canton',
    'parroquia',
    'distrito',
    'tipo_atencion',
    'eod',
    'tipologia',
    'accion'];



  //VAriable para definir pantalla
  screenSize: boolean = false;
  
  //variable global para  mostrar tabla
  dataSource!: MatTableDataSource<IEstablecimientos>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
    this.loadData = true;
    (await this._inventoryService.getAllEstablecimientos()).subscribe((resp:any) => {
      
      //console.log(resp);

      let posicion = 1;
      
      /*this.establecimientos = resp;

      this.establecimientos.forEach(element => {
        console.log('establecimiento=>',element);
      });

      this.dataSource = new MatTableDataSource(this.establecimientos);*/


      this.establecimientos = Object.keys(resp).map(a => ({
        codigo: resp[a].id_establecimiento,
        posicion: posicion++,
        unicodigo: resp[a].unicodigo,
        establecimiento: resp[a].establecimiento,
        provincia: resp[a].provincia,
        canton: resp[a].canton,
        parroquia: resp[a].parroquia,
        distrito: resp[a].distrito,
        tipo_atencion: resp[a].tipo_atencion,
        eod: resp[a].eod,
        tipologia: resp[a].tipologia,
      } as IEstablecimientos));
      this.dataSource = new MatTableDataSource(this.establecimientos);

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;
      this.loadData = false;
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



  abrirEditar(id: string) {

    //console.log(id);

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
      //console.log("entro a respuesta");
      this._utilService.addMessageSuccess('Registro eliminado correctamente','Éxito');
      this.inicializarData();
    });
  }


}
