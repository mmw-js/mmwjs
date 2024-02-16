import session from 'koa-session';
import { AppPlugin } from '../app';

export function useSessionPlugin(
  keys: string[],
  config?: Partial<session.opts>,
): AppPlugin {
  return (app) => {
    app.kapp.keys = keys;
    if (config) app.kapp.use(session(config, app.kapp));
    else app.kapp.use(session(app.kapp));
  };
}
