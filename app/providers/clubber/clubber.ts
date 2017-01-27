import { Injectable, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import {Utils} from '../utils/utils';
import {Logger1} from '../utils/logger';
import {GeoLocation} from '../geo-location/geo-location';
// import {OAuth1} from './oauth1';
import * as PouchDB from 'pouchdb';
import {Authentication}  from '../security/authentication';
//import { AuthDb } from './auth-db';

@Injectable()
export class Clubber implements OnInit {
    public ClubberID;
    public IsChecking;

    constructor(private platform: Platform,
        private utils: Utils,
        private geoLoc: GeoLocation,
        private auth: Authentication,
        private log: Logger1
    ) { }

    ngOnInit() {
        //Get user name
        this.startCheck();
        this.setup();

    }

    startCheck(){
        this.IsChecking = true;
    }

    finishCheck() {
        this.IsChecking = false;
    }

    setup() {
        this.auth.getUserName()
            .map(id => {
                this.ClubberID == id;

            }).finally(_ => {
                this.finishCheck();
            });
    }

}
