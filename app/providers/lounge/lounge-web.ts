import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Food } from '../../models/food';
import { Utils } from '../utils/utils';
import { GeoLocation } from '../geo-location/geo-location';
import { Logger1 } from '../utils/logger';
import { LbcHttp } from '../web/http/lbc-http';
import * as PouchDB from 'pouchdb';

@Injectable()
export class LoungeWeb {
    private db;
    //log : Logger1;
    constructor(private platform: Platform,
        private http: Http,
        private lbcHttp: LbcHttp,
        private utils: Utils,
        private geoLoc: GeoLocation,
        private log: Logger1
    ) {

    }

    // getLoungesNearMe(): Observable<any> {
    //     return this.geoLoc
    //         .getCurrentPosition()
    //         .flatMap(pos =>
    //             this.getLoungesNearMeFromServer(pos)
    //         );
    // }

    // private getLoungesNearMeFromServer(pos): Observable<any> {

    //     return this.lbcHttp.get("https://localhost:44351/api/lounges/nearme?distance=1000&lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude + "&page=0&pageSize=20'")
    //         .map(res => this.utils.extractAsJson(res))
    //         .catch(err => this.utils.handleError(err));
    // }

}
