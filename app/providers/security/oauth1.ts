import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Utils } from '../utils/utils';
import { Logger1 } from '../utils/logger';
import { GeoLocation } from '../geo-location/geo-location';
import { LbcSettings } from '../lbc-settings/lbc-settings';
import { AuthDb } from './auth-db';
import { LbcDevice } from '../device/device';

@Injectable()
export class OAuth1 {
    private db;

    constructor(private platform: Platform,
        private http: Http,
        private utils: Utils,
        private geoLoc: GeoLocation,
        private authDB: AuthDb,
        private settings: LbcSettings,
        private device: LbcDevice,
        private log: Logger1
    ) { }

    getAccessToken(user: string, pwd: string, useRefreshTokens): Observable<any> {

        let token_url = this.settings.configService.apiEndpoint + this.settings.configService.oauthTokenEndpoint;
        this.log.log('getting access token:' + token_url);
        return this.http
            .post(token_url,
            this.getGrantTypeForAccesToken(user, pwd, useRefreshTokens),
            this.getHttpUrlEncodedRequestOptions())
            .map((res) => this.utils.extractAsJson(res))
            .map(res => this.authDB.addTokens(res.userName, res.access_token, res.refresh_token))
            .catch((err) => this.utils.handleError(err));
    }
    private getGrantTypeForAccesToken(user: string, pwd: string, useRefreshTokens: boolean): string {


        let data = "grant_type=password&username=" + user + "&password=" + pwd;
        if (useRefreshTokens) {
            data = data + "&client_id=" + this.device.getDeviceID();
        };
        this.log.log('Grant type:' + data);
        return data;
    }

    retriveToken() {
        return this.authDB.getTokens();
    }

    removeToken() {
        return this.authDB.removeTokens();
    }

    refreshAccessToken(): Observable<any> {
        let token_url = this.settings.configService.apiEndpoint + this.settings.configService.oauthTokenEndpoint;

        return this.http
            .post(token_url,
                this.getGrantTypeForRefreshToken(),
                this.getHttpUrlEncodedRequestOptions())
            .map((res) => this.utils.extractAsJson(res))
            .map(res => this.authDB.addTokens(res.userName, res.access_toke, res.refresh_token))
            .catch((err) => this.utils.handleError(err));

    }
    private getGrantTypeForRefreshToken(): string {
        let refreshToken = '';
        let data = `grant_type=refresh_token
                    &refresh_token="+ ${refreshToken}
                    &client_id=${this.device.getDeviceID()}`;
        this.log.log('Grant type:' + data);
        return data;
    }


    private getHttpUrlEncodedRequestOptions(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return new RequestOptions({ headers: headers });
    }
}