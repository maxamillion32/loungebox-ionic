import { Injectable,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the GeoLocation provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeoLocation implements OnInit {


  constructor() { }

  ngOnInit() {



  }

  public getCurrentPosition():Observable<any> {
    return Observable.fromPromise(Geolocation.getCurrentPosition());
    //  then((resp) => {
    //     // resp.coords.latitude
    //     // resp.coords.longitude
    //   }).catch((error) => {
    //     console.log('Error getting location', error);
    //   });
    // } 

  }
}

