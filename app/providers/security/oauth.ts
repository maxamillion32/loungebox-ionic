import { Injectable, Http } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Food } from '../models/food';
import {Utils} from './utils';
import {GeoLocation} from '../geo-location/geo-location';
import {LbcSettings} from '../lbc-settings/lbc-settings';
import { AuthDb } from './auth-db';
import * as PouchDB from 'pouchdb';
import { Device } from 'ionic-native';

@Injectable()
export class OAuth {
    private db;

    constructor(private platform: Platform,
        private http: Http,
        private utils: Utils,
        private geoLoc: GeoLocation
        private authDB: AuthDb
    ) { }

    getAccessToken(user: string, pwd: string, useRefreshTokens: boolean = true): Observable<string> {

        let token_url = LbcSettings.configService.apiEndpoint + LbcSettings.configService.oauthTokenEndpoint;

        return this.http
            .post(token_url,
            this.getGrantTypeForAccesToken(user, pwd, useRefreshTokens),
            this.getHttpUrlEncodedRequestOptions())
            .map((res) => this.utils.extractAsJson(res))
            .map(res => this.authDB.addTokens(res.userName,res.access_toke,res.refresh_token))
            .catch((err) => this.utils.handleError(err));
    }

    getRefreshToken(pos): Observable<any> () {
         let token_url = LbcSettings.configService.apiEndpoint + LbcSettings.configService.oauthTokenEndpoint;

        return this.http
            .post(token_url,
            this.getGrantTypeForRefreshToken(user, pwd, useRefreshTokens),
            this.getHttpUrlEncodedRequestOptions())
            .map((res) => this.utils.extractAsJson(res))
            .map(res => this.authDB.addTokens(res.userName,res.access_toke,res.refresh_token))
            .catch((err) => this.utils.handleError(err));
        
    }

    private getGrantTypeForAccesToken(user: string, pwd: string, useRefreshTokens: boolean): string {


        let data = "grant_type=password&username=" + user + "&password=" + pwd;
        if (useRefreshTokens) {
            data = data + "&client_id=" + Device.uuid;
        };

        return data;
    }

    private getGrantTypeForRefreshToken(refreshToken: string): string {


        let data = `grant_type=refresh_token
                    &refresh_token="+ ${refreshToken}
                    + "&client_id=${Device.uuid}`;

        return data;
    }


    private getHttpUrlEncodedRequestOptions(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return new RequestOptions({ headers: headers });
    }

    
   
}
