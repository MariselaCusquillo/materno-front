import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MethodsService } from '../services/methods.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SecurityService } from '../services/security.service';
import { UtilService } from '../services/util.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private _helper = new JwtHelperService();

  API_URL = environment.API_URL;
  constructor(private router: Router, private http: HttpClient, private _methodService: MethodsService,
    private _securityService: SecurityService,
    private _utilService: UtilService,
    private _authServce: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean> | boolean{
    return new Promise(resolve =>{
      if(localStorage.getItem('accessToken')!=null){
        let token,user,username;
        try{

         token = localStorage.getItem('accessToken');
          user = this._utilService.getUserUid();
          username = this._utilService.getUsername();
          resolve(true);
        }catch(catchError){
          localStorage.clear();
        }

       /* this.http.get(`${this.API_URL}/auth/validate-token/${user}/${username}`).subscribe(
          resp=>{
            resolve(true);
          },
           err =>{
             localStorage.removeItem("accessToken");
             localStorage.removeItem("tokenValidate");
            this.router.navigate(['/']);
            resolve(false);
          }
        )*/
      }else{
        this.router.navigate(['/']);
        resolve(false);
      }
    })
  }

}
