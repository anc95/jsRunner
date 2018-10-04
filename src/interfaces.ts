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

export interface WebpackConfigger {
    addEntry(moduleName: string, entry: string): any
    removeEntry(moduleName: string): void
}