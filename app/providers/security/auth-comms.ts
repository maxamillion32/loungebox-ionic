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
export class AuthComms implements OnInit {
    private db;
   private authCommsSource : BehaviourSubject<AuthCommsModel>;

    constructor(private platform: Platform,
        private utils: Utils,
        private log: Logger1
    ) { }

    ngOnInit(){
        let uknown_user = new ClubberModel();
        this.authCommsSource = new BehaviourSubject<AuthCommsModel>(uknown_user);
    }

    checking(){
        let checking_state = new AuthCommsModel();
        checking_state.state = "checking";
        this.authCommsSource.next(checking_state);
    }

    loggedIn(){
        let checking_state = new AuthCommsModel();
        checking_state.state = "logged_in";
        this.authCommsSource.next(checking_state);
    }

    loggedOff(){
        let checking_state = new AuthCommsModel();
        checking_state.state = "logged_off";
        this.authCommsSource.next(checking_state);
    }

}

export class AuthCommsModel{
    state: string;
    user:IClubberModel;

}