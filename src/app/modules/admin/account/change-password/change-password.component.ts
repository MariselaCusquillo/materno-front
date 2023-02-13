import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilService } from '../../../../services/util.service';
import { SecurityService } from '../../../../services/security.service';
import { functions } from '../../../../helpers/functions';
import { IChangePassword } from '../../../../interfaces/profile.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formSubmitted = false;

  public formInsert = this._form.group({

    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(10)]],
    confirmPassword: ['', [Validators.required,Validators.minLength(10)]],

  })

  constructor(
    private _utilService: UtilService,
    private _form : FormBuilder,
    private _securityService: SecurityService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  //MSM si quiere cambiar la contraseña
  confirmChange(){
    this.formSubmitted = true;

    //formulario válido
    if(this.formInsert.invalid){
      this._utilService.warningToast("El formulario es inválido","Advertencia");
      return;

    }
    this._utilService.confirmationAlert("¿Estás seguro de cambiar la contraseña?",()=>this.changePassword());
  }

  async changePassword(){
    this.formSubmitted = true;
    if(this.formInsert.invalid){
      return;

    }




   //Verifico si cambio imagen presentacion
   const password: IChangePassword ={
     oldPassword: this.formInsert.controls['oldPassword'].value,
     newPassword: this.formInsert.controls['newPassword'].value,

   }

    const codigo = await this._utilService.getUserUid();
    this._securityService.actualizarContrasena(Number(codigo),password).subscribe(async (res: any) =>{
      if(res.success){

       await this._utilService.confirmBeforeSucces("Por su seguridad ¿Desea cerrar sesión?",()=> this.logout(),"Contraseña actualizada")

      }else{
        this._utilService.addMessageInfo("Usuario y contraseña no coinciden","Advertencia")
      }

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

  logout(){
     localStorage.clear();
     this.route.navigate(['/login']);
  }


}
