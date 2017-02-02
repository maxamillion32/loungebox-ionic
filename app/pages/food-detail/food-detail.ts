import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

/*
  Generated class for the FoodDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/food-detail/food-detail.html',
})
export class FoodDetailPage {

food :any;


  constructor(private navCtrl: NavController,navParams:NavParams) {
      console.log('NavController:' + JSON.stringify(navCtrl.id));
      
      this.food = navParams.get('food');
  }

}
