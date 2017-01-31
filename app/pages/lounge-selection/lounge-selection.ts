import { Component,OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {LoungeWeb} from '../../providers/lounge/lounge-web';

/*
  Generated class for the LoungeSelectionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lounge-selection/lounge-selection.html',
})
export class LoungeSelectionPage implements OnInit {
  lounges:any;
  constructor(
    public viewCtrl: ViewController
    ,private loungeWeb:LoungeWeb
  ) {}

  ngOnInit(){
      //this.lounges = this.loungeWeb.getLoungesNearMe();

  }

  closeModal() {

  let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);

  }
}
