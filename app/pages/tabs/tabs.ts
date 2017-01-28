import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FoodPage } from '../food/food';
import { FoodPostPage } from '../food-post/food-post';
import { Authentication } from '../../providers/security/authentication';
import { LoginPage } from '../login/login';
import { ClubberPage } from '../clubber/clubber';
import { Logger1 } from '../../providers/utils/logger';
import { Utils } from '../../providers/utils/utils';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tabFoodRoot: any;
  public tabLoungesRoot: any;
  public tabClubberRoot: any;
  public tabShareRoot: any;
  clubberParams:any;

  constructor(
    private auth: Authentication
    , private nav: NavController,
    private log: Logger1,
    private utils:Utils
  ) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tabFoodRoot = FoodPage;
    this.tabLoungesRoot = HomePage;
    //this.tabClubberRoot = AboutPage;
    this.tabShareRoot = FoodPostPage;
   // this.setClubberPage();
  }


  setClubberPage() {
    this.log.warn('checkin clubber page...');
    this.auth.getUserName()

      .subscribe(user => {
        this.log.log('got values back');
        if (user) {
          this.log.warn('setting clubber page');
          //this.nav.push(ClubberPage);
          this.tabClubberRoot = ClubberPage;
          this.clubberParams = user;
        } else {
          this.tabClubberRoot = LoginPage;
          //this.nav.push(ClubberPage,{clubber:{}});
          this.log.warn('setting Abo page');
        }
      });
      //.(err => this.utils.handleError(err));



  }
}
