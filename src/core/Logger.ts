import { LoggingConfig } from '../types/config';
import { ILogger } from '../types/interface';
import { appendFileSync, mkdirSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';
import { cwd, exit } from 'node:process';

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

    private formatLogEntry ( level: string, message: string, meta?: any ) : any {
        const timestamp = new Date().toISOString();
        const levelStr = level.toUpperCase();
        const entry: any = { timestamp, level: levelStr, message };

        if ( meta instanceof Error ) entry.error = { name: meta.name, message: meta.message, stack: meta.stack };
        else if ( meta ) entry.meta = meta;

        switch ( this.config.format ) {
            case 'json': return entry;
            case 'simple': return `${timestamp} [${ levelStr }] ${message}`;
            case 'full':
                const metaStr = meta ? '\nMeta: ' + JSON.stringify( meta, null, 2 ) : '';
                return `${timestamp} [${ levelStr }] ${message}${metaStr}`;
            default: return entry;
        }
    }

    private fileLog ( entry: any ) : void {
        const string = typeof entry === 'string' ? entry : JSON.stringify( entry );
        const date = new Date().toISOString().split( '-' ).slice( 0, 2 ).join( '-' );
        const name = ( this.config.file?.pattern ?? 'logs/{DATE}.log' ).replace( '{DATE}', date );
        const path = join( cwd(), name );
        const logDir = path.split( '/' ).slice( 0, -1 ).join( '/' );
        mkdirSync( logDir, { recursive: true } );
        appendFileSync( path, string + EOL, 'utf8' );
    }

    private consoleLog ( level: LoggingConfig[ 'level' ], entry: any ) : void {
        ( console[ level ] ?? console.log )( entry );
    }

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
