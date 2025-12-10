import { AppConfig } from '@/types/config';
import * as interfaces from '@/types/interface';
import { Logger } from '@/core/Logger';
import express, { Express } from 'express';
import { ConfigLoader } from './ConfigLoader';

export class ExpressFramework implements interfaces.IFramework {

    private app: Express;
    private configLoader: interfaces.IConfigLoader;
    private config!: AppConfig;
    private logger!: interfaces.ILogger;
    private initialized = false;
    private started = false;

    constructor ( configPath?: string, env?: string ) {
        this.configLoader = new ConfigLoader( configPath, env );
        this.app = express();
    }

    public async init () : Promise< void > {
        this.config = await this.configLoader.load();
        this.logger = new Logger( this.config.logging );
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
