import { IFramework } from '../interfaces/IFramework';
import express, { Express } from 'express';

export class ExpressFramework implements IFramework {

    private app: Express;

    constructor () {
        this.app = express();
    }

}
