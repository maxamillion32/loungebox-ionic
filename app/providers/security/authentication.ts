import { Injectable,Http } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Food } from '../models/food';
import {Utils} from './utils';
import {GeoLocation} from '../geo-location/geo-location';
import {OAuth} from './OAuth';
import * as PouchDB from 'pouchdb';

@Injectable()
export class Authentication {
    private db;

    constructor(private platform: Platform,
    private OAuth:OAuth,
    private http:Http,
    private utils:Utils,
    private geoLoc: GeoLocation
    ) { }

    login(user:string, password:string):Observable<any>{
        return this.OAuth.getAccessToken(user,password).map(
            (access_token) => {
                
            } 

        );
            
    }

    logout(): Observable<any> {
        
        return this.http.get("https://localhost:44351/api/foods/nearme/today?distance=1000&lat=" + pos.coords.latitude + "&localUTCTime=2017-01-07T10:32:26.907Z&lon=" + pos.coords.longitude + "&page=0&pageSize=20'")
            .map(this.utils.extractAsJson)
            .catch(this.utils.handleError);
    }
   
}
