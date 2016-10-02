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

@Component({
  templateUrl: 'build/pages/food/food.html'
})
export class FoodPage implements OnInit {
  public heroes :String[];
  constructor(public navCtrl: NavController,private http:Http, private ds:DataService) {
   console.log(ds);
   ds.createData();
  }
  ngOnInit(){
    console.log("inside on init");
    this.getHeroes().subscribe(x=>this.heroes=x);;
   

  }
  
  getHeroes (): Observable<String[]> {
    console.log("inside get heroes");
    //return null;
    return this.http.get("http://jsonplaceholder.typicode.com/users")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

showDetail(){

  console.log('inside button');
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
