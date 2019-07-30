import { config } from "..";

export class LogableService {
  constructor () {
    this.showLogs = config.showLogs;
  }

  log (message, type = 'log') {
    if (this.showLogs) {
      switch (type) {
        default:
        case 'log':
          console.log(message);
          break;

        case 'error':
          console.error(message);
          break;

        case 'warn':
          console.warn(message);
          break;
      }
    }
  }
}
