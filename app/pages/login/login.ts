import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Authentication } from '../../providers/security/authentication';
// import {   RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};
 
  constructor(private nav: NavController, 
  //private auth: Authentication, 
  private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
 
  public createAccount() {
    //this.nav.push(RegisterPage);
  }
 
  // public login() {
  //   this.showLoading()
  //   this.auth.login(this.registerCredentials.email,this.registerCredentials.password).subscribe(allowed => {
  //     if (allowed) {
  //       setTimeout(() => {
  //       this.loading.dismiss();
  //       this.nav.setRoot(HomePage)
  //       });
  //     } else {
  //       this.showError("Access Denied");
  //     }
  //   },
  //   error => {
  //     this.showError(error);
  //   });
  // }
 
  // showLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   this.loading.present();
  // }
 
  // showError(text) {
  //   setTimeout(() => {
  //     this.loading.dismiss();
  //   });
 
  //   let alert = this.alertCtrl.create({
  //     title: 'Fail',
  //     subTitle: text,
  //     buttons: ['OK']
  //   });
  //   alert.present(prompt);
  // }
}