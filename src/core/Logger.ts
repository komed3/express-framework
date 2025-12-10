import { LoggingConfig } from '../types/config';
import { ILogger } from '../types/interface';

export class Logger implements ILogger {

    private readonly config: LoggingConfig;

    constructor ( config: LoggingConfig ) {
        this.config = config;
    }

}
