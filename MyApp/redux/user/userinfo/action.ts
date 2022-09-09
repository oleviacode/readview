import {User} from './state';

export function logName(username: User) {
  return {
    type: 'LOG_NAME' as const,
    username: username,
  };
}

export type logNameAction = ReturnType<typeof logName>;
export type userActions = logNameAction;
