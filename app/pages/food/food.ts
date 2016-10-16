import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import {DataService} from '../../providers/data-service/data-service';
import {PouchdbService}  from '../../providers/pouchdb-service/pouchdb-service';
import {FoodDetailPage} from '../food-detail/food-detail';


@Component({
  templateUrl: 'build/pages/food/food.html'
})
export class FoodPage implements OnInit {
  public heroes :String[];
  nav:NavController;

  constructor(public navCtrl: NavController,private http:Http, private ds:DataService, private pouch:PouchdbService) {
   console.log(ds);
   //ds.createData();
   this.nav = navCtrl;
    // pouch.getTodos().then(function(){


    //   pouch.createTodo({name:'first tpodo'});
    // });
  }
  ngOnInit(){
    console.log("inside on init");
    this.getHeroes().subscribe(x=>this.heroes=x);;
   

  }
  
  getHeroes (): Observable<String[]> {
    console.log("inside get heroes");
    //return null;
   let foods = this.http.get('https://192.168.0.21:3000/api/foods').map(

      function(r){
        console.log('Inside food call ' + JSON.stringify(r));
        
      }
    ).catch(function(err){console.log("Inside food erro" + err);
      return Observable.throw(err);
    });

    foods.subscribe(function(foods){

        

    });
    return this.http.get("http://jsonplaceholder.typicode.com/users")
                    .map(this.extractData)
                    .catch(this.handleError);

          
  }

showDetail(item){

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
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
