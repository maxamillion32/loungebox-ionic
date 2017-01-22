

import { Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Food } from '../../models/food';
import {Utils} from './utils';
import {GeoLocation} from '../geo-location/geo-location';
import {Logger1} from './logger';

import * as PouchDB from 'pouchdb';

@Injectable()
export class FoodWeb {
    private db;
//log : Logger1;
    constructor(private platform: Platform,
    private http:Http,
    private utils:Utils,
    private geoLoc: GeoLocation,
    private log : Logger1
    ) { 
        
        this.log.warn('from contructior log');
    }

    getFoodsNearByToday():Observable<Food[]>{
       return this.geoLoc.getCurrentPosition().flatMap(pos => this.getFoodsNearByTodayFromServer(pos));
    }

    private getFoodsNearByTodayFromServer(pos): Observable<Food[]> {
        console.warn('log:' +JSON.stringify( this.log));
    this.log.warn(pos);
this.log.warn(JSON.stringify(this.http));
        return this.http.get("https://localhost:44351/api/foods/nearme/today?distance=1000&lat=" + pos.coords.latitude + "&localUTCTime=2017-01-07T10:32:26.907Z&lon=" + pos.coords.longitude + "&page=0&pageSize=20'")
            .map(res => this.utils.extractAsJson(res))
            .catch(err => this.utils.handleError(err));
    }
   
}
