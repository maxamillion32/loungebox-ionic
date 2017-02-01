import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import {LoungeSelectionPage} from '../lounge-selection/lounge-selection';
import {Food} from '../../models/food';
import { FoodWeb } from '../../providers/food/food-web';
import {Logger1} from '../../providers/utils/logger';

/*
  Generated class for the FoodPostPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/food-post/food-post.html',
})
export class FoodPostPage {
  postModel :Food;
  selectedLounges:any[];
  constructor(private navCtrl: NavController,
  public modalCtrl: ModalController
  ,private web_server: FoodWeb
  ,private log:Logger1
  ) {
    this.postModel =new Food();
  }

  presentWhereModal() {
   let whereModal = this.modalCtrl.create(LoungeSelectionPage, { userId: 8675309 });
   whereModal.onDidDismiss(lounges => {
     this.log.log('Selected lounges:' +JSON.stringify(lounges));
     this.selectedLounges = lounges.selectedLounges;
   });
   whereModal.present();
 }

 shareFood(){
   this.web_server.shareFood(this.postModel);
 }

 manageLounge(lounge){
   
 }

}

class FoodPostModel {

}
