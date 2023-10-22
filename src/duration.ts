import { Strings } from './utils';

const MILLIS_PER_SECOND: number = 1000;
const MILLIS_PER_MINUTE: number = 60 * MILLIS_PER_SECOND;
const MILLIS_PER_HOUR: number = 60 * MILLIS_PER_MINUTE;
const MILLIS_PER_DAY: number = 24 * MILLIS_PER_HOUR;

const DURATION_REGEX:RegExp = /^([0-9]+) *(days|hours|minutes|seconds|milliseconds{1}).*$/i;

export class Duration {

    private valueInMillis: number;

    constructor(values:DurationValues) {
        this.valueInMillis = this.flattenValues(values);
    }
    
    /**
     * Return a Duration parsed from a space separated string in the format "{{count}} {{unit}}" e.g. 30 seconds, 5 minutes, 2 days
     * @param count the number of units the duration should represent
     * @param unit the time unit to create this duration from e.g. 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
     * @returns Duration
     */
    public static of(count:number, unit:DurationUnit):Duration {
        switch (unit) {
            case 'days':
                return new Duration({ days: count });
            case 'hours':
                return new Duration({ hours: count });
            case 'minutes':
                return new Duration({ minutes: count });
            case 'seconds':
                return new Duration({ seconds: count });
            case 'milliseconds':
                return new Duration({ millis: count });
        }

        throw new Error(`Unable to construct a duration for count of ${count} and unit of ${unit}`);
    }

    /**
    * Return a Duration parsed from a space separated string in the format "{{count}} {{unit}}" e.g. 30 seconds, 5 minutes, 2 days
     * @param parseable string to parse
     * @returns Duration
     */
    public static parse(parseable:string):Duration {
        try {
            const groups:string[] = Strings.unwrapMatch(parseable, DURATION_REGEX);
            if (!groups || groups.length !== 3) {
                throw new Error(`String could not be split into count and unit`);
            }

            const count:number = Number.parseInt(groups[1]);
            const unit:DurationUnit = cookDurationUnit(groups[2]);        

            return Duration.of(count, unit);
        } catch (e) {
            throw new Error(`Unable to parse ${parseable} as a Duration`, { cause: e });
        }
    }

    /**
     * Return the duration value converted to the target unit
     * @param unit The target duration unit
     * @returns The numerical value of this duration in the specified unit
     */
    public in(unit:DurationUnit):number {
        switch (unit) {
            case 'days':
                return this.valueInMillis / MILLIS_PER_DAY;
            case 'hours':
                return this.valueInMillis / MILLIS_PER_HOUR;
            case 'minutes':
                return this.valueInMillis / MILLIS_PER_MINUTE;
            case 'seconds':
                return this.valueInMillis / MILLIS_PER_SECOND;
            case 'milliseconds':
                return this.valueInMillis;
        }
        throw new Error(`Unit of ${unit} is not supported.`);
    }

    /**
     * Converts this duration to an integer of the target unit. Remainder values will be truncated.
     * @param unit The target duration unit
     * @returns The truncated integer value of the duration converted to the target unit
     */
    public as(unit:DurationUnit) {
        return Math.trunc(this.in(unit));
    }

    /**
     * @param other Duration
     * @param orEqual optional
     * @returns boolean
     */    
    public greaterThan(other:Duration, orEqual?:boolean): boolean {
        if (orEqual) {
            return this.valueInMillis >= other.in('milliseconds');    
        }
        return this.valueInMillis > other.in('milliseconds');
    }

    /**
     * @param other Duration
     * @param orEqual optional
     * @returns boolean
     */
    public lessThan(other:Duration, orEqual?:boolean): boolean {
        if (orEqual) {
            return this.valueInMillis <= other.in('milliseconds');
        }
        return this.valueInMillis < other.in('milliseconds');
    }
    
    private flattenValues(values: DurationValues) {
        let totalMillis = 0;
        if (values.days) {
            totalMillis += values.days * MILLIS_PER_DAY;
        }
        if (values.hours) {
            totalMillis += values.hours * MILLIS_PER_HOUR;
        }
        if (values.minutes) {
            totalMillis += values.minutes * MILLIS_PER_MINUTE;
        }
        if (values.seconds) {
            totalMillis += values.seconds * MILLIS_PER_SECOND;
        }
        if (values.millis) {
            totalMillis += Math.trunc(values.millis);
        }
        return totalMillis;
    }
}

export type DurationUnit = 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';
function cookDurationUnit(raw:string):DurationUnit {
    switch (raw) {
        case 'days':
            return 'days';
        case 'hours':
            return 'hours';
        case 'minutes':
            return 'minutes';
        case 'seconds':
            return 'seconds';
        case 'milliseconds':
            return 'milliseconds';
    }
    throw new Error(`String ${raw} is not a valid duration unit`);
}

export interface DurationValues {
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    millis?: number
}