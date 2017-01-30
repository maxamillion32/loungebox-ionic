import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Utils } from '../utils/utils';
import { Logger1 } from '../utils/logger';
import { GeoLocation } from '../geo-location/geo-location';
import { OAuth1 } from './oauth1';
import * as PouchDB from 'pouchdb';
import   {ClubberModel,IClubberModel} from '../../pages/clubber/clubber.model';
//import { AuthDb } from './auth-db';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class Authentication {
    private db;
 
    constructor(private platform: Platform,
        private oAuth: OAuth1,
        //private http: Http,
        private utils: Utils,
        private geoLoc: GeoLocation,
        //private authDB: AuthDb,
        private log: Logger1
    ) { }

    getUser(): Observable<IClubberModel> {
        return Observable.fromPromise(
            this.oAuth.retriveToken()
                .then(auth => {
                    this.log.log('Auth keys:' + JSON.stringify(auth));
                    let user = new ClubberModel();
                    user.ClubberID = auth.user;
                    return user;
                }))
            .catch(err => this.utils.handleError(err));
    }

    login(user: string, password: string): Observable<any> {
        this.log.log('trying to login with ' + user +':' + password);
        return this.oAuth.getAccessToken(user, password, true)
            .map(auth => {
                this.log.log('Loggged in successfully:' + JSON.stringify(auth));
            })
            .catch(err => this.utils.handleError(err));
    }

    logout(): Observable<any> {
        return Observable.fromPromise(this.oAuth.removeToken())
            .map(_ => { this.log.log('logged out successfully') })
            .catch(err => this.utils.handleError(err));
    }

}
