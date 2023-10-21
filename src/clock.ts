import { Duration } from "./duration";

export class Clock {
    private intervalId:NodeJS.Timeout|number;
    private config: ClockConfig;
    private phase: ClockPhase;
    private currentTime: Duration;

    public get state():ClockState {
        return { 
            time: this.currentTime,
            phase: this.phase
        }
    }

    constructor(configuration?:ClockParams) {
        this.intervalId = -1;
        this.config = { ...DEFAULT_CONFIG, ...configuration };
        this.currentTime = this.config.initial;
        this.phase = 'initialized';
    }

    public configure(configuration:ClockParams) {
        if (this.phase === 'running' || this.phase === 'paused') {
            throw new Error(`Cannot configure a clock that is ${this.phase}.`);
        }
        this.config = { ...DEFAULT_CONFIG, ...configuration };
        this.resetState();
    }

    public start():void {
        if (this.phase === 'stopped') {            
            this.resetState();
        }

        this.intervalId = setInterval(
            this.update, 
            this.config.interval!.in('milliseconds')
        );
        this.update();
        this.phase = 'running';
    }

    public stop():void {
        if (this.phase === 'running') {
            clearInterval(this.intervalId);
        }
        this.phase = 'stopped';
    }

    public pause():void {
        if (this.phase === 'running') {
            clearInterval(this.intervalId);
        }
        this.phase = 'paused';
    }

    public read():string {
        return "";
    }

    private update() {

    }

    private resetState() {
        this.setState({ time: this.config.initial, phase: 'initialized' });
    }

    private setState(state:ClockState) {
        this.phase = state.phase;
        this.currentTime = state.time;
    }
}

export interface ClockParams {
    mode?: ClockMode;
    interval?: Duration;
    target?: Duration;
    initial?: Duration;
}

type ClockConfig = Required<ClockParams>
const DEFAULT_CONFIG: ClockConfig = {
    mode: 'stopwatch',
    interval: Duration.of(500, 'milliseconds'),
    target: Duration.parse("0 seconds"),
    initial: Duration.parse("0 seconds")
}

type ClockPhase = 'initialized'|'running'|'stopped'|'paused';
type ClockMode = 'stopwatch'|'countdown';

export interface ClockState {
    readonly time: Duration;
    readonly phase: ClockPhase;
}
