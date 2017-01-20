import { Injectable } from '@angular/core';


@Injectable()
export class Logger {


    constructor() { }

    debug(res: string) {
        console.debug(res);
    }

    log(res: string) {
        console.log(res);
    }
    warn(res: string) {
        console.warn(res);
    }
    error(res: string) {
        console.error(res);
    }

}
