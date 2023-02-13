import { FormGroup } from  '@angular/forms';

export class functions{

	//validar campos del formulario

	static invalidField(field:string, f:FormGroup, formSubmitted:boolean):boolean{

		if(formSubmitted && f.controls[field].invalid){

		   	return true;

		}else{

			return false;
		}

	}

  	//responsive screen

	static screenSize(minWidth:number, maxWidth:number):boolean{

		if(window.matchMedia(`(min-width:${minWidth}px) and (max-width:${maxWidth}px)`).matches){

			return true;

		}else{

			return false;
		}

	}

}


