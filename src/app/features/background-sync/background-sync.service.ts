import { Injectable } from '@angular/core';

import { BG_SYNC_ALL_TAG, BG_SYNC_UNIQ_TAG } from './background-sync';

@Injectable()
export class BackgroundSyncService {

  static lastUniqTask = 0;

  get lastUniqTask() {
    return `${BG_SYNC_UNIQ_TAG}${BackgroundSyncService.lastUniqTask++}`;
  }

  constructor() { }

  send(tag: string, url: string, data?: any) { }

  sendAll(url: string, data?: any) {
    return this.send(BG_SYNC_ALL_TAG, url, data);
  }

  sendUniq(url: string, data?: any) {
    return this.send(this.lastUniqTask, url, data);
  }

}
