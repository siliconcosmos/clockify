import { Subject, Subscription } from "rxjs";
import { ClockState } from "./clock.js";

export interface ClockEventSubscriber {
    /**
     * Add a subscriber function for the supplied event type. Uses RxJS internally.
     * @param type EventType to subscribe to: 'updated'|'started'|'stopped'|'finished'|'paused'
     * @param subscriber A subscriber callback function accepting any value. Will be called when the supplied event is published.
     * @returns An RxJS Subscription
     */
    subscribe(type:EventType, subscriber:(value:any) => void):Subscription;

    /**
     * Unsubscribe all currently bound subscribers and reinitialize the event subscriber
     */
    unsubscribeAll():void;
}
export interface ClockEventPublisher {
    publish(type:EventType, value:ClockState):void;
}

export class ClockEventManager implements ClockEventSubscriber, ClockEventPublisher {

    private updatedEvent:Subject<ClockState> = new Subject<ClockState>;
    private startedEvent:Subject<ClockState> = new Subject<ClockState>;
    private pausedEvent:Subject<ClockState> = new Subject<ClockState>;
    private stoppedEvent:Subject<ClockState> = new Subject<ClockState>;
    private finishedEvent:Subject<ClockState> = new Subject<ClockState>;

    private init() {
        this.updatedEvent = new Subject<ClockState>;
        this.startedEvent = new Subject<ClockState>;
        this.pausedEvent = new Subject<ClockState>;
        this.stoppedEvent = new Subject<ClockState>;
        this.finishedEvent = new Subject<ClockState>;
    }

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

    public unsubscribeAll() {
        this.updatedEvent.complete();
        this.startedEvent.complete();
        this.pausedEvent.complete();
        this.stoppedEvent.complete();
        this.finishedEvent.complete();

        this.init();
    }

}

export type EventType = 'updated'|'started'|'stopped'|'finished'|'paused';
