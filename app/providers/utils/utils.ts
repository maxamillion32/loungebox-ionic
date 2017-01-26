import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Http, Response } from '@angular/http';
import {Logger1} from './logger';
import * as PouchDB from 'pouchdb';

@Injectable()
export class Utils {
    
    constructor(private platform: Platform, private log: Logger1) { }

    extractAsJson(res: Response) {

        this.log.warn('inside extract as Json');
        return res.json();

    }

    handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.log.error(JSON.stringify(error)); // log to console instead
        return Observable.throw(errMsg);
    }

}
