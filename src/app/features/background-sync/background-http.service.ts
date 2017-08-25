import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  Http,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  ResponseOptions,
} from '@angular/http';

import { BackgroundSyncService } from './background-sync.service';

@Injectable()
export class BackgroundHttpService extends Http {

  pendingSyncs$ = this.bgSync.pendingSyncs$;

  constructor(
    backend: ConnectionBackend,
    options: RequestOptions,
    private bgSync: BackgroundSyncService,
  ) {
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs) {
    if (typeof url === 'string') {
      url = new Request({ url });
    }

    const urlStr = url.url;

    return navigator.onLine
      ? super.request(url, options)
      : this.bgSync.sendAll(Object.assign({}, url, options))
        .map(() => new Response(new ResponseOptions({ url: urlStr, body: '{}' })));
  }

}
