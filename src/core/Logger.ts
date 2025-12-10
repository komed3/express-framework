import { LoggingConfig } from '../types/config';
import { ILogger } from '../types/interface';
import { exit } from 'node:process';

export class Logger implements ILogger {

    private readonly config: LoggingConfig;

    constructor ( config: LoggingConfig ) {
        this.config = config;
    }

    private log ( level: LoggingConfig[ 'level' ], message: string, meta?: any ) : void {}

    error ( message: string, meta?: any ) : void {
        this.log( 'error', message, meta );
    }

    exit ( message: string, meta?: any ) : void {
        this.log( 'error', message, meta );
        exit( 1 );
    }

    warn ( message: string, meta?: any ) : void {
        this.log( 'warn', message, meta );
    }

    info ( message: string, meta?: any ) : void {
        this.log( 'info', message, meta );
    }

    debug ( message: string, meta?: any ) : void {
        this.log( 'debug', message, meta );
    }

}
