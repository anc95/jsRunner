export interface Option {
    dir?: String | String[]
    plugins?: Plugin[]
    port?: number
}

export interface RunJs {
    start()
    stop()
}