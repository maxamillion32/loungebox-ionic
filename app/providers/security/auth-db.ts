import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { LbcDevice } from '../device/device';
import { Logger1 } from '../utils/logger';
import { PouchdbInstance } from '../pouchdb-service/pouchdb-instance';
import * as PouchDB from 'pouchdb';

@Injectable()
export class AuthDb {


    constructor(private platform: Platform,
        private device: LbcDevice,
        private log: Logger1,
        private db: PouchdbInstance
    ) { }

    addTokens(user: string, access_token: string, refresh_token: string): Promise<any> {
        let obj = {
            _id: this.getAuthKey(),
            user: user,
            access_token: access_token,
            refresh_token: refresh_token

        };
        this.log.log('addig token...');
        return this.db.DB().then((db) => {
            return db.put(obj).then(
                () => {
                    this.log.log('token added.');
                }

            );
        }
        );

    }

    getTokens(): Promise<any> {

        return this.db.DB()
            .then((db) => {
                return db.get(this.getAuthKey())
                    .catch(err => {
                        if (err.name === 'not_found') 
                        {
                            this.log.warn('No auth keys found');
                            return {};
                        }
                        else throw err;
                    });
            });
    }

    private getAuthKey(): string {
        let id = 'auth_' + this.device.getDeviceID();
        this.log.log('Auth key:' + id);
        return id;
    }

    removeTokens(): Promise<any> {
           this.log.log('removing token...');
        return this.db.DB().then((db) => {
            db.get(this.getAuthKey()).then(doc => {
                return this.db.DB().then(db=>db.remove(doc));
            });
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
