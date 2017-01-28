import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/clubber/clubber.html'
})
export class ClubberPage {
  clubber:any;
  constructor(public navCtrl: NavController,params :NavParams) {
    this.clubber =params.data;
    
  }
}
