import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../../../../services/inventory.service';
import { UtilService } from '../../../../../services/util.service';
import { functions } from '../../../../../helpers/functions';
import { IEditEstablecimientos } from 'src/app/interfaces/establecimientos';

interface IDialogData {id: string}


@Component({
  selector: 'app-edit-establecimientos',
  templateUrl: './edit-establecimientos.component.html',
  styleUrls: ['./edit-establecimientos.component.css']
})
export class EditEstablecimientosComponent implements OnInit {



  formSubmitted = false;


  //Variables

  codigo='';
  establecimiento='';
  provincia='';
  distrito='';
  tipo_atencion='';
  eod='';
  tipologia='';


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
    public dialogRef: MatDialogRef<EditEstablecimientosComponent>,
    private _utilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data:  IDialogData
    ) { }

  ngOnInit(): void {
    this.establecimientosById(this.data.id)

  }


  async establecimientosById(ide: string){
    (await this._inventoryService.getEstablecimientosId(ide)).subscribe((resp: any) => {
      
      //console.log(resp);
      this.codigo= resp.id_establecimiento,
      this.establecimiento= resp.establecimiento,
      this.provincia = resp.provincia,
      this.distrito = resp.distrito,
      this.tipo_atencion = resp.tipo_atencion,
      this.eod = resp.eod,
      this.tipologia = resp.tipologia,

      this.formInsert.patchValue({
        establecimiento:this.establecimiento, 
        provincia:this.provincia, 
        distrito: this.distrito,
        tipo_atencion: this.tipo_atencion,
        eod: this.eod,
        tipologia: this.tipologia,});
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

   const establecimiento: IEditEstablecimientos ={
     
    establecimiento: this.formInsert.controls['establecimiento'].value,
     provincia: this.formInsert.controls['provincia'].value,
     distrito: this.formInsert.controls['distrito'].value,
     tipo_atencion: this.formInsert.controls['tipo_atencion'].value,
     eod: this.formInsert.controls['eod'].value,
     tipologia: this.formInsert.controls['tipologia'].value,


   }


    this._inventoryService.actualizarEstablecimientos(String(this.codigo),establecimiento).subscribe(res =>{
     this.dialogRef.close();
     this._utilService.addMessageSuccess('Establecimiento actualizado correctamente',"Exito");

   });

 }

 closeDialog() {
  this.dialogRef.close();
}


}
