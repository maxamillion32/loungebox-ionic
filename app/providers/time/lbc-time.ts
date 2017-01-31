import * as moment from 'moment';
import { Injectable } from "@angular/core";
import { NavController, Alert } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';

@Injectable()
export class LbcTime {

    constructor() {
    }

    utcNowToISOString():string{
        return moment().utc().toISOString();
    }

    utcNow():Date{
        return moment().utc();
    }

}