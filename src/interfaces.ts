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
<<<<<<< HEAD
}

export interface WebpackConfigger {
    addEntry(moduleName: string, entry: string): any
    removeEntry(moduleName: string): void
=======
>>>>>>> d5b073921ea5fd056e11875907865bab78026024
}