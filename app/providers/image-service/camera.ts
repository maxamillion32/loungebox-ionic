import {Camera} from 'ionic-native';
import { Injectable,Http } from '@angular/core';

@Injectable()
export class Camera {
    private db;

    constructor(private platform: Platform,
        private http: Http,
        private utils: Utils,
        private geoLoc: GeoLocation
    ) { }

    takePicture() : Promise<any> {
      return Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            return "data:image/jpeg;base64," + imageData;
        });
    }

}
