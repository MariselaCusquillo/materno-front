import { Injectable } from '@angular/core';
import { map, throwError } from 'rxjs';
import { MethodsService } from './methods.service';
import { UtilService } from './util.service';
import { IResultData } from '../interfaces/result';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUpdateUser } from '../interfaces/usuarios';
import { IEstablecimientos, IEditEstablecimientos } from '../interfaces/establecimientos';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  api_url = environment.API_URL;
  constructor(private _methodService: MethodsService,
    private _utilService: UtilService,
    private http: HttpClient,
    private spinner: NgxSpinnerService) { }

  /**
   * 
   * @returns
   */
  getAllUsuario() {
    this.spinner.show();
    return this._methodService.get('user/listar').pipe(
      finalize(() => this.spinner.hide()),
      map((resp) => {
        return resp as IResultData;
      }),
      catchError(err => {
        this._utilService.addErrorMessage('ERROR', err.message);
        return throwError(err);
      })
    );
  }

  /**
   *
   * @returns 
   */
  getEstablecimientosDrop() {
    return this._methodService.get('establecimientos/listar').pipe(
      map((resp) => {
        return resp as IResultData;
      }),
      catchError(err => {
        this._utilService.addErrorMessage('ERROR', err.message);
        return throwError(err);
      })
    );
  }

  crearUsario(usuario: any) {
    this.spinner.show();
    return this._methodService.post('user/register', usuario).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }

  /**
   *
   * @param ide 
   * @returns
   */
  eliminarUsario(id: string) {
    this.spinner.show();
    return this._methodService.delete(`user/delete/${id}`).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }
  /**
   *
   * @param ide 
   * @returns 
   */

getUsuarioId(ide: string) {
    this.spinner.show();
    return this._methodService.get(`user/buscar/${ide}`).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
          return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }

  actualizarUsuario(ide: string, usuario: IUpdateUser) {
    this.spinner.show();
    return this._methodService.patch(`user/update/${ide}`,usuario).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }

  /**
   *
   * @returns 
   */

  getAllEstablecimientos() {
    this.spinner.show();
    return this._methodService.get(`establecimientos/listar`).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }

   /**
   *
   * @param ide identificador principal 
   * @returns 
   */
  eliminarEstablecimientos(ide: string) {
    this.spinner.show();
    return this._methodService.delete(`establecimientos/eliminar/${ide}`).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }

  crearEstablecimientos(establecimientos: any) {

    this.spinner.show();
    return this._methodService.post('establecimientos/crear', establecimientos).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }

  getEstablecimientosId(ide: any) {

    this.spinner.show();
    return this._methodService.get(`establecimientos/buscar/${ide}`).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }

  actualizarEstablecimientos(ide: string, establecimientos: IEditEstablecimientos) {

    this.spinner.show();
    return this._methodService.post(`establecimientos/update/${ide}`,establecimientos).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage(err.message, 'Error');
        return throwError(err);
      })
    )
  }



}
