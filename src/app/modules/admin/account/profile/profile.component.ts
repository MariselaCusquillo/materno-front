import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '../../../../services/security.service';
import { UtilService } from '../../../../services/util.service';
import { functions } from '../../../../helpers/functions';
import { INewUSer, IChangeDataUser } from '../../../../interfaces/profile.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formSubmitted = false;
  //Variables

  codigo='';
  user = '';
  tipologia= '';
  tipo_usuario ='';
  tipo_atencion = '';
  establecimiento= '';
  provincia= '';
  distrito= '';


  public formInsert = this._form.group({
    user: ['', [Validators.required]],
    tipologia: ['', [Validators.required]],
    tipo_usuario: ['', [Validators.required]],
    tipo_atencion: ['', [Validators.required]],
    establecimiento: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    distrito: ['', [Validators.required]]
  })


  constructor(
    private _form : FormBuilder,
    private _securityService: SecurityService,
    private _utilService: UtilService,
) { }

  ngOnInit(): void {
    const ide = this._utilService.getUserUid();
    this.getUserId(ide)
  }


  async getUserId(ide: string | any){
    (await this._securityService.getUserId(ide)).subscribe((resp: any) => {
      this.codigo= resp[0].ide_segusu,
      this.user= resp[0].user,
      this.tipologia = resp[0].tipologia,
      this.tipo_usuario = resp[0].tipo_usuario,
      this.tipo_atencion = resp[0].tipo_atencion,
      this.establecimiento = resp[0].establecimiento,
      this.provincia = resp[0].provincia,
      this.distrito = resp[0].distrito,

      this.formInsert.patchValue({user:this.user, tipologia:this.tipologia, tipo_usuario: this.tipo_usuario,
                                tipo_atencion:this.tipo_atencion, establecimiento:this.establecimiento, provincia: this.provincia, 
                              distrito:this.distrito});
    });

  }

  invalidField(field:string){

		return functions.invalidField(field, this.formInsert, this.formSubmitted);

	}

  

  save(){

    this.formSubmitted = true;
   if(this.formInsert.invalid){
     return;
   }
 
  const user: IChangeDataUser ={
    user: this.formInsert.controls['user'].value,
    tipologia: this.formInsert.controls['tipologia'].value,
    tipo_usuario: this.formInsert.controls['tipo_usuario'].value,
    tipo_atencion: this.formInsert.controls['tipo_atencion'].value,
    establecimiento: this.formInsert.controls['establecimiento'].value,
    provincia: this.formInsert.controls['provincia'].value,
    distrito: this.formInsert.controls['distrito'].value
    
  }




   this._securityService.actualizarDatos(String(this.codigo),user).subscribe(res =>{

     this._utilService.addMessageSuccess('Dactos actualizados correctamente',"Exito");

   });

 }


}
