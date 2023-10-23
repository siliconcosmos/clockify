import { Subject, Subscription } from "rxjs";
import { ClockState } from "./clock.js";

export interface ClockEventSubscriber {    
    subscribe(type:EventType, subscriber:(value:any) => void):Subscription;
}
export interface ClockEventPublisher {
    publish(type:EventType, value:ClockState):void;
}

export class ClockEventManager implements ClockEventSubscriber, ClockEventPublisher {

    updatedEvent:Subject<ClockState> = new Subject<ClockState>;
    startedEvent:Subject<ClockState> = new Subject<ClockState>;
    pausedEvent:Subject<ClockState> = new Subject<ClockState>;
    stoppedEvent:Subject<ClockState> = new Subject<ClockState>;
    finishedEvent:Subject<ClockState> = new Subject<ClockState>;

    public subscribe(type:EventType, subscriber:(value:any) => void):Subscription {
        switch (type) {
            case 'updated':
                return this.updatedEvent.subscribe((v)=> subscriber(v));
            case 'started':
                return this.startedEvent.subscribe((v)=> subscriber(v));
            case 'stopped':
                return this.stoppedEvent.subscribe((v)=> subscriber(v));
            case 'finished':
                return this.finishedEvent.subscribe((v)=> subscriber(v));
            case 'paused':
                return this.pausedEvent.subscribe((v)=> subscriber(v));
        }
    }

    public publish(type:EventType, value:ClockState) {
        switch (type) {
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

    public completeAll() {
        this.updatedEvent.complete();
        this.startedEvent.complete();
        this.pausedEvent.complete();
        this.stoppedEvent.complete();
        this.finishedEvent.complete();
    }

}

type EventType = 'updated'|'started'|'stopped'|'finished'|'paused';
