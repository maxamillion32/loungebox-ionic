import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Food } from '../models/food';

import * as PouchDB from 'pouchdb';

@Injectable()
export class AuthDb {
    private db;

    constructor(private platform: Platform) { }

    initDB(): Promise<any> {
        return this.platform.ready()
            .then(() => {
                this.db = new PouchDB('auth', { adapter: 'websql' });
            });
    }

    addAccessToken(deviceId: string, token: string): Promise<any> {
        return this.db.post({
            _id: deviceId,
            token: token

        });
    }

    removeAccessToken(): Promise<any> {
        //return this.db.remove();
    }

    getToken(): Observable<Food[]> {
        return Observable.fromPromise(
            this.initDB()
                .then(() => {
                    return this.db.allDocs({ include_docs: true });
                })
                .then(docs => {

                    // Each row has a .doc object and we just want to send an 
                    // array of food objects back to the calling code,
                    // so let's map the array to contain just the .doc objects.

                    return docs.rows.map(row => {
                        // Convert string to date, doesn't happen automatically.
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });
                }));
    }

    getChanges(): Observable<any> {
        return Observable.create(observer => {

            // Listen for changes on the database.
            this.db.changes({ live: true, since: 'now', include_docs: true })
                .on('change', change => {
                    // Convert string to date, doesn't happen automatically.
                    change.doc.Date = new Date(change.doc.Date);
                    observer.next(change.doc);
                });
        });
    }
}
