import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { functions } from 'src/app/helpers/functions';
import { ILogin } from 'src/app/interfaces/login';
import { AuthService } from '../../../../services/auth.service';
import { UtilService } from '../../../../services/util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
	
  //validar formulario
	formSubmitted = false;

	constructor(private form: FormBuilder,
     private _authService: AuthService,
     private router: Router,
     private _utilService:UtilService) {
      this.signInForm = this.form.group({

        user: ['maria', Validators.required],
        password: ['maria12', Validators.required]

      })
     }

	ngOnInit(): void {
	}

	
	//login

	login(){
	
		// Valida que el formulario haya sido enviado

		this.formSubmitted = true;

		//Valida que el formulario esté correcto

		if(this.signInForm.invalid){

			return;
		}
		
		//Captura la información del formulario 
	
		const data: ILogin = {

			user: this.signInForm.controls['user'].value,
			password: this.signInForm.controls['password'].value,
			
		}


      const password: string = this.signInForm.controls['password'].value;

      // desabilita el formulario 
      this.signInForm.disable();

      // Sign in
      this._authService.signIn(this.signInForm.value).subscribe(
          (res:any) => {

              this.signInForm.enable();

			  //cambio de ruta

              this.router.navigate(['private']);
          }, (response:any) => {
  
              this.signInForm.enable();
              this._utilService.addErrorMessage(response.error.message, 'Error')

          });

	}

	//valida el formulario

	invalidField(field:string){

		return functions.invalidField(field, this.signInForm, this.formSubmitted);

	}


}
