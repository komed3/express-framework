import { AppConfig } from '@/types/config';
import { IConfigLoader } from '@/types/interface';
import { load } from 'js-yaml';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { cwd } from 'node:process';

export class ConfigLoader implements IConfigLoader {

    constructor ( configPath?: string, env?: string ) {}

    private async loadConfigFile ( path: string ) : Promise< Partial< AppConfig > > {
        const fullPath = join( cwd(), path );
        if ( ! existsSync( fullPath ) ) return {};

        const ext = extname( fullPath ).toLowerCase();
        const content = await readFile( fullPath, 'utf8' );

        switch ( ext ) {
            case '.json': return JSON.parse( content );
            case '.yaml': case '.yml': return load( content ) as Partial< AppConfig >;
            default: throw new Error( `Unsupported config file format: ${ext}` );
        }
    }

    public async load () : Promise< AppConfig > {
        return {} as AppConfig;
    }

}
