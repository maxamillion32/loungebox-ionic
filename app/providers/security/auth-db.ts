import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { LbcDevice } from '../device/device';
import { Logger1 } from '../utils/logger';
import * as PouchDB from 'pouchdb';

@Injectable()
export class AuthDb {
    private db;

    constructor(private platform: Platform,
        private device: LbcDevice,
        private log: Logger1
    ) { }

    initDB(): Promise<any> {
        this.log.log('creating.. db');
        return this.platform.ready()
            .then(() => {
                if(this.db==null){
                this.db = new PouchDB('auth', { adapter: 'websql' });
                this.log.log('created db');
                }
            });
    }

    addTokens(user: string, access_token: string, refresh_token: string): Promise<any> {
        let obj = {
            _id: this.getAuthKey(),
            user: user,
            access_token: access_token,
            refresh_token: refresh_token

        };
        this.log.log('addig token...');
        return this.initDB().then(() => {
           return this.db.put(obj).then(
                ()=>{
                    this.log.log('token added.');
                }

           );
        }
        );

    }

    getTokens(): Promise<any> {

        return this.initDB()
            .then(() => {
                return this.db.get(this.getAuthKey())
                    .catch(err =>{

                        if(err.name ==='not_found') return {};
                        else throw err;
                    });
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
