#!/usr/bin/env node
import yargs from 'yargs';

import { getOpts, options } from '@kjots/package-creator/bin/args';

import { createTypescriptMonorepo } from '..';

const argv = yargs
  .usage('Usage: $0 [options]')
  .options(options)
  .argv;

createTypescriptMonorepo(getOpts(argv));
