import { Injectable } from "@angular/core";
import { NavController, Alert } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';

@Injectable()
export class DeviceNotification {

    constructor(private navController: NavController) {
        // LocalNotifications.on("click", (notification, state) => {
        //     let alert = Alert.create({
        //         title: "Notification Clicked",
        //         subTitle: "You just clicked the scheduled notification",
        //         buttons: ["OK"]
        //     });
        //     this.navController.present(alert);
        // });
    }

    schedule(notificationMsg:ILocalNotificationMessage) {

        LocalNotifications.schedule(notificationMsg);
        // LocalNotifications.schedule({
        //     title: "Test Title",
        //     text: "Delayed Notification",
        //     at: new Date(new Date().getTime() + 5 * 1000),
        //     sound: null
        // });
    }
    cancel(notificationId): Promise<any> {
        return LocalNotifications.cancel(notificationId);
    }
    clear(notificationId): Promise<any> {
        return LocalNotifications.clear(notificationId);
    }
    // hasPermission(): Promise<boolean> {
    //     return LocalNotifications.hasPermission();
    // }

}

//More details about the plugin here:
//https://github.com/katzer/cordova-plugin-local-notifications/wiki/04.-Scheduling
export interface ILocalNotificationMessage{
    id:number;
    title:string;
    text:string;

//The interval at which to reschedule the local notification. 
//That can be a value of second, minute, hour, day, week, month or year
// - Default: 0 (which means that the system triggers the local notification once)
    every:string;

//The date and time when the system should deliver the local notification. 
//If the specified value is nil or is a date in the past, the local notification is delivered immediately.
// - Default: now ~ new Date()
    at:Date,

    //The number currently set as the badge of the app icon in Springboard (iOS) or at the right-hand side of the local notification (Android)
    //- Default: 0 (which means don't show a number)
    badge:number;
    
    //sound:Uri;
    data:string;

}