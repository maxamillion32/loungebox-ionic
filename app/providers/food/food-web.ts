

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Food } from '../../models/food';
import { Utils } from '../utils/utils';
import { GeoLocation } from '../geo-location/geo-location';
import { Logger1 } from '../utils/logger';
import { LbcHttp } from '../web/http/lbc-http';
import { LbcTime } from '../time/lbc-time';
import { LbcSettings } from '../lbc-settings/lbc-settings';

import * as PouchDB from 'pouchdb';

@Injectable()
export class FoodWeb {
    private db;
    //log : Logger1;
    constructor(private platform: Platform,
        private http: Http,
        private lbcHttp: LbcHttp,
        private utils: Utils,
        private geoLoc: GeoLocation,
        private log: Logger1,
        private settings: LbcSettings,
        private timeSvc: LbcTime

    ) {

    }
    readonly api_base = this.settings.configService.apiEndpoint + 'api/foods';
    readonly api_nearby = this.api_base + '/nearme/today';

    getFoodsNearByToday(): Observable<Food[]> {
        return this.geoLoc
            .getCurrentPosition()
            .flatMap(pos =>
                this.getFoodsNearByTodayFromServer(pos)
            );
    }

    private getFoodsNearByTodayFromServer(pos): Observable<Food[]> {

        let query = `?distance=1000
                &lat=${pos.coords.latitude}
                &localUTCTime=${this.timeSvc.utcNowToISOString()}
                &lon=${pos.coords.longitude}
                &page=0&pageSize=20`;

        return this.lbcHttp.get(this.api_nearby + query)
            .map(res => this.utils.extractAsJson(res))
            .catch(err => this.utils.handleError(err));
    }

}
