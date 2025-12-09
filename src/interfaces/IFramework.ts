import { Express } from 'express';

export interface IFramework {
    init () : Promise< void >;
    getApp () : Express;
}
