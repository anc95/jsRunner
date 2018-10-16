export interface Option {
    dir?: string
    // webpack plugin
    plugins?: any[],
    // webpack module
    rules?: any[],
    // webpack resolve
    resolve?: any,
    port?: number,
    // excutor function
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