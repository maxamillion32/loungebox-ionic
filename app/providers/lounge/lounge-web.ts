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
import { LbcSettings } from '../lbc-settings/lbc-settings';

@Injectable()
export class LoungeWeb {
    private db;
    private api_base;
    //log : Logger1;
    constructor(private platform: Platform,
        private http: Http,
        private lbcHttp: LbcHttp,
        private utils: Utils,
        private geoLoc: GeoLocation,
        private log: Logger1,
        private settings: LbcSettings
    ) {
        this.api_base = this.settings.configService.apiEndpoint

    }


    getLoungesNearMe(): Observable<any> {
        return this.geoLoc
            .getCurrentPosition()
            .flatMap(pos =>
                this.getLoungesNearMeFromServer(pos)
            );
    }

    private getLoungesNearMeFromServer(pos): Observable<any> {

        return this.lbcHttp.get(this.api_base + "/api/lounges/nearme?distance=1000&lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude + "&page=0&pageSize=20'")
            .map(res => this.utils.extractAsJson(res))
            .catch(err => this.utils.handleError(err));
    }

}
