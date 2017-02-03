import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LoungeWeb } from '../../providers/lounge/lounge-web';
import { Logger1 } from '../../providers/utils/logger';

@Component({
  templateUrl: 'build/pages/lounges/lounges.html'
})
export class LoungesPage implements OnInit {
  lounges: any;
  //selectedLounges: any[];

  constructor(
      public viewCtrl: ViewController
    , private loungeWebSvc: LoungeWeb
    , private log:Logger1
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

  // closeModal() {

  //   let data = { selectedLounges: this.lounges.filter(l => l.IsSelected) };
  //   this.viewCtrl.dismiss(data);

  // }
}
