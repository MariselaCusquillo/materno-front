import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user='';
  /*tipologia:'';
  tipo_usuario:'';
  tipo_atencion:'';
  establecimiento:'';
  provincia:'';
  distrito:'';*/

  constructor(private router: Router,
    private _securityService: SecurityService,
    private _utilService: UtilService) { }

 async ngOnInit() {
    const ide = await this._utilService.getUserUid();
    this.getDataUser(ide);
  }

  async getDataUser(ide: string | any){
      (await this._securityService.getUserId(ide)).subscribe((resp: any) => {

        this.user = resp[0].user;
        /*this.tipologia = resp[0].tipologia;
        this.tipo_atencion =  resp[0].tipo_atencion;
        this.establecimiento = resp[0].establecimiento;
        this.provincia = resp[0].provincia;
        this.distrito = resp[0].distrito;*/
      });

  }

  logout(){
    this.router.navigate(['/login']);
    localStorage.clear();
  }

}
