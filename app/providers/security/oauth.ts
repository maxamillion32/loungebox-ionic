import { Injectable, Http } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Food } from '../models/food';
import {Utils} from './utils';
import {GeoLocation} from '../geo-location/geo-location';
import {LbcSettings} from '../lbc-settings/lbc-settings';

import * as PouchDB from 'pouchdb';

@Injectable()
export class OAuth {
    private db;

    constructor(private platform: Platform,
        private http: Http,
        private utils: Utils,
        private geoLoc: GeoLocation
    ) { }

    getAccessToken (user: string, pwd: string): Observable<string>{
        
        let token_url = LbcSettings.configService.apiEndpoint + LbcSettings.configService.oauthTokenEndpoint;

        return this.http.post(token_url, 
                            this.getHttpUrlEncodedDataForAuth(user,pwd), 
                            this.getHttpUrlEncodedRequestOptions())
                        .map(this.utils.extractAsJson)
                        .catch(this.utils.handleError);
    }

    private getHttpUrlEncodedDataForAuth(user: string, pwd: string):string{
        return "grant_type=password&username=" + user + "&password=" + pwd;
    }

    private getHttpUrlEncodedRequestOptions ():RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
       return new RequestOptions({ headers: headers });
    }

    getRefreshToken(pos): Observable<any> () {
        
        
    }
   
}
