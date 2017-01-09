import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import {LoungeSelectionPage} from '../lounge-selection/lounge-selection';
/*
  Generated class for the FoodPostPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/food-post/food-post.html',
})
export class FoodPostPage {

  constructor(private navCtrl: NavController,public modalCtrl: ModalController) {

  }

  presentWhenModal() {
   let whenModal = this.modalCtrl.create(LoungeSelectionPage, { userId: 8675309 });
   whenModal.present();
 }

}
