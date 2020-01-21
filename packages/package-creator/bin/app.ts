#!/usr/bin/env node
import yargs from 'yargs';

import { packageCreator } from '..';

import { getOpts, options } from './args';

const argv = yargs
  .usage('Usage: $0 template.zip [options]')
  .demandCommand(1)
  .options(options)
  .argv;

packageCreator(argv._[0], getOpts(argv));
