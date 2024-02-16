import { MMWLogMeta } from './log-meta.interface';

export interface MMWLogger {
  error(message: string, meta?: MMWLogMeta): void;
  warn(message: string, meta?: MMWLogMeta): void;
  info(message: string, meta?: MMWLogMeta): void;
  verbose?(message: string, meta?: MMWLogMeta): void;
  debug?(message: string, meta?: MMWLogMeta): void;
}
