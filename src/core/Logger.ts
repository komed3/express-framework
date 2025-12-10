import { LoggingConfig } from '../types/config';
import { ILogger } from '../types/interface';
import { exit } from 'node:process';

export class Logger implements ILogger {

    private readonly config: LoggingConfig;
    private static readonly LEVEL: LoggingConfig[ 'level' ][] = [
        'error', 'warn', 'info', 'debug'
    ];

    constructor ( config: LoggingConfig ) {
        this.config = config;
    }

    private shouldLog ( level: LoggingConfig[ 'level' ] ) : boolean {
        const logLevel = Logger.LEVEL.indexOf( this.config.level );
        const msgLevel = Logger.LEVEL.indexOf( level );
        return msgLevel <= logLevel;
    }

    private formatLogEntry ( level: string, message: string, meta?: any ) : any {}

    private fileLog ( entry: any ) : void {}

    private consoleLog ( level: string, entry: any ) : void {}

    private log ( level: LoggingConfig[ 'level' ], message: string, meta?: any ) : void {
        if ( ! this.shouldLog( level ) ) return;
        const entry = this.formatLogEntry( level, message, meta );
        if ( this.config.file?.enabled ) this.fileLog( entry );
        if ( this.config.console?.enabled ) this.consoleLog( level, entry );
    }

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
