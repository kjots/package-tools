import yargs from 'yargs';

import { defaults } from '@kjots/package-creator';

import { createTypescriptMonorepoPackage } from '..';

const argv = yargs
  .usage('Usage: $0 [options]')
  .options({
    help: {
      alias: 'h'
    },
    output: {
      alias: 'o',
      describe: 'Package output directory',
      nargs: 1,
      default: defaults.output
    },
    name: {
      alias: 'n',
      describe: 'Package name',
      nargs: 1,
      default: defaults.name
    },
    monorepo: {
      alias: 'm',
      describe: 'Monorepo name',
      nargs: 1,
      demandOption: true
    },
    description: {
      alias: 'd',
      describe: 'Package description',
      nargs: 1
    },
    keywords: {
      alias: 'k',
      describe: 'Package keywords',
      array: true,
      default: defaults.keywords
    }
  })
  .argv;

createTypescriptMonorepoPackage({
  output: argv.output as string,
  name: argv.name as string,
  monorepo: argv.monorepo as string,
  description: argv.description as string,
  keywords: argv.keywords as Array<string>
});
