import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { LbcDevice } from '../device/device';

import * as PouchDB from 'pouchdb';

@Injectable()
export class AuthDb {
    private db;

    constructor(private platform: Platform,
        private device: LbcDevice
    ) { }

    initDB(): Promise<any> {
        return this.platform.ready()
            .then(() => {
                this.db = new PouchDB('auth', { adapter: 'websql' });
            });
    }

    addTokens(user: string, access_token: string, refresh_token: string): Promise<any> {
        let obj = {
            _id: this.getAuthKey(),
            user: user,
            access_token: access_token,
            refresh_token: refresh_token

        };
        return this.db.put(obj);
    }

    getTokens(): Promise<any> {

        return this.initDB()
            .then(() => {
                return this.db.get(this.getAuthKey());
            });
    }

    private getAuthKey(): string {
        return 'auth_' + this.device.getDeviceID();
    }

    removeTokens(): Promise<any> {
        return this.db.get(this.getAuthKey()).then(function (doc) {
            return this.db.remove(doc);
        });
    }



    // getRefreshToken(): Observable<any> {
    //     return Observable.fromPromise(
    //         this.initDB()
    //             .then(() => {
    //                 return this.db.get('refresh_token');
    //             }));
    // }
}
