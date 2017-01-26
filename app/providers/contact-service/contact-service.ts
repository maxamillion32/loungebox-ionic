import { Injectable,Http } from '@angular/core';
import {Contacts} from 'ionic-native';

@Injectable()
export class ContactService {
    constructor() {}
  findContacts(val):Promise<any> {
      //More camera cordova options below:
      Contacts.find(['*'], {filter: val}).
        then((contacts) => {
          if(this.contactsfound.length == 0) return null;
            return contacts;
          //alert(JSON.stringify(contacts[0]));
      });
      
          
  }
}


// // find all contacts with 'Bob' in any name field
// var options      = new ContactFindOptions();
// options.filter   = "Bob";
// options.multiple = true;
// options.desiredFields = [navigator.contacts.fieldType.id];
// options.hasPhoneNumber = true;
// var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
// navigator.contacts.find(fields, onSuccess, onError, options);
