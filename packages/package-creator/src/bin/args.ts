import { defaults } from '..';

import { Opts } from '..';

export const options = {
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
};

export const getOpts = (argv: any): Opts => ({
  output: argv.output as string,
  name: argv.name as string,
  description: argv.description as string,
  keywords: argv.keywords as Array<string>
});
