import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  user='';
  role: any;

  constructor(private router: Router,
    private _securityService: SecurityService,
    private _utilService: UtilService) { }

 async ngOnInit() {
    const ide = await this._utilService.getUserUid();
    this.getDataUser(ide);
    this.role = localStorage.getItem("role");
    console.log(this.role =='admin', this.role, 'admin');
  }

  async getDataUser(ide: string | any){
      (await this._securityService.getUserId(ide)).subscribe((resp: any) => {
        this.user = resp.user;
      });

  }

}
