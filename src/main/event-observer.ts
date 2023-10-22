import { Subject, Subscription } from "rxjs";
import { ClockState } from "./clock.js";

export class ClockEventObserver {

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
