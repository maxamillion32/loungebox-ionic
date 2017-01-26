import { Injectable, Http } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Food } from '../models/food';
import {Utils} from './utils';
import {Logger1} from '../pouchdb-service/logger';
import {GeoLocation} from '../geo-location/geo-location';
import {OAuth} from './OAuth';
import * as PouchDB from 'pouchdb';
import { AuthDb } from './auth-db';

@Injectable()
export class Authentication {
    private db;

    constructor(private platform: Platform,
        private OAuth: OAuth,
        private http: Http,
        private utils: Utils,
        private geoLoc: GeoLocation,
        private authDB: AuthDb,
        private log: Logger1
    ) { }

    getUserName(){
        return Observable.fromPromise(
            
         this.authDB.getTokens().then(
            (auth) => {
                return auth.user;
            }

        ))
        .catch(err => this.utils.handleError(err));
    }

    login(user: string, password: string): Observable<any> {
        return this.OAuth.getAccessToken(user, password).map(
            (auth) => {
                this.log.log('Loggged in success:' + JSON.stringify(auth) );
            }

        )
        .catch(err => this.utils.handleError(err));

    }

    logout(): Observable<any> {
        return Observable.fromPromise(
            this.authDB.removeTokens())
        .catch(err => this.utils.handleError(err));
    }

}
