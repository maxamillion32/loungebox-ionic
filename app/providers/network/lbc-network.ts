import { Network } from 'ionic-native';
import { Injectable,OnDestroy,OnInit } from '@angular/core';
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
        this.determineNetworkType();
    }

    determineNetworkType(){
        if (Network.connection === 'wifi'){
            this.isOnlineThruWifi = true;
        } else if(['2g','3g','4g'].indexOf(Network.connection.toString()) > -1) {
            this.isOnlineThruData = true;
        }else {
            console.log('network:'+Network.connection);
        }

        console.log('network:'+JSON.stringify(Network.connection));
    }

    ngOnDestroy() {
        // stop disconnect watch
        if (this.disconnectSubscription) this.disconnectSubscription.unsubscribe();
        if (this.connectSubscription) this.connectSubscription.unsubscribe();

    }

    onChange(): Observable<any> {
        return Network.onConnect();
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


