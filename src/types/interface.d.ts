import { AppConfig } from '@/types/config';
import { Express } from 'express';

export interface IFramework {
    init () : Promise< void >;
    getApp () : Express;
    isInitialized () : boolean;
    isStarted () : boolean;
}

export interface IConfigLoader {
    load () : Promise< AppConfig >;
}

export interface ILogger {
    error ( message: string, meta?: any ) : void;
    exit ( message: string, meta?: any ) : void;
    warn ( message: string, meta?: any ) : void;
    info ( message: string, meta?: any ) : void;
    debug ( message: string, meta?: any ) : void;
}
