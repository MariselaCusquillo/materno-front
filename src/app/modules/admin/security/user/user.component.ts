import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilService } from '../../../../services/util.service';
import { SecurityService } from '../../../../services/security.service';
import { Router } from '@angular/router';
import { IChangePassword, INewUSer } from '../../../../interfaces/profile.dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  user: any;
  password:any;

  formSubmitted = false;

  public formInsert = this._form.group({

    user: ['', [Validators.required]],
    password: ['', [Validators.required]],
    tipologia: ['', [Validators.required]],
    tipo_usuario: ['', [Validators.required]],
    tipo_atencion: ['', [Validators.required]],
    establecimiento: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    distrito: ['', [Validators.required]],
    role: ['', [Validators.required]],
    newPassword: [],
    confirmPassword:[]
  })

  constructor(
    private _utilService: UtilService,
    private _form : FormBuilder,
    private _securityService: SecurityService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  async save(){
    this.formSubmitted = true;
    if(this.formInsert.invalid){
      this._utilService.warningToast('El formulario es inválido','Advertencia');
      return;

    }

   const user: INewUSer  ={
     user: this.formInsert.controls['user'].value,
     password: this.formInsert.controls['password'].value,
     tipologia: this.formInsert.controls['tipologia'].value,
     tipo_atencion: this.formInsert.controls['tipo_atencion'].value,
     tipo_usuario: this.formInsert.controls['tipo_usuario'].value,
     establecimiento: this.formInsert.controls['establecimiento'].value,
     provincia: this.formInsert.controls['provincia'].value,
     distrito: this.formInsert.controls['distrito'].value,
     role: this.formInsert.controls['role'].value,
   }

   this.user = this.formInsert.controls['user'].value;
   this.password = this.formInsert.controls['password'].value;

     this._securityService.crearUsuario(user).subscribe(async (res: any) =>{
      this._utilService.addMessageSuccess(`Usuario creado <br>Nombre de usuario es: <strong style='color: red;'> ${this.user}</strong> <br> Contraseña del usuario es <strong style='color: red;'> ${this.password}</strong>`,'Exito')
    });

  }

  getErrorMessage(campo: string, campo2?: string){
    let message;
    if(this.formInsert.get(campo)?.hasError('required')){
      message = 'Este campo es obligatorio';
    }else if(this.formInsert.get(campo)?.hasError('minlength')){
      const minLength = this.formInsert.get(campo)?.errors?.['minlength'].requiredLength;
      message = `Debe ingresar mínimo ${minLength} caracteres`;
    }
    return (message);
  }
  ifEqualsPassword(newPassword:string, confirmPassword:string){
    return((this.formInsert.get(newPassword)?.value != this.formInsert.get(confirmPassword)?.value) && this.formInsert.get(newPassword)?.touched && this.formInsert.get(confirmPassword)?.touched);
  }
    isInvalidField(campo: string){
    return (this.formInsert.get(campo)?.invalid && this.formInsert.get(campo)?.touched);
  }

  validatePassword(campo:string, campo2: string){
   return (this.formInsert.controls['newPassword'].value == this.formInsert.controls['confirmPassword'].value);
  }



}
