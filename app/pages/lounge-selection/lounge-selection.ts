import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LoungeWeb } from '../../providers/lounge/lounge-web';

/*
  Generated class for the LoungeSelectionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lounge-selection/lounge-selection.html',
})
export class LoungeSelectionPage implements OnInit {
  lounges: any;
  //selectedLounges: any[];

  constructor(
    public viewCtrl: ViewController
    , private loungeWebSvc: LoungeWeb
  ) { }

  ngOnInit() {
    this.lounges = this.loungeWebSvc
      .getLoungesNearMe();

  }
  selectLounge(lounge) {
    // this.selectedLounges.push({
    //   lounge: lounge
    // });

    lounge.IsSelected = lounge.IsSelected ? false : true;
  }

  closeModal() {

    let data = { selectedLounges: this.lounges.filter(l => l.IsSelected) };
    this.viewCtrl.dismiss(data);

  }
}
