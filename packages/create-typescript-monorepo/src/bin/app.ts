import yargs from 'yargs';

import { defaults } from '@kjots/package-creator';

import { createTypescriptMonorepo } from '..';

const argv = yargs
  .usage('Usage: $0 [options]')
  .options({
    help: {
      alias: 'h'
    },
    output: {
      alias: 'o',
      describe: 'Project output directory',
      nargs: 1,
      default: defaults.output
    },
    name: {
      alias: 'n',
      describe: 'Project name',
      nargs: 1,
      default: defaults.name
    },
    description: {
      alias: 'd',
      describe: 'Project description',
      nargs: 1
    },
    keywords: {
      alias: 'k',
      describe: 'Project keywords',
      array: true,
      default: defaults.keywords
    }
  })
  .argv;

createTypescriptMonorepo({
  output: argv.output as string,
  name: argv.name as string,
  description: argv.description as string,
  keywords: argv.keywords as Array<string>
});
