import { Injectable,OnInit } from '@angular/core';
import {SQLite} from 'ionic-native';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {ReplaySubject,Subject} from 'rxjs/Rx';

interface ISQLDataService{
    executeSQL(sql:string,data:any);
}

class SQL_SETTINGS{

    public static SQL_CREATE:string="CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, clubber_id TEXT)";
    public static SQL_INSERT:string="INSERT INTO foods (name,clubber_id) VALUES (?,?)";
    constructor() { 


         
    }

}

@Injectable()
export class DataService implements ISQLDataService,OnInit  {

    private platform:Platform; 
    private database: SQLite;
    
    public databaseReady:ReplaySubject<any> = new ReplaySubject(1);

    constructor(platform: Platform) { 

        
    }

    ngOnInit(){
        
        //this.createData();
        
    }

   public createData(){
        let db = new SQLite();
        console.log('OPening db');
           db.openDatabase({
                name: "data.db",
                location: "default"
            }).then(() => {
                console.log('db created ok...' + SQL_SETTINGS.SQL_CREATE);
                
                db.executeSql(SQL_SETTINGS.SQL_CREATE, {}).then((data) => {
                    console.log("TABLE CREATED: ", data);
                    this.databaseReady.next("Data ready");

                }, (error) => {
                    console.error("Unable to execute sql",JSON.stringify(error));
                    this.databaseReady.error(new Error(error));

                })
            }, (error) => {
                console.error("Unable to open database", error);
                this.databaseReady.error(new Error(error));
            });
    }

    executeSQL(sql:string,data:any):Subject<any>{

        let values = new Subject();
        this.databaseReady.subscribe(function(){

             this.database.executeSql(sql, data).then((data) => {
                    return values.next(data);
                }, (error) => {
                    return values.error(new Error(error));
                });
         },function(error){

             return values.error(new Error(error));
         });

         return values;

    }

     public add(values:Array<any>) {
         this.databaseReady.subscribe(function(){

             this.database.executeSql(SQL_SETTINGS.SQL_INSERT, values).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
         });
        
    }
}

