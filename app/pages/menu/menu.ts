import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

/*
  Generated class for the MenuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class MenuPage {

public rootPage: any;
  constructor(private navCtrl: NavController) {
      this.rootPage = TabsPage;
  }

}
