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
        this.configPath = configPath ?? 'default.yml';
        this.env = env ?? process.env.NODE_ENV ?? 'production';
    }

    private getFullPath ( path?: string ) : string {
        return join( cwd(), 'config', path ?? this.configPath );
    }

    private async loadConfigFile ( path?: string ) : Promise< Partial< AppConfig > > {
        path = this.getFullPath( path ?? this.configPath );
        if ( ! existsSync( path ) ) return {};

        const ext = extname( path ).toLowerCase();
        const content = await readFile( path, 'utf8' );

        switch ( ext ) {
            case '.json': return JSON.parse( content );
            case '.yaml': case '.yml': return load( content ) as Partial< AppConfig >;
            default: throw new Error( `Unsupported config file format: ${ext}` );
        }
    }

    private async loadEnvConfigFile ( env?: string ) : Promise< Partial< AppConfig > > {
        env = env ?? this.env;
        const possible = [ `${env}.json`, `${env}.yaml`, `${env}.yml` ];
        for ( const path of possible ) if ( existsSync( this.getFullPath( path ) ) ) {
            return this.loadConfigFile( path );
        }
        return {};
    }

    public async load () : Promise< AppConfig > {
        const baseConfig = await this.loadConfigFile();
        const envConfig = await this.loadEnvConfigFile();
        return {} as AppConfig;
    }

}
