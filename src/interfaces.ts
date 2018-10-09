export interface Option {
    dir?: string
    plugins?: any[],
    loaders?: [],
    port?: number,
    excutor?: string
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

export interface Entry {
    ensureEntryDir(): string
}