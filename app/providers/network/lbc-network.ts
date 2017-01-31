import { Network } from 'ionic-native';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { Http, Response } from '@angular/http';
import { Logger1 } from '../utils/logger';
import { Device } from 'ionic-native';

@Injectable()
export class LbcNetwork implements OnDestroy, OnInit {
    disconnectSubscription: any;
    connectSubscription: any;
    isOnlineThruWifi: boolean;
    isOnlineThruData: boolean;
    constructor(private platform: Platform, private log: Logger1) { }

    setup() {

        this.platform.ready()
            .then(() => {
                this.connectSubscription = this.onChange().subscribe(_ => {
                    setTimeout(() => this.determineNetworkType())
                    
                });
            });

    }

    ngOnInit() {
        this.setup();
    }

    determineNetworkType(){
        if (Network.type === 'wifi'){
            this.isOnlineThruWifi = true;
        } else if(['2g','3g','4g'].indexOf(Network.type) > -1) {
            this.isOnlineThruData = true;
        }
    }

    ngOnDestroy() {
        // stop disconnect watch
        if (this.disconnectSubscription) this.disconnectSubscription.unsubscribe();
        if (this.connectSubscription) this.connectSubscription.unsubscribe();

    }

    onChange(): Observable<any> {
        return Network.onDisconnect().onChange();
    }

    onDisconnect(): Observable<any> {
        return Network.onDisconnect().do(() => {
            console.log('network was disconnected :-(');
        });
    }

    onConnect(): Observable<any> {
        return Network.onConnect().do(() => {
            console.log('network was connected :-(');
        });
    }

}


