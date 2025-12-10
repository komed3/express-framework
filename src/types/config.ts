export type LoggingConfig = {
    level: 'error' | 'warn' | 'info' | 'debug';
    format: 'json' | 'simple' | 'full';
    file?: {
        enabled: boolean;
        pattern: string;
    };
    console?: {
        enabled: boolean;
        colorize: boolean;
    };
};
