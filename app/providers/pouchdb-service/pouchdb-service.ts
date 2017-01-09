import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as PouchDB from 'pouchdb';
import { APP_CONFIG_TOKEN, APP_CONFIG, IApplicationConfig } from '../config-service/config-service';
import {LbcSettings} from '../lbc-settings/lbc-settings'
@Injectable()
export class PouchdbService {

  data: any;
  db: any;
  remote: any;

  constructor(private http: Http, settings: LbcSettings) {
    //PouchDB.debug.enable('*');

    this.db = new PouchDB('loungebox');
    //this.db.info().then(console.log.bind(console));  

    this.remote = new PouchDB(settings.configService.PouchDBSyncUrl);

    let options = {
      live: true
      //,
      //retry: true,
      //continuous: true

    };

    //PouchDB.replicate('mydb', 'http://localhost:5984/mydb');
    this.db.sync(this.remote)

      .on('error', function (err) {
        debugger;
        console.log('erro sync' + JSON.stringify(err));

        // handle error
      });

  }

  getTodos() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      console.log('executing puch....');

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        console.log('todos:' + result.rows.length);

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });

  }

  createTodo(todo) {
    this.db.post(todo).catch(function (error) {
      console.log('efror' + JSON.stringify(error));

    });
  }

  updateTodo(todo) {
    this.db.put(todo).catch((err) => {
      console.log(err);
    });
  }

  deleteTodo(todo) {
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change) {

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }

    }

  }

}