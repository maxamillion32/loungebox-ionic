import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Http, Response } from '@angular/http';
import {Logger1} from '../utils/logger';
import * as PouchDB from 'pouchdb';
import { Device } from 'ionic-native';
@Injectable()
export class LbcDevice {
    
    constructor(private platform: Platform, private log: Logger1) { }

    getDeviceID() :string {

        return Device.device.uuid;
    }

}
