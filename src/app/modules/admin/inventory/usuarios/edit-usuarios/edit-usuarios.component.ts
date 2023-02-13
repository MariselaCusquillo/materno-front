import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../../../../services/inventory.service';
import { UtilService } from '../../../../../services/util.service';

import { functions } from '../../../../../helpers/functions';
import { IUpdateUser } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit-usuarios.component.html',
  styleUrls: ['./edit-usuarios.component.css']
})
export class EditUsuariosComponent {

  formSubmitted = false;

  //Variables

  codigo='';
  user ='';
  tipologia='';
  tipo_usuario='';
  tipo_atencion='';
  establecimiento='';
  provincia='';
  distrito='';
  role='';
  


  public formInsert = this._form.group({

    user: ['', [Validators.required]],
    tipologia: ['',[Validators.required]],
    tipo_usuario: ['',[Validators.required]],
    tipo_atencion: ['',[Validators.required]],
    establecimiento: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    distrito: ['',[Validators.required]],
    role: ['',[Validators.required]],
   

  })


  constructor(
    private _form : FormBuilder,
    private _inventoryService: InventoryService,
    public dialogRef: MatDialogRef<EditUsuariosComponent>,
    private _utilService: UtilService,
    //@Inject(MAT_DIALOG_DATA) public data:  IDialogData
    ) { }

  ngOnInit(): void {
    //this.usuariosById(this.data.id)

  }


  async usuariosById(ide: string){

    (await this._inventoryService.getUsuarioId(ide)).subscribe((resp: any) => {
      
      this.codigo= resp.data[0].id_usuario,
      this.user= resp.data[0].user,
      this.tipologia = resp.data[0].tipologia,
      this.tipo_usuario = resp.data[0].tipo_usuario,
      this.tipo_atencion = resp.data[0].tipo_atencion,
      this.establecimiento= resp.data[0].establecimiento,
      this.provincia = resp.data[0].provincia,
      this.distrito = resp.data[0].distrito,
      this.role = resp.data[0].role,
      

      this.formInsert.patchValue({
        user:this.user, 
        tipologia: this.tipologia,
        tipo_usuario: this.tipo_usuario,
        tipo_atencion: this.tipo_atencion,
        establecimiento:this.establecimiento, 
        provincia:this.provincia, 
        distrito: this.distrito,
        role: this.role,
        });
    });

  }


  invalidField(field:string){

		return functions.invalidField(field, this.formInsert, this.formSubmitted);

	}

  save(){

    this.formSubmitted = true;
   if(this.formInsert.invalid){
     this._utilService.warningToast('El formulario es inválido','Advertencia');
     return;

   }

   const usuario: IUpdateUser ={
     
    user: this.formInsert.controls['user'].value,
    tipologia: this.formInsert.controls['tipologia'].value,
    tipo_usuario: this.formInsert.controls['tipo_usuario'].value,
    tipo_atencion: this.formInsert.controls['tipo_atencion'].value,
    establecimiento: this.formInsert.controls['establecimiento'].value,
    provincia: this.formInsert.controls['provincia'].value,
    distrito: this.formInsert.controls['distrito'].value,
    role: this.formInsert.controls['role'].value,
     
   }


    this._inventoryService.actualizarUsuario(String(this.codigo),usuario).subscribe(res =>{
     this.dialogRef.close();
     this._utilService.addMessageSuccess('Usuario actualizado correctamente',"Éxito");

   });

 }

 closeDialog() {
  this.dialogRef.close('Cierro!');
}

}
