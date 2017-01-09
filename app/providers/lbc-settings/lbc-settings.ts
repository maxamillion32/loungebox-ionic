import { Injectable,Inject, OnInit } from '@angular/core';
import { APP_CONFIG_TOKEN, APP_CONFIG, IApplicationConfig } from '../config-service/config-service';

/*
 This will serve as config container
*/
@Injectable()
export class LbcSettings implements OnInit {


  constructor(
    @Inject(APP_CONFIG_TOKEN) public configService

  ) { }

  ngOnInit() {



  }
 
}

