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

  loadData: boolean = false;
  

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
    'accion'
    ];

    //VAriable para definir pantalla
  screenSize: boolean = false;
  
  //variable global para  mostrar tabla
  dataSource!: MatTableDataSource<IUser>;
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
    (await this._inventoryService.getAllUsuario()).subscribe((resp: any) => {
      //console.log(resp);
      let posicion = 1;
      this.usuarios = Object.keys(resp).map(a => ({
        codigo: resp[a].id_usuario,
        posicion: posicion++,
        user: resp[a].user,
        tipologia: resp[a].tipologia,
        tipo_usuario: resp[a].tipo_usuario,
        tipo_atencion: resp[a].tipo_atencion,
        establecimiento: resp[a].establecimiento,
        provincia: resp[a].provincia,
        distrito: resp[a].distrito,
        role: resp[a].role,
        
      } as IUser));
      this.dataSource = new MatTableDataSource(this.usuarios);

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
    this._inventoryService.eliminarUsario(ide).subscribe((resp: any) => {
      this._utilService.addMessageSuccess('Registro eliminado correctamente', 'Exito');
      this.inicializarData();
    });
  }


}
