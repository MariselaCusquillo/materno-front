import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, finalize } from 'rxjs/operators';
import { MethodsService } from './methods.service';
import { ILogin } from '../interfaces/login';
import { IResultAuth } from '../interfaces/result';
import { UtilService } from './util.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  accessToken: any = '';
  verificate: any='';
  private _authenticated: boolean = false;

  constructor(private _methodService: MethodsService,
    private _utilService: UtilService,
    private spinner: NgxSpinnerService) { }

  signIn(credentials: ILogin): Observable<IResultAuth> {
    this.spinner.show();
    return this._methodService.post('user/login', credentials).pipe(
      finalize(()=>this.spinner.hide()),
      tap((res: any) => {
        //console.log("resopuesta=>",res)
        this.accessToken = res.token;
        //this.verificate = res.userVerificate;
        //localStorage.setItem('tokenValidate',this.verificate);
        localStorage.setItem("accessToken",this.accessToken);
        this._authenticated = true;
      }),
      map((result: IResultAuth) => {
        delete result.accessToken;
        return result;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  
  //ingreso al sistema 

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('accessToken') && localStorage.getItem('tokenValidate'));
  }



}
