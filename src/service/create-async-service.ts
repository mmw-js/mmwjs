import { AsyncService } from './async-service.interface';
import { AsyncServiceError } from './async-service.error';
import { logger } from '../logger';
import chalk from 'chalk';

function baseSrvGetSet(): never {
  throw new AsyncServiceError('Uninitialized async service');
}

export function createAsyncService<T>(fn: () => Promise<T>): AsyncService<T> {
  const srv: AsyncService<T> = {
    setup: fn(),
    instance: null,
    status: 'pending',
    _get: baseSrvGetSet,
    _set: baseSrvGetSet,
  };

  srv.setup
    .then((instance) => {
      srv.instance = instance;
      srv._get = (key) => instance[key];
      srv._set = (key, value) => {
        instance[key] = value;
        return true;
      };
      srv.status = 'fulfilled';
    })
    .catch((err) => {
      logger.error(chalk.red(`Error during async service setup: ${err}`));
      srv.status = 'rejected';
    });

  return srv;
}
