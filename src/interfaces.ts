export interface Option {
    dir?: string | string[]
    plugins?: any[],
    loaders?: [],
    port?: number
    [propName: string]: any
}

export interface RunJs {
    start(): any
    stop(): any
}