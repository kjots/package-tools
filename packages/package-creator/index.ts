import { promises as fs } from 'fs';

import decompress from 'decompress';
import handlebars from 'handlebars';
import path from 'path';

import { camelCase, upperFirst } from 'lodash';

import { from, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { concatMap, filter, map, mergeAll, tap } from 'rxjs/operators';

import File = require('vinyl');

import { dest } from '@kjots/vinyl-fs-observable';

export type TemplateContextValue = undefined | null | boolean | number | string | Array<TemplateContextValue> | { [key: string]: TemplateContextValue };

export interface TemplateContext {
  [key: string]: TemplateContextValue;
}

export interface Opts {
  output: string;
  name: string;
  description?: string;
  keywords: Array<string>;
  templateContext?: TemplateContext;
}

export function packageCreator(templateZip: string, opts: Opts) {
  const { name, description } = opts;
  const nameCamelCase = camelCase(name);
  const nameTitleCase = upperFirst(nameCamelCase);
  const keywords = opts.keywords.map((keyword, i) => ({ keyword, first: i === 0, last: i === opts.keywords.length - 1 }));
  const templateContext = opts.templateContext || {};

  readTemplateFiles(templateZip)
    .pipe(
      applyTemplate({ name, nameCamelCase, nameTitleCase, description, keywords, ...templateContext }),
      dest(opts.output),
      concatMap(file => from(fs.chmod(file.path, file.mode)))
    )
    .subscribe();
}

function readTemplateFiles(templateZip: string): Observable<File> {
  return from(decompress(templateZip))
    .pipe(
      mergeAll(),
      filter(file => file.type === 'file'),
      map(file => new File({
        cwd: process.cwd(),
        base: templateZip,
        path: path.resolve(templateZip, file.path),
        mode: file.mode,
        contents: file.data
      }))
    );
}

function applyTemplate(templateContext: TemplateContext): MonoTypeOperatorFunction<File> {
  return tap(file => {
    if (file.path.endsWith('.mustache') && file.contents) {
      const template = handlebars.compile(file.contents.toString());

      file.path = file.path.substring(0, file.path.length - 9);
      file.contents = Buffer.from(template(templateContext));
    }
  });
}
