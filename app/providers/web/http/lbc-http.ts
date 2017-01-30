import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LbcHttp extends Http {
  /*constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
      super(backend, defaultOptions);
  }*/

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    console.log('request...');

    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {

    console.log('get...');

    return super.get(url, options)
      .catch(err => {
        console.log('catch');
        // if (err.status === 404) {
        //   console.log(' - 401');
        //   return super.get('https://contactsapi.apispark.net/v1/companies/', options);
        // } else {
        //   console.log(' - other');
        //   return Observable.throw(err);

        // }
        return Observable.throw(err);
      });
  }
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, options)
      .catch(err => {
        return Observable.throw(err);
        // console.log('catch');
        // if (err.status === 404) {
        //   console.log(' - 401');
        //   return super.get('https://contactsapi.apispark.net/v1/companies/', options);
        // } else {
        //   console.log(' - other');
        //   return Observable.throw(err);
        // }
      });
  }
}