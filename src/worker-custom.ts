import { Dynamic, FreshnessStrategy, PerformanceStrategy } from '@angular/service-worker/plugins/dynamic';
import { ExternalContentCache } from '@angular/service-worker/plugins/external';
import { Push } from '@angular/service-worker/plugins/push';
import { RouteRedirection } from '@angular/service-worker/plugins/routes';
import { StaticContentCache } from '@angular/service-worker/plugins/static';
import { bootstrapServiceWorker } from '@angular/service-worker/worker';

import { BackgroundSync } from './app/features/background-sync/plugin';

bootstrapServiceWorker({
  manifestUrl: 'ngsw-manifest.json',
  plugins: [
    StaticContentCache(),
    Dynamic([
      new FreshnessStrategy(),
      new PerformanceStrategy(),
    ]),
    ExternalContentCache(),
    RouteRedirection(),
    Push(),
    BackgroundSync(),
  ],
});
