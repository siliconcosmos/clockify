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

    public static of(count:number, unit:DurationUnit):Duration {
        let result: Duration|null = null;
        switch (unit) {
            case 'days':
                result = new Duration({ days: count });
                break;
            case 'hours':
                result = new Duration({ hours: count });
                break;
            case 'minutes':
                result = new Duration({ minutes: count });
                break;
            case 'seconds':
                result = new Duration({ seconds: count });
                break;
            case 'milliseconds':
                result = new Duration({ millis: count });
        }

        if (result) {
            return result;
        }

        throw new Error(`Unable to construct a duration for count of ${count} and unit of ${unit}`);
    }

    // Return a Duration parsed from a space separated string in the format "<count> <unit>" e.g. 30 seconds, 5 minutes, 2 days
    public static parse(parseable:string):Duration {
        try {
            const groups:string[] = Strings.unwrapMatch(parseable, DURATION_REGEX);
            if (!groups || groups.length !== 2) {
                throw new Error(`String could not be split into count and unit`);
            }

            const count:number = Number.parseInt(groups[1]);
            const unit:DurationUnit = cookDurationUnit(groups[2]);        

            return Duration.of(count, unit);
        } catch (e) {
            throw new Error(`Unable to parse ${parseable} as a Duration`, { cause: e });
        }
    }

    // Return the duration value converted to the target unit
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

    // Return the truncated integer value of the duration converted to the target unit
    public as(unit:DurationUnit) {
        return Math.trunc(this.in(unit));
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
            totalMillis += values.millis;
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