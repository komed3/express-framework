import { IFramework } from '../types/interface';
import express, { Express } from 'express';

export class ExpressFramework implements IFramework {

    private app: Express;
    private initialized = false;
    private started = false;

    constructor ( configPath?: string, env?: string ) {
        this.app = express();
    }

    public async init () : Promise< void > {}

    public getApp () : Express {
        return this.app;
    }

    public isInitialized () : boolean {
        return this.initialized;
    }

    public isStarted () : boolean {
        return this.started;
    }

    public static async create ( configPath?: string, env?: string ) : Promise< ExpressFramework > {
        const framework = new ExpressFramework( configPath, env );
        if ( ! framework.isInitialized() ) await framework.init();

        return framework;
    }

}
