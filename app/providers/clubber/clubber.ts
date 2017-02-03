import { Injectable, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import {Utils} from '../utils/utils';
import {Logger1} from '../utils/logger';
import {GeoLocation} from '../geo-location/geo-location';
// import {OAuth1} from './oauth1';
import * as PouchDB from 'pouchdb';
import {Authentication}  from '../security/authentication';
import {IClubberModel} from '../../pages/clubber/Clubber.model';
//import { AuthDb } from './auth-db';

@Injectable()
export class Clubber implements OnInit {
    public clubber:IClubberModel;
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
        this.setup()
            .subscribe(user=>{
                this.clubber =user;
            });

    }

    startCheck(){
        this.IsChecking = true;
    }

    finishCheck() {
        this.IsChecking = false;
    }

    setup() :Observable<IClubberModel> {
        return this.auth.getUser()
            .finally(_ => {
                this.finishCheck();
            });
    }

}
