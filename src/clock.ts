import { Duration, DurationValues } from "./duration";

export class Clock {
    private config: ClockConfig;
    private state: CState = 'initial';

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
    mode?: CMode,
    interval?: Duration,
    target?: Duration,
    initial?: Duration
}

const DEFAULT_CONFIG: ClockConfig = {
    mode: 'stopwatch',
    interval: Duration.of(500, 'milliseconds'),
    target: Duration.parse("0 seconds"),
    initial: Duration.parse("0 seconds")
}

type CState = 'initial'|'started'|'stopped'|'paused';
type CMode = 'stopwatch'|'countdown';