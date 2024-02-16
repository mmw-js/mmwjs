import chalk from 'chalk';

export const defaultLevels = [
  'debug',
  'verbose',
  'info',
  'warn',
  'error',
] as const;

export type LogLevel = (typeof defaultLevels)[number];

export const levelColors = {
  debug: chalk.gray,
  verbose: chalk.black,
  info: chalk.cyan,
  warn: chalk.yellow,
  error: chalk.red,
};
