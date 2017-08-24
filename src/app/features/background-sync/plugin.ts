import { Operation, Plugin, PluginFactory, VersionWorker } from '@angular/service-worker/worker';

export interface BackgroundSyncOptions {
  x: any;
}

export function BackgroundSync(options?: BackgroundSyncOptions): PluginFactory<BackgroundSyncImpl> {
  return worker => new BackgroundSyncImpl(worker);
}

export class BackgroundSyncImpl implements Plugin<BackgroundSyncImpl> {

  constructor(
    private worker: VersionWorker,
  ) { }

  setup(operations: Operation[]): void {
    self.addEventListener('sync', this.sync.bind(this));
  }

  private sync(e: any) {
    console.log('bg-sync', e.tag);
  }

}
