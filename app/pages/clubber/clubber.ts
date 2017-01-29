import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Authentication} from '../../providers/security/authentication';
import {LoginPage} from '../login/login';
@Component({
  templateUrl: 'build/pages/clubber/clubber.html'
})
export class ClubberPage {
  clubber:any;
  constructor(public nav: NavController,params :NavParams
  ,private auth:Authentication
  ) {
    console.log('Clubber page params:' + JSON.stringify(params));
    this.clubber =params.data;
    
  }

  logOut(){

    this.auth.logout()
    .subscribe(()=>{
        this.nav.setRoot(LoginPage);
    });
  }
}
