import { Component, OnInit } from '@angular/core';
import { functions } from '../../../../../helpers/functions';
import { INewEstablecimientos } from 'src/app/interfaces/establecimientos';

import { UtilService } from '../../../../../services/util.service';
import { InventoryService } from '../../../../../services/inventory.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-establecimientos',
  templateUrl: './new-establecimientos.component.html',
  styleUrls: ['./new-establecimientos.component.css']
})
export class NewEstablecimientosComponent implements OnInit {



  formSubmitted = false;


  establecimientos: any = [];


  public formInsert = this._form.group({

    establecimiento: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    distrito: ['',[Validators.required]],
    tipo_atencion: ['',[Validators.required]],
    eod: ['',[Validators.required]],
    tipologia: ['',[Validators.required]],

  })

  
  constructor(
    private _form : FormBuilder,
    private _inventoryService: InventoryService,
    private _utilService: UtilService,
    public dialogRef: MatDialogRef<NewEstablecimientosComponent>
  ) { }

  ngOnInit(): void {
  }

 //TODO: Actualiza los datos
  save(){


     this.formSubmitted = true;
    if(this.formInsert.invalid){
      this._utilService.warningToast('El formulario es inválido','Advertencia');
      return;
    }

    const establecimiento: INewEstablecimientos ={

      establecimiento: this.formInsert.controls['establecimiento'].value,
      provincia: this.formInsert.controls['provincia'].value,
      distrito: this.formInsert.controls['distrito'].value,
      tipo_atencion: this.formInsert.controls['tipo_atencion'].value,
      eod: this.formInsert.controls['eod'].value,
      tipologia: this.formInsert.controls['tipologia'].value,

    }
      this._inventoryService.crearEstablecimientos(establecimiento).subscribe(res =>{
      this.dialogRef.close();
      this._utilService.addMessageSuccess('Establecimiento creado correctamente',"Éxito");
    });

  }

  invalidField(field:string){

		return functions.invalidField(field, this.formInsert, this.formSubmitted);

	}

  closeDialog() {
    this.dialogRef.close('Cierro!');
  }


}
