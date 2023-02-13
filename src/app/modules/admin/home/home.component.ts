import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  navegador='';
  ip="";
  clima: any[]=[];
  ciudad='';
  tempActual='';
  tempMin='';
  tempMax='';
  icono='';
  descripcion='';
  urlIcono='';
  country='';

  constructor(private _securityService: SecurityService) { }

  ngOnInit(): void {
    //this.getData();
    this.obtenerIdNavegador();
    this.getApi();
    this.getClima();
    setTimeout(this.logout,1800000)
  }

  logout(){
    localStorage.clear();
    location.reload();
  }

  /*getData(){
    this._securityService.viewHome().subscribe((resp: any) => {
     this.productos =  resp.home[0];
     this.empleados =  resp.home[1];
     this.distribuidores =  resp.home[2];
     this.categoria =  resp.home[3];
     this.direccion = resp.home[4];
   });
  }*/

   obtenerIdNavegador() {

    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1 :
        this.navegador = 'edge';
        break;
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        this.navegador =  'opera';
        break;
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        this.navegador =  'chrome';
        break;
      case agent.indexOf('trident') > -1:
        this.navegador =  'ie';
        break;
      case agent.indexOf('firefox') > -1:
        this.navegador =  'firefox';
        break;
      case agent.indexOf('safari') > -1:
        this.navegador =  'safari';
        break;
      default:
        this.navegador =  'other';
    }

}

getApi(){
  this._securityService.getApi().subscribe((resp: any) => {
    this.ip= resp.ip;
  });
}

getClima(){
  this._securityService.getClima().subscribe((resp: any) => {
   this.clima=resp;
   this.ciudad= resp.name;
   this.country = resp.sys.country;
   this.tempActual=resp.main.temp;
   this.tempMin=resp.main.temp_min;
   this.tempMax=resp.main.temp_max;
   this.icono=resp.weather[0].icon;
   this.descripcion=resp.weather[0].description;
   this.descripcion = this.descripcion.charAt(0).toUpperCase()+this.descripcion.slice(1);;
   this.urlIcono = `http://openweathermap.org/img/wn/${this.icono}@4x.png`
  });
}

}
