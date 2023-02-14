import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, throwError } from 'rxjs';
import { MethodsService } from './methods.service';
import { catchError, finalize } from 'rxjs/operators';
import { IResultData } from '../interfaces/result';
import { UtilService } from './util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IChangeDataUser, IChangePassword, INewUSer } from '../interfaces/profile.dto';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  API_URL = environment.API_URL;
  private _helper = new JwtHelperService();
  constructor( private _methodService: MethodsService,
    private _utilService: UtilService,
    private _http: HttpClient,
    private spinner: NgxSpinnerService) { }

  getUsername(token:string){
    if(token!=null){
    return this._helper.decodeToken(token);
    }else{
      return null;
    }
  }

  /**
   * Retorna todos los usuarios
   * @returns
   */
  getAllUser() {
    return this._methodService.get('user/listar').pipe(
      map((resp) => {
        return resp as IResultData;
      }),
      catchError(err => {
        this._utilService.addErrorMessage('ERROR', err.message);
        return throwError(err);
      })
    );
  }


  getUserId(id:string | any) {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    this.spinner.show();
    return this._methodService.get(`user/buscar/${id}`,{headers:headers}).pipe(
      finalize(()=> this.spinner.hide()),
      map((resp) => {
        return resp;
      }),
      catchError(err => {
        this._utilService.addErrorMessage('ERROR', err.message);
        return throwError(err);
      })
    );
  }

  actualizarContrasena(ide: string, changePassword: IChangePassword) {

    this.spinner.show();
    return this._methodService.post(`user/actualizar-contrasena/${ide}`,changePassword).pipe(
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


  actualizarDatos(id: string, userData: IChangeDataUser) {

    this.spinner.show();
    return this._methodService.post(`user/update/${id}`,userData).pipe(
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


  crearUsuario(newUser: INewUSer) {

    this.spinner.show();
    return this._methodService.post(`user/register`,newUser).pipe(
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

  viewHome() {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    this.spinner.show();
    return this._methodService.get(`security/view-home`,{headers:headers}).pipe(
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

  getApi() {

    const URL_API = "https://api.ipify.org/?format=json";
    this.spinner.show();
    return this._http.get(`${URL_API}`).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      })
    )
  }

  getClima() {

    this.spinner.show();
    return this._http.get(`https://api.openweathermap.org/data/2.5/weather?q=riobamba&lang=sp&appid=695aa7aa00c1b95b9992fd7438e44a2d&units=metric`).pipe(
      finalize(() => this.spinner.hide()),
      map(resp => {
        return resp;
      }),
      catchError(err => {
        return throwError(err);
      })
    )
  }



 }
