import { Component } from '@angular/core';
import {  OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/app/interfaces/usuarios';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InventoryService } from '../../../../services/inventory.service';
import { UtilService } from '../../../../services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { functions } from '../../../../helpers/functions';
import { EditUsuariosComponent } from './edit-usuarios/edit-usuarios.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  //array que almacenaproductos
  usuarios: IUser[] = [];
  

  //columnas tabla
  displayedColumns: string[] = [
    'posicion',
    'user',
    'tipologia',
    'tipo_usuario',
    'tipo_atencion',
    'establecimiento',
    'provincia',
    'distrito',
    'role',
    ];

    //VAriable para definir pantalla
  screenSize: boolean = false;
  
  //variable global para  mostrar tabla
  dataSource!: MatTableDataSource<IUser>;

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
    (await this._inventoryService.getAllUsuario()).subscribe((resp: any) => {
      let posicion = 1;
      this.usuarios = Object.keys(resp.data).map(a => ({
        codigo: resp.data[a].id_usuario,
        posicion: posicion++,
        user: resp.data[a].user,
        tipologia: resp.data[a].tipologia,
        tipo_usuario: resp.data[a].tipo_usuario,
        tipo_atencion: resp.data[a].tipo_atencion,
        establecimiento: resp.data[a].establecimiento,
        provincia: resp.data[a].provincia,
        distrito: resp.data[a].distrito,
        role: resp.data[a].role,
        
      } as IUser));
      this.dataSource = new MatTableDataSource(this.usuarios);
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  abrirEditar(id: string) {

    const dialogRef = this.dialog.open(EditUsuariosComponent, {

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


  delete (ide: string, user: string) {
    this._utilService.confirmationAlert(`¿Desea eliminar el usuario ${user}?`, () => this.deleteUsuarios(ide));
  
  }
  
  deleteUsuarios(ide: string) {
    this._inventoryService.eliminarEstablecimientos(ide).subscribe((resp: any) => {
      this._utilService.addMessageSuccess(resp.message, 'Exito');
      this.inicializarData();
    });
  }


}
