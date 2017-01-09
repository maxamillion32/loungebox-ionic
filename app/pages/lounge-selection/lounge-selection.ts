import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the LoungeSelectionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lounge-selection/lounge-selection.html',
})
export class LoungeSelectionPage {

  constructor(public viewCtrl: ViewController) {

  }
  closeModal() {

  let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);

  }
}
