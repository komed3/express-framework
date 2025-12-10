export interface LoggingConfig {
    level: 'error' | 'warn' | 'info' | 'debug';
    format: 'json' | 'simple' | 'full';
    file?: {
        enabled: boolean;
        pattern: string;
    };
    console?: {
        enabled: boolean;
    };
}

export interface AppConfig {
    logging: LoggingConfig;
}
