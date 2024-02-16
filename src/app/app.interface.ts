import Koa from 'koa';
import { Controller } from '../controller';
import { AppPlugin } from './index';

export interface App {
  kapp: Koa;
  listen(port: number): this;

  use(fn: AppPlugin): this;

  useController(controller: Controller): this;
  useControllers(controllers: Controller[]): this;
}
