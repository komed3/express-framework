import { AppConfig } from '@/types/config';
import { IConfigLoader } from '@/types/interface';
import { load } from 'js-yaml';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { cwd } from 'node:process';

export class ConfigLoader implements IConfigLoader {

    private readonly configPath: string;
    private readonly env: string;

    constructor ( configPath?: string, env?: string ) {
        this.configPath = join( cwd(), configPath ?? 'config/default.yml' );
        this.env = env ?? process.env.NODE_ENV ?? 'production';
    }

    private async loadConfigFile ( path: string ) : Promise< Partial< AppConfig > > {
        if ( ! existsSync( path ) ) return {};

        const ext = extname( path ).toLowerCase();
        const content = await readFile( path, 'utf8' );

        switch ( ext ) {
            case '.json': return JSON.parse( content );
            case '.yaml': case '.yml': return load( content ) as Partial< AppConfig >;
            default: throw new Error( `Unsupported config file format: ${ext}` );
        }
    }

    public async load () : Promise< AppConfig > {
        const config = await this.loadConfigFile( this.configPath );
        return {} as AppConfig;
    }

}
