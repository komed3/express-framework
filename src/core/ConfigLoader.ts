import { AppConfig } from '@/types/config';
import { IConfigLoader } from '@/types/interface';

export class ConfigLoader implements IConfigLoader {

    constructor ( configPath?: string, env?: string ) {}

    public async load () : Promise< AppConfig > {
        return {} as AppConfig;
    }

}
