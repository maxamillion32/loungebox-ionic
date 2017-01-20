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
import { Logger } from '../../providers/pouchdb-service/logger';
import { FoodDetailPage } from '../food-detail/food-detail';
import { FoodWeb } from '../../providers/pouchdb-service/food-web';

@Component({
  templateUrl: 'build/pages/food/food.html'
})
export class FoodPage implements OnInit {
  public foods: String[];
  nav: NavController;
  whereFilter: string;
  constructor(public navCtrl: NavController,
    private http: Http,
    private ds: DataService,
    private pouch: PouchdbService,
    private utils: Utils,
    private log: Logger,
    private web_server: FoodWeb
  ) {
    console.log(ds);
    //ds.createData();
    this.nav = navCtrl;
    // pouch.getTodos().then(function(){

    //   pouch.createTodo({name:'first tpodo'});
    // });
  }
  ngOnInit() {
    console.log("inside on init");
    //this.getFoods().subscribe(x => this.foods = x);;
    //this.getFoods().subscribe(x => this.foods = x);;
    this.foods = this.web_server.getFoodsNearByToday();

    //this.pouch.createTodo({ name: 'hello there' });

    this.whereFilter = "nearby";

  }

  // getFoods(): Observable<String[]> {
  //   console.log("inside get heroes");
  //   //return null;
  //   //  let foods = this.http.get('https://localhost:44351/api/foods/nearme/today?distance=1000&lat=51.295541899999996&localUTCTime=2017-01-07T10:32:26.907Z&lon=-0.7524763999999999&page=0&pageSize=20').map(

  //   //     function(r){
  //   //       console.log('Inside food call ' + JSON.stringify(r));

  //   //     }
  //   //   ).catch(function(err){console.log("Inside food erro" + err);
  //   //     return Observable.throw(err);
  //   //   });

  //   //   foods.subscribe(function(foods){



  //   //   });
  //   // return this.http.get("http://jsonplaceholder.typicode.com/users")
  //   //                 .map(this.extractData)
  //   //                 .catch(this.handleError);
  //   // // let vm = this;
  //   // // let findLocProm = this.geoLoc.getCurrentPosition();

  //   // // let res = Observable.fromPromise(findLocProm).map(this.getFoodsFromServer);

  //   // // return res;

  // }

  navigateToDetailPage(item) {

    console.log('inside button');
    this.nav.push(FoodDetailPage, {
      item: item
    });
  }

}
