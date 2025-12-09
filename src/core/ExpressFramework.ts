import { IFramework } from '../interfaces/IFramework';
import express, { Express } from 'express';

export class ExpressFramework implements IFramework {

    private app: Express;

    constructor ( configPath?: string, env?: string ) {

        this.app = express();

    }

    public async init () : Promise< void > {}

    public static async create ( configPath?: string, env?: string ) : Promise< ExpressFramework > {

        const framework = new ExpressFramework( configPath, env );
        await framework.init();

        return framework;

    }

}
