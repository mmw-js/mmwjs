import { ClassSchema, Fn } from '../../core';
import Joi from 'joi';
import { createPipe, Pipe } from '../index';
import { validate } from 'class-validator';
import { BadRequest } from 'http-errors';

export function validationPipe<C extends object>(
  schema: ClassSchema<C>,
): Pipe<any, Promise<C>>;

export function validationPipe<C>(schema: Joi.Schema<C>): Pipe<any, Promise<C>>;

export function validationPipe(
  schema: ClassSchema<object> | Joi.Schema,
): Pipe<any, Promise<any>> {
  if ('validateAsync' in schema) {
    return createPipe(async (obj: any) => {
      try {
        return await schema.validateAsync(obj);
      } catch (err) {
        throw new BadRequest(err);
      }
    });
  } else {
    return createPipe(async (obj: any) => {
      const validateObj: Record<string, any> = new schema();
      for (const key in obj) {
        validateObj[key] = obj[key];
      }
      const res = await validate(validateObj);
      if (!res.length) return obj;
      else throw new BadRequest(JSON.stringify(res));
    });
  }
}

export function customValidationPipe<T>(fn: Fn<any, T>) {
  return createPipe(fn);
}
