import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FoodPage } from '../food/food';
import { FoodPostPage } from '../food-post/food-post';
import { Authentication } from '../../providers/security/authentication';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tabFoodRoot: any;
  public tabLoungesRoot: any;
  public tabClubberRoot: any;
  public tabShareRoot: any;

  constructor(
    private auth: Authentication
    ) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tabFoodRoot = FoodPage;
    this.tabLoungesRoot = HomePage;
    //this.tabClubberRoot = AboutPage;
    this.tabShareRoot = FoodPostPage;
    this.setClubberPage();  
}


  setClubberPage() {

    this.auth.getUserName()

      .map(user => {
        if (user) {
          this.tabClubberRoot = AboutPage;
        } else {
          this.tabClubberRoot = LoginPage;
        }
      });



  }
}
