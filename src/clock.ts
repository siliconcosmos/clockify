

export class Clock {
    private hi: string = 'Hello World';
    private config: ClockConfig;
    private state: ClockState = 'initial';

    constructor(configuration?:ClockConfig) {
        this.config = { ...DEFAULT_CONFIG, ...configuration };
    }

    public configure(configuration: ClockConfig) {
        if (this.state === 'started' || this.state === 'paused') {
            throw new Error(`Cannot configure a clock that is "started" or "paused". Clock state is: ${this.state}`);
        }
        this.config = { ...DEFAULT_CONFIG, ...configuration };
    }

    public start():void {

    }

    public stop():void {
        
    }

    public pause():void {

    }

    public read():string {
        return "";
    }
}

export interface ClockConfig {
    mode?: 'stopwatch'|'countdown'
    interval?: number,
    target?: number,
    initial?: number
}

const DEFAULT_CONFIG: ClockConfig = {
    mode: 'stopwatch',
    interval: 500,
    target: 0,
    initial: 0
}

type ClockState = 'initial'|'started'|'stopped'|'paused';