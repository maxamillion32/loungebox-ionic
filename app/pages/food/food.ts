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
import { FoodDetailPage } from '../food-detail/food-detail';
import { GeoLocation } from '../../providers/geo-location/geo-location';

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
    private geoLoc: GeoLocation) {
    console.log(ds);
    //ds.createData();
    this.nav = navCtrl;
    // pouch.getTodos().then(function(){

    //   pouch.createTodo({name:'first tpodo'});
    // });
  }
  ngOnInit() {
    console.log("inside on init");
    this.getFoods().subscribe(x => this.foods = x);;

    this.pouch.createTodo({ name: 'hello there' });

    this.whereFilter = "nearby";

  }

  getFoods(): Observable<String[]> {
    console.log("inside get heroes");
    //return null;
    //  let foods = this.http.get('https://localhost:44351/api/foods/nearme/today?distance=1000&lat=51.295541899999996&localUTCTime=2017-01-07T10:32:26.907Z&lon=-0.7524763999999999&page=0&pageSize=20').map(

    //     function(r){
    //       console.log('Inside food call ' + JSON.stringify(r));

    //     }
    //   ).catch(function(err){console.log("Inside food erro" + err);
    //     return Observable.throw(err);
    //   });

    //   foods.subscribe(function(foods){



    //   });
    // return this.http.get("http://jsonplaceholder.typicode.com/users")
    //                 .map(this.extractData)
    //                 .catch(this.handleError);
    let vm = this;
    let findLocProm = this.geoLoc.getCurrentPosition();

    let res = Observable.fromPromise(findLocProm).flatMap(
      function (pos) {
        return vm.http.get("https://localhost:44351/api/foods/nearme/today?distance=1000&lat=" + pos.coords.latitude + "&localUTCTime=2017-01-07T10:32:26.907Z&lon=" + pos.coords.longitude + "&page=0&pageSize=20'")
          .map(vm.extractData)
          .catch(vm.handleError);

      }

    );

    return res;

  }

  showDetail(item) {

    console.log('inside button');
    this.nav.push(FoodDetailPage, {
      item: item
    });
  }

  private extractData(res: Response) {
    console.log("inside extract");

    let body = res.json();
    console.log(body);
    return body;
    //this.heroes = body;
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
