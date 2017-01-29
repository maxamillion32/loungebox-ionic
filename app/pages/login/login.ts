import { Component,ViewChild } from '@angular/core';
import { NavController, Tabs,ViewController,AlertController, LoadingController, Loading } from 'ionic-angular';
import { Authentication } from '../../providers/security/authentication';
// import {   RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import {ClubberPage} from '../clubber/clubber';
 
@Component({
  selector: 'page-login',
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};
 //@ViewChild('myTabs') tabRef: Tabs;
  constructor(private nav: NavController, 
  private auth: Authentication, 
  private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
 
  public createAccount() {
    //this.nav.push(RegisterPage);
  }
 
  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials.email,this.registerCredentials.password)
    .subscribe(user => {
      console.log('user:'+JSON.stringify(user));
       setTimeout(() => {
        this.loading.dismiss();
        //this.nav.setNav(ClubberPage)
        this.nav.setRoot(ClubberPage,{ClubberID:this.registerCredentials.email});
        });
      // if (user != null) {
       
      // } else {
      //   this.showError("Access Denied");
      // }
    },
    error => {
      this.showError(error);
    });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: [{text:'Dismiss'
      ,
      handler: () => {
          alert.dismiss().then(() => {
            alert.dismiss();
          });
          return false;
        }
      }]
    });
    alert.present();
  }
}