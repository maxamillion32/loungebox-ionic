import { Component,Input } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Authentication} from '../../providers/security/authentication';
import {LoginPage} from '../login/login';
@Component({
  templateUrl: 'build/pages/avatar/avatar.html',
  selector: 'lbc-avatar'
})
export class LbcAvatarComponent {
  @Input() clubber:any;
  constructor(public nav: NavController,params :NavParams
  ,private auth:Authentication
  ) {
    //console.log('Clubber page params:' + JSON.stringify(params));
    //this.clubber =params.data;
    
  }
}
