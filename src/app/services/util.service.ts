import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private _helper = new JwtHelperService();
  constructor(private toastr: ToastrService) { }

  /**
   * Error message alert
   * @param message
   * @param title
   */
    addErrorMessage(message: string, title?: string): void {
    if (!this.isUndefined(title)) {
      title = 'Error';
    }
    Swal.fire({
      icon: 'error',
      title: title,
      html: message,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
    });
  }
  /**
   * Warning message alert
   * @param message
   * @param title
   */
  addWarningMessage(message: string, title?: string): void {
    if (!this.isUndefined(title)) {
      title = 'Advertencia';
    }
    Swal.fire({
      icon: 'warning',
      title: title,
      html: message,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
    });
  }

  /**
   * Success message alert
   * @param message
   * @param title
   */
  addMessageSuccess(message: string, title?: string): void {
    if (!this.isUndefined(title)) {
      title = 'Éxito';
    }
    Swal.fire({
      icon: 'success',
      title: title,
      html: message,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
    });
  }

  addMessageInfo(message: string, title?: string): void {
    if (!this.isUndefined(title)) {
      title = 'Información';
    }
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
    });
  }

  /**
   * Confirmation alert
   * @param message
   * @param callback
   * @param title
   */
  confirmationAlert(message: string, callback: any, title?: string) {
    if (!this.isUndefined(title)) {
      title = 'Confirmar';
    }
    Swal.fire({
      title: title,
      icon: 'question',
      html: message,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText:
        '<span class="ion-padding-horizontal"></span> Aceptar <span class="ion-padding-horizontal"></span> ',
      confirmButtonAriaLabel: 'Aceptar',
      cancelButtonText:
        '<span class="ion-padding-horizontal"></span>  Cancelar <span class="ion-padding-horizontal"></span> ',
      cancelButtonAriaLabel: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  isUndefined(variable: any): boolean {
    return typeof variable !== 'undefined' && variable !== null;
  }

  getUserUid(): string {
    const token = this.decodeToken();
    //console.log('token=>',token);
    return token.id_usuario  || -1;
  }
  
  getUsername(): string {
    const token = this.decodeToken();
    //use
    return token.user || -1;
  }

    /**
   * Retorna el token decodificado
   * @returns
   */
     private decodeToken(): any {
      if (localStorage.getItem('accessToken')) {
        return this._helper.decodeToken(localStorage.getItem('accessToken') || '{}');
      }
      return null;
    }

    successToast(message: string,title: string) {
      this.toastr.success(message,title);
    }

    warningToast(message: string,title: string) {
      this.toastr.warning(message,title);
    }

    errorToast(message: string,title: string) {
      this.toastr.error(message,title);
    }


     /**
   * Confirmation alert
   * @param message
   * @param callback
   * @param title
   */
  confirmBeforeSucces(message: string, callback: any, title?: string) {
    if (!this.isUndefined(title)) {
      title = 'Confirmar';
    }
    Swal.fire({
      title: title,
      icon: 'success',
      html: message,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText:
        '<span class="ion-padding-horizontal"></span> Aceptar <span class="ion-padding-horizontal"></span> ',
      confirmButtonAriaLabel: 'Aceptar',
      cancelButtonText:
        '<span class="ion-padding-horizontal"></span>  Cancelar <span class="ion-padding-horizontal"></span> ',
      cancelButtonAriaLabel: 'Cancelar',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }




}
