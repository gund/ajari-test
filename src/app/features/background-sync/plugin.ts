import { Request, RequestMethod } from '@angular/http';
import { Operation, Plugin, PluginFactory, VersionWorker } from '@angular/service-worker/worker';

import {
  BG_SYNC_ALL_TAG,
  BG_SYNC_UNIQ_TAG,
  BgSyncEvent,
  clearAllRequests,
  getAllRequestsFor,
  setAllRequestsTo,
} from './background-sync';

export interface BackgroundSyncOptions {
  x: any;
}

export function BackgroundSync(options?: BackgroundSyncOptions): PluginFactory<BackgroundSyncImpl> {
  return worker => new BackgroundSyncImpl(worker);
}

export class BackgroundSyncImpl implements Plugin<BackgroundSyncImpl> {

  constructor(
    private worker: VersionWorker,
  ) {
    // This is a little late but for now the best we can do with NGSW
    self.addEventListener('sync', this.sync.bind(this));
  }

  setup(operations: Operation[]): void {
    operations.push(() => clearAllRequests());
  }

  private sync(e: BgSyncEvent) {
    e.waitUntil(this.handleSync(e.tag));
  }

  private async handleSync(tag: string): Promise<any> {
    if (tag !== BG_SYNC_ALL_TAG && !tag.startsWith(BG_SYNC_UNIQ_TAG)) {
      return await this.handleSync(BG_SYNC_ALL_TAG);
    }

    const requests = await getAllRequestsFor(tag);

    if (!requests.length) {
      return;
    }

    const fetches = requests
      .map(r => ({ url: r.url, init: this.normalizeRequest(r) }))
      .map(r => (console.log('sending req', r), r))
      .map(({ url, init }) => fetch(url, init));

    await Promise.all(fetches);

    setAllRequestsTo(tag, []);
  }

  private normalizeRequest(r: Request): RequestInit {
    const init: RequestInit = {
      method: RequestMethod[r.method].toUpperCase(),
      headers: new Headers(r.headers),
    };

    if (!init.headers.has('content-type')) {
      init.headers.set('content-type', 'application/json');
    }

    if (r.withCredentials) {
      init.credentials = 'include';
    }

    const body = (<any>r)['_body'];
    if (body) {
      init.body = JSON.stringify(body);
    }

    return init;
  }

}
