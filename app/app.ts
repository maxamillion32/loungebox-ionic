import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import  {MenuPage} from './pages/menu/menu'
import {DataService} from './providers/data-service/data-service';
import {PouchdbService}  from './providers/pouchdb-service/pouchdb-service';
import { GeoLocation } from './providers/geo-location/geo-location';
import { APP_CONFIG_TOKEN, APP_CONFIG, IApplicationConfig } from './providers/config-service/config-service';
import {LbcSettings} from './providers/lbc-settings/lbc-settings'

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[DataService,PouchdbService,GeoLocation
  ,{ provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG }
  ,LbcSettings
  ]
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = MenuPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
