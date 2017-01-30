import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import  {MenuPage} from './pages/menu/menu'
import {DataService} from './providers/data-service/data-service';
import {PouchdbService}  from './providers/pouchdb-service/pouchdb-service';
import {PouchdbInstance}  from './providers/pouchdb-service/pouchdb-instance';
import { GeoLocation } from './providers/geo-location/geo-location';
import { APP_CONFIG_TOKEN, APP_CONFIG, IApplicationConfig } from './providers/config-service/config-service';
import {LbcSettings} from './providers/lbc-settings/lbc-settings';
import {Utils} from './providers/utils/utils';
import {Logger1} from './providers/utils/logger';
import {FoodWeb} from './providers/food/food-web';
import {LbcDevice} from './providers/device/device';
import {Authentication} from './providers/security/authentication';
import {OAuth1} from './providers/security/oauth1';
import {AuthDb} from './providers/security/auth-db';
import {LbcHttp} from './providers/web/http/lbc-http';

//"C:\Program Files\IIS Express\iisexpress.exe" /site:tinypots /config:"C:\Users\Anwar\Documents\Visual Studio 2015\Projects\loungebox\loungebox\.vs\config\applicationhost.config"
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[DataService,PouchdbService,GeoLocation
  ,{ provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG }
  ,LbcSettings,
  LbcDevice,
  Logger1,
  Utils,
  PouchdbInstance,
  OAuth1,
  Authentication,
  AuthDb,
  FoodWeb,
  LbcHttp
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
