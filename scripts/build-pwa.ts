import { exec as execOld } from 'child_process';

const ngPwaToolsBin = `node_modules/ng-pwa-tools/bin`;
const tsNode = `node node_modules/ts-node/dist/bin.js`;
const nguSwManifest = `node ${ngPwaToolsBin}/ngu-sw-manifest.js`;
const routes = `${tsNode} scripts/routes.ts`;
const rollup = `node node_modules/rollup/bin/rollup`;
const uglify = `npm run uglify --`;

main().catch(e => console.log(e));

async function main() {
  console.log('Generating static SW cache...');
  await exec(`${nguSwManifest} --out dist/ngsw-manifest.json`);

  console.log('Generating router SW cache...');
  await exec(`${routes} --out dist/ngsw-manifest.json --module src/app/app.module.ts`);

  console.log('Compiling custom SW...');
  await exec(`${rollup} -c rollup.worker.js`);

  console.log('Minifying custom SW...');
  await exec(`${uglify} -c --screw-ie8 --comments -o dist/worker-basic.min.js dist/worker-basic.js`);
}

function exec(cmd: string) {
  return new Promise((res, rej) => {
    execOld(cmd, (err, stdout, stderr) => {
      if (err) {
        rej(`${err}\n${stderr}`);
      } else {
        res(stdout);
      }
    });
  });
}
