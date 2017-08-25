import { Injectable } from '@angular/core';
import { Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BG_SYNC_ALL_TAG, BG_SYNC_UNIQ_TAG, getAllRequestsFor, setAllRequestsTo } from './background-sync';

@Injectable()
export class BackgroundSyncService {

  static lastUniqTask = 0;

  pendingSyncs$ = Observable.fromPromise(
    navigator.serviceWorker.ready
      .then(swReg => swReg.sync.getTags())
  ).map<any, number>(regs => regs ? regs.length : 0);

  get lastUniqTask() {
    return `${BG_SYNC_UNIQ_TAG}${BackgroundSyncService.lastUniqTask++}`;
  }

  send(tag: string, request: Request) {
    return Observable.fromPromise((async () => {
      const requests = await getAllRequestsFor(tag);
      requests.push(request);
      return await setAllRequestsTo(tag, requests);
    })())
      .mergeMap(() => this._sendSyncReq(tag));
  }

  sendAll(request: Request) {
    return this.send(BG_SYNC_ALL_TAG, request);
  }

  sendUniq(request: Request) {
    return this.send(this.lastUniqTask, request);
  }

  private _sendSyncReq(tag: string) {
    return Observable.fromPromise(
      navigator.serviceWorker.ready.then(swReg => swReg.sync.register(tag))
    );
  }

}
