import { Subject, Subscription } from "rxjs";
import { Duration } from "./duration";

export class Clock {
    private intervalId:NodeJS.Timeout|number;
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
        this.intervalId = -1;
        this.configure({ ...DEFAULT_CONFIG, ...configuration });
        this.events = new ClockEventObserver();         
    }

    public configure(configuration:ClockParams) {
        if (this.phase === 'running' || this.phase === 'paused') {
            throw new Error(`Cannot configure a clock that is ${this.phase}.`);
        }
        this.config = { ...DEFAULT_CONFIG, ...configuration };
        this.directionMultiplier = (this.config.mode === 'countdown') ? -1 : 1;
        this.resetState();
    }

    public start(): void {
        if (this.phase === 'stopped') {
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

    private update() {
        const currentPollMs:number = performance.now();        
        const elapsedMs:number = currentPollMs - this.lastPollMs;
        const newTimeMs = this.currentTime.in('milliseconds') + (elapsedMs * this.directionMultiplier);
        
        this.currentTime = Duration.of(newTimeMs, 'milliseconds');
        this.lastPollMs = currentPollMs;

        if (this.isFinished()) {
            this.stop();
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
     * 'stopwatch' - clock will count forwards through time. If target is 0, the clock will run until stopped. 
     * 
     * 'countdown' - clock will count backwards through time. If initial is 0 and target is 0, the clock will stop instantly. 
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

type ClockPhase = 'initialized'|'running'|'stopped'|'paused';
type ClockMode = 'stopwatch'|'countdown';

export interface ClockState {
    readonly time: Duration;
    readonly phase: ClockPhase;
}

class ClockEventObserver {

    updatedEvent:Subject<ClockState> = new Subject<ClockState>;
    startedEvent:Subject<ClockState> = new Subject<ClockState>;
    pausedEvent:Subject<ClockState> = new Subject<ClockState>;
    stoppedEvent:Subject<ClockState> = new Subject<ClockState>;
    finishedEvent:Subject<ClockState> = new Subject<ClockState>;

    public on(event:EventType, listener:(value:any) => void):Subscription {
        switch (event) {
            case 'updated':
                return this.updatedEvent.subscribe((v)=> listener(v));
            case 'started':
                return this.startedEvent.subscribe((v)=> listener(v));
            case 'stopped':
                return this.stoppedEvent.subscribe((v)=> listener(v));
            case 'finished':
                return this.finishedEvent.subscribe((v)=> listener(v));
            case 'paused':
                return this.pausedEvent.subscribe((v)=> listener(v));
        }
    }

    public emit(event:EventType, value:ClockState) {
        switch (event) {
            case 'updated':
                return this.updatedEvent.next(value);
            case 'started':
                return this.startedEvent.next(value);
            case 'stopped':
                return this.stoppedEvent.next(value);
            case 'finished':
                return this.finishedEvent.next(value);
            case 'paused':
                return this.pausedEvent.next(value);
        }
    }
}

type EventType = 'updated'|'started'|'stopped'|'finished'|'paused';
