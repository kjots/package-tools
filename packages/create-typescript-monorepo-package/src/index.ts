import { resolve } from 'path';

import { Opts as PackageCreatorOpts, packageCreator } from '@kjots/package-creator';

const templateZip = resolve(__dirname, '../template.zip');

export interface Opts extends PackageCreatorOpts {
  monorepo: string;
}

export function createTypescriptMonorepoPackage(opts: Opts) {
  const { monorepo, ...packageCreatorOpts } = opts;
  const templateContext = { monorepo };

  packageCreator(templateZip, { ...packageCreatorOpts, templateContext });
}
