import yargs from 'yargs';

import { getOpts, options } from '@kjots/package-creator/dist/bin/args';

import { createTypescriptMonorepoPackage } from '..';

const argv = yargs
  .usage('Usage: $0 [options]')
  .options({
    ...options,
    monorepo: {
      alias: 'm',
      describe: 'Monorepo name',
      nargs: 1,
      demandOption: true
    },
    references: {
      alias: 'r',
      describe: 'Package references',
      array: true,
      default: []
    }
  })
  .argv;

createTypescriptMonorepoPackage({
  ...getOpts(argv),
  monorepo: argv.monorepo as string,
  references: argv.references as Array<string>
});
