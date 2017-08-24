import { exec as execOld } from 'child_process';

const ngPwaToolsBin = `node_modules/ng-pwa-tools/bin`;
const tsNode = `node node_modules/ts-node/dist/bin.js`;
const nguSwManifest = `node ${ngPwaToolsBin}/ngu-sw-manifest.js`;
const routes = `${tsNode} scripts/routes.ts`;

main().catch(e => console.log(e));

async function main() {
  console.log('Generating static SW cache...');
  await exec(`${nguSwManifest} --out dist/ngsw-manifest.json`);

  console.log('Generating router SW cache...');
  await exec(`${routes} --out dist/ngsw-manifest.json --module src/app/app.module.ts`);
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
