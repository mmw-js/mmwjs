import { MWContext, RMiddleware } from '../route';
import { createPipe, PipeOrFn } from '../pipe';
import { identity, isFunction, isString } from 'lodash';

export function useQuery<const K extends string>(
  key: K,
): RMiddleware<any, Record<K, string | string[] | undefined>>;

export function useQuery<const K extends string, T = string>(
  key: K,
  pipe: PipeOrFn<string | string[] | undefined, T>,
): RMiddleware<any, Record<K, Awaited<T>>>;

export function useQuery<const K extends string>(
  key: K,
  paramKey: string,
): RMiddleware<any, Record<K, string | string[] | undefined>>;

export function useQuery<const K extends string, T = string>(
  key: K,
  paramKey: string,
  pipe: PipeOrFn<string | string[] | undefined, T>,
): RMiddleware<any, Record<K, Awaited<T>>>;

export function useQuery(
  key: string,
  paramOrPipe?: string | PipeOrFn<string | string[] | undefined, any>,
  pipe?: PipeOrFn<string | string[] | undefined, any>,
) {
  const paramKey = isString(paramOrPipe) ? paramOrPipe : key;
  const transform = createPipe(
    pipe ?? (isFunction(paramOrPipe) ? paramOrPipe : identity),
  );
  return async (state: any, ctx: MWContext) => {
    return { [key]: await transform(ctx.query[paramKey]) };
  };
}
