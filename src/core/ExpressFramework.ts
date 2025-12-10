import * as interfaces from '@/types/interface';
import { Logger } from '@/core/Logger';
import express, { Express } from 'express';

export class ExpressFramework implements interfaces.IFramework {

    private app: Express;
    private logger!: interfaces.ILogger;
    private initialized = false;
    private started = false;

    constructor ( configPath?: string, env?: string ) {
        this.app = express();
    }

    public async init () : Promise< void > {
        this.logger = new Logger( {} );
    }

    public getApp () : Express {
        return this.app;
    }

    public isInitialized () : boolean {
        return this.initialized;
    }

    public isStarted () : boolean {
        return this.started;
    }

    public get log () : interfaces.ILogger {
        return this.logger;
    }

    public static async create ( configPath?: string, env?: string ) : Promise< ExpressFramework > {
        const framework = new ExpressFramework( configPath, env );
        if ( ! framework.isInitialized() ) await framework.init();

        return framework;
    }

}
