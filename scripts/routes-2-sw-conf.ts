import { coalesceToTerminals, matcherForTerminal } from 'ng-pwa-tools/lib/ls-routes/lib';

/**
 * Convert routes json file to SW config
 * @param {String} index
 * @param {Array} routes
 * @param {String=} baseUrl
 */
export function genRoutingManifest(index: string, routes: any[], baseUrl = '/') {
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.substr(0, baseUrl.length - 1);
  }

  const routesConfig = coalesceToTerminals(flattenRoutes(routes))
    .map((terminal: any) => matcherForTerminal(terminal, baseUrl))
    .reduce(
    (r: any, matcher: any) => (r[matcher.pattern] = { match: matcher.match }, r),
    {}
    );

  return ({ index: index, routes: routesConfig });
}

/**
 * @param {Array} routes
 * @param {String=} routes
 */
function flattenRoutes(routes: any[], path = ''): any[] {
  if (!routes) {
    return [];
  }

  if (path.endsWith('/')) {
    path = path.substr(0, path.length - 1);
  }

  return routes.reduce((acc, route) => {
    const { children, loadChildren } = route;
    delete route.children;
    delete route.loadChildren;

    if (path) {
      route.path = path + '/' + route.path;
    }

    return [
      ...acc,
      route,
      ...flattenRoutes(children, route.path),
      ...flattenRoutes(loadChildren, route.path)
    ];
  }, []);
}
