import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Logger1 } from '../utils/logger';
import * as PouchDB from 'pouchdb';

@Injectable()
export class PouchdbInstance {
    private db;

    constructor(private platform: Platform,
        private log: Logger1
    ) { }

    get DB() {

        if (this.db == null) return this.initDB()
        else {
            return Promise.resolve(this.db);
        }

    }

    initDB(): Promise<any> {
        this.log.log('creating.. db');
        return this.platform.ready()
            .then(() => {
                if (this.db == null) {
                    this.db = new PouchDB('auth', { adapter: 'websql' });
                    this.log.log('created db');
                } else {
                    this.log.warn('Attempt to initialize an already initialised pouchdb instance');
                }

                return this.db;
            });
    }
}
