import { resolve } from 'path';

import { Opts, packageCreator } from '@kjots/package-creator';

const templateZip = resolve(__dirname, '../template.zip');

export function createTypescriptPackage(opts: Opts) {
  packageCreator(templateZip, opts);
}
