import { Duration } from "./duration.js";
import { ClockEventObserver } from "./event-observer.js";

export class Clock {
    private intervalId?: ReturnType<typeof setTimeout>;
    private config: ClockConfig = DEFAULT_CONFIG;
    private phase: ClockPhase = 'initialized';
    private directionMultiplier: number = 1;
    private currentTime: Duration = Duration.of(0, 'milliseconds');
    private lastPollMs:number = performance.now();

    public events:ClockEventObserver = new ClockEventObserver();

    public get state():ClockState {
        return { 
            time: this.currentTime,
            phase: this.phase
        }
    }

    constructor(configuration?:ClockParams) {
        this.intervalId = undefined;
        this.configure({ ...DEFAULT_CONFIG, ...configuration });
        this.events = new ClockEventObserver();         
    }

    public configure(configuration:ClockParams) {
        if (this.isInActivePhase()) {
            throw new Error(`Cannot configure a clock that is ${this.phase}.`);
        }
        this.config = { ...DEFAULT_CONFIG, ...configuration };
        this.directionMultiplier = (this.config.mode === 'countdown') ? -1 : 1;
        this.resetState();
    }

    public start(): void {
        if (this.isInHaltedPhase()) {
            this.resetState();
        }
        
        this.intervalId = setInterval(
            () => this.update(),
            this.config.interval!.in('milliseconds')
        );
        this.lastPollMs = performance.now();
        // this.update(); //TODO: This causes instantaneous update notification, however ZERO time passes before this next up. More specifically, real time passed, but the 
        this.phase = 'running';
        this.events.emit('started', this.state);
    }

    public stop():void {
        if (this.phase === 'running') {
            clearInterval(this.intervalId);
        }
        this.phase = 'stopped';
        this.events.emit('stopped', this.state);
    }

    public pause():void {
        if (this.phase === 'running') {
            clearInterval(this.intervalId);
        }
        this.phase = 'paused';
        this.events.emit('paused', this.state);
    }

    public destroy() {
        this.events.completeAll();
        this.events = new ClockEventObserver();
        this.stop();
        this.configure(DEFAULT_CONFIG);
        // TODO: should this actually disable the clock completely? i.e. break all further usage? or maybe the name should just be "revert" or something
    }

    private update() {
        const currentPollMs:number = performance.now();        
        const elapsedMs:number = currentPollMs - this.lastPollMs;
        const newTimeMs = this.currentTime.in('milliseconds') + (elapsedMs * this.directionMultiplier);
        
        this.currentTime = Duration.of(newTimeMs, 'milliseconds');
        this.lastPollMs = currentPollMs;

        if (this.isFinished()) {
            this.stop();
            this.phase = 'finished';
            this.events.emit('finished', this.state);
            return;
        }
        this.events.emit('updated', this.state);
    }

    private isFinished():boolean {
        if (this.config.mode === 'countdown') {
            return this.config.target.greaterThan(this.currentTime);
        } else {
            return this.config.target.lessThan(this.currentTime);
        }
    }

    private isInActivePhase():boolean {
        return this.phase === 'running' || this.phase === 'paused';
    }

    private isInHaltedPhase():boolean {
        return this.phase === 'stopped' || this.phase === 'finished'
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
    /**
     * The mode the clock should run in. Defaults to 'stopwatch'.
     * 
     * 'stopwatch' - clock will count forwards through time. If initial is greater than target, the clock will stop instantly.
     * 
     * 'countdown' - clock will count backwards through time. If initial is less than target, the clock will stop instantly. 
     */
    mode?: ClockMode;
    /**
     * The frequency of the update loop. Defaults to 500ms. Values of zero or less will cause updates as fast as possible (not recommended).
     */
    interval?: Duration;
    /**
     * The target value for the clock. This is where counting will finish. Default: 0s
     */
    target?: Duration;
    /**
     * The initial value on the clock. This is where counting will start from. Default: 0s
     */
    initial?: Duration;
}

type ClockConfig = Required<ClockParams>
const DEFAULT_CONFIG: ClockConfig = {
    mode: 'stopwatch',
    interval: Duration.of(500, 'milliseconds'),
    target: Duration.parse("0 seconds"),
    initial: Duration.parse("0 seconds")
}

type ClockPhase = 'initialized'|'running'|'stopped'|'paused'|'finished';
type ClockMode = 'stopwatch'|'countdown';

export interface ClockState {
    readonly time: Duration;
    readonly phase: ClockPhase;
}
