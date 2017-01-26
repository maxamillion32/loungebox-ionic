import {  OpaqueToken } from "@angular/core";
// Although the ApplicationConfig interface plays no role in dependency injection, 
// it supports typing of the configuration object within the class.
export interface IApplicationConfig {
  appName: string;
  apiEndpoint: string;
  PouchDBSyncUrl:string  ;

//Security
  oauthTokenEndpoint:string;
}

// Configuration values for our app
export const APP_CONFIG: IApplicationConfig = {
  appName: 'Loungebox.CLUB',
  apiEndpoint: 'https://localhost:44351',
  PouchDBSyncUrl:'http://anwar:anwar@192.168.0.21:5984/loungebox',
  oauthTokenEndpoint :'/token'

};

// Create a config token to avoid naming conflicts
export const APP_CONFIG_TOKEN = new OpaqueToken('config');