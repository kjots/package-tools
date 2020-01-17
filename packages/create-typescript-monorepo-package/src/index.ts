import { resolve } from 'path';

import { defaults as packageCreatorDefaults, Opts as PackageCreatorOpts, packageCreator } from '@kjots/package-creator';

const templateZip = resolve(__dirname, '../template.zip');

export interface Opts extends PackageCreatorOpts {
  monorepo: string;
  references: Array<string>;
}

export const defaults: Partial<Opts> = {
  ...packageCreatorDefaults,
  references: []
};

export function createTypescriptMonorepoPackage(opts: Opts) {
  const { monorepo, ...packageCreatorOpts } = opts;
  const references = opts.references.map((reference, i) => ({ ...parseReference(reference), first: i === 0, last: i === opts.references.length - 1 }));
  const templateContext = { monorepo, references };

  packageCreator(templateZip, { ...packageCreatorOpts, templateContext });
}

function parseReference(reference: string): { reference: string, package: string, path: string } {
  const p = reference.indexOf(':');
  if (p !== -1) {
    return { reference, package: reference.substring(0, p), path: reference.substring(p + 1) };
  } else {
    return { reference, package: reference, path: reference };
  }
}
