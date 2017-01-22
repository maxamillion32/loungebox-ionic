import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { DataService } from '../../providers/data-service/data-service';
import { PouchdbService } from '../../providers/pouchdb-service/pouchdb-service';
import { Utils } from '../../providers/pouchdb-service/utils';
import { Logger1 } from '../../providers/pouchdb-service/logger';
import { FoodDetailPage } from '../food-detail/food-detail';
import { FoodWeb } from '../../providers/pouchdb-service/food-web';

@Component({
  templateUrl: 'build/pages/food/food.html'
})
export class FoodPage implements OnInit {
  public foods:Observable<any>;
  nav: NavController;
  whereFilter: string;
  constructor(public navCtrl: NavController,
    private http: Http,
    private ds: DataService,
    private pouch: PouchdbService,
    private utils: Utils,
    private log: Logger1,
    private web_server: FoodWeb
  ) {
    
    this.nav = navCtrl;
    
  }
  ngOnInit() {
    
    this.foods = this.web_server.getFoodsNearByToday();
    this.whereFilter = "nearby";

  }
  navigateToDetailPage(item) {

    console.log('inside button');
    this.nav.push(FoodDetailPage, {
      item: item
    });
  }

}
