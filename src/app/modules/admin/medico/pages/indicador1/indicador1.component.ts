import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { INewIndicador1 } from 'src/app/interfaces/indicador1';
import { InventoryService } from 'src/app/services/inventory.service';
import { MatDialogRef } from '@angular/material/dialog';
import { functions } from 'src/app/helpers/functions';

@Component({
  selector: 'app-indicador1',
  templateUrl: './indicador1.component.html',
  styleUrls: ['./indicador1.component.css']
})

export class Indicador1Component implements OnInit{
  formSubmitted = false;
  indicador1: any = [];

  public formInsert = this._form.group({

    zona: [,[Validators.required]],
    provincia: [,[Validators.required]],
    distrito: [,[Validators.required]],
    establecimiento: [,[Validators.required]],
    fecha: [,[Validators.required]],
    mes: [,[Validators.required]],
    responsable: [,[Validators.required]],
    fonendoscopio: [,[Validators.required]],
    tensiometro: [,[Validators.required]],
    cinta: [,[Validators.required]],
    balanza: [,[Validators.required]],
    termometro: [,[Validators.required]],
    promedio: [,[Validators.required]],

    lavado: [,[Validators.required]],
    basureros: [,[Validators.required]],
    fonendoscopioGine: [,[Validators.required]],
    tensiometroGine: [,[Validators.required]],
    termometroGine: [,[Validators.required]],
    lampara: [,[Validators.required]],
    camilla: [,[Validators.required]],
    corneta: [,[Validators.required]],
    cintaGine: [,[Validators.required]],
    papelera: [,[Validators.required]],
    guantes: [,[Validators.required]],
    soluciones: [,[Validators.required]],
    tirillas: [,[Validators.required]],
    especulos: [,[Validators.required]],
    espatulas: [,[Validators.required]],
    solucionesGine: [,[Validators.required]],
    hierro: [,[Validators.required]],
    promedioGine: [,[Validators.required]],

    numerador: [,[Validators.required]],
    denominador: [,[Validators.required]],
    promedioGeneral: [,[Validators.required]],


  })

  constructor(
    private _form : FormBuilder,
    private _inventoryService: InventoryService,
    private _utilService: UtilService,
    //public dialogRef: MatDialogRef<Indicador1Component>
  ) { }

  ngOnInit(): void {
    console.log('Ingreso');
  }

  //TODO: Actualiza los datos
  save(){


    this.formSubmitted = true;
   if(this.formInsert.invalid){
     this._utilService.warningToast('El formulario es inválido','Advertencia');
     return;
   }

   const indicador1: INewIndicador1 ={

      zona: this.formInsert.controls['zona'].value,
      provincia: this.formInsert.controls['provincia'].value,
      distrito: this.formInsert.controls['distrito'].value,
      establecimiento: this.formInsert.controls['establecimiento'].value,
      fecha: this.formInsert.controls['fecha'].value,
      mes: this.formInsert.controls['mes'].value,
      responsable: this.formInsert.controls['responsable'].value,
      fonendoscopio: this.formInsert.controls['fonendoscopio'].value,
      tensiometro: this.formInsert.controls['tensiometro'].value,
      cinta: this.formInsert.controls['cinta'].value,
      balanza: this.formInsert.controls['balanza'].value,
      termometro: this.formInsert.controls['termometro'].value,
      promedio: this.formInsert.controls['promedio'].value,

      lavado: this.formInsert.controls['lavado'].value,
      basureros: this.formInsert.controls['basureros'].value,
      fonendoscopioGine: this.formInsert.controls['fonendoscopioGine'].value,
      tensiometroGine: this.formInsert.controls['tensiometroGine'].value,
      termometroGine: this.formInsert.controls['termometroGine'].value,
      lampara: this.formInsert.controls['lampara'].value,
      camilla: this.formInsert.controls['camilla'].value,
      corneta: this.formInsert.controls['corneta'].value,
      cintaGine: this.formInsert.controls['cintaGine'].value,
      papelera: this.formInsert.controls['papelera'].value,
      guantes: this.formInsert.controls['guantes'].value,
      soluciones: this.formInsert.controls['soluciones'].value,
      tirillas: this.formInsert.controls['tirillas'].value,
      especulos: this.formInsert.controls['especulos'].value,
      espatulas: this.formInsert.controls['espatulas'].value,
      solucionesGine: this.formInsert.controls['solucionesGine'].value,
      hierro: this.formInsert.controls['hierro'].value,
      promedioGine: this.formInsert.controls['promedioGine'].value,

      numerador: this.formInsert.controls['numerador'].value,
      denominador: this.formInsert.controls['denominador'].value,
      promedioGeneral: this.formInsert.controls['promedioGeneral'].value,
   }

     
     this._inventoryService.crearIndicador1(indicador1).subscribe((res:any) =>{

     this._utilService.addMessageSuccess('Se ha registrado correctamente',"Éxito");
     this.formInsert.reset();
   });

 }

 invalidField(field:string){

  return functions.invalidField(field, this.formInsert, this.formSubmitted);

}
}
