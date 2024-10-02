import { Strings } from './utils.js';

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MILLIS_PER_SECOND: number = 1000;
const MILLIS_PER_MINUTE: number = SECONDS_PER_MINUTE * MILLIS_PER_SECOND;
const MILLIS_PER_HOUR: number = MINUTES_PER_HOUR * MILLIS_PER_MINUTE;
const MILLIS_PER_DAY: number = HOURS_PER_DAY * MILLIS_PER_HOUR;

const DURATION_REGEX:RegExp = /^([0-9]+) *(days|hours|minutes|seconds|milliseconds{1}).*$/i;

export class Duration {

    private valueInMillis: number;

    /**
     * Construct a new duration from a parameter object representing the duration unit values. 
     * @param params See DurationValues type for valid fields. All fields optional.
     */
    constructor(params:DurationParams) {
        if (!isDurationParams(params)) {
            throw new Error(`Invalid DurationParams: ${JSON.stringify(params)}`);
        } 
        this.valueInMillis = this.flattenParamsToMillis(params);
    }

    public static isDuration(ob: any): ob is Duration {
        return (ob as Duration).valueInMillis !== undefined &&
            (ob as Duration).as !== undefined &&
            (ob as Duration).asTotals !== undefined &&
            (ob as Duration).asValues !== undefined &&
            (ob as Duration).in !== undefined &&
            (ob as Duration).greaterThan !== undefined &&
            (ob as Duration).lessThan !== undefined;
    }
    
    /**
     * Return a Duration constructed from the provided count and DurationUnit
     * @param count The number of units the duration should represent
     * @param unit The time unit to create this duration from e.g. 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
     * @returns A new Duration
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
                return new Duration({ milliseconds: count });
        }

        throw new Error(`Unable to construct a duration for count of ${count} and unit of ${unit}`);
    }

    /**
     * Return a Duration parsed from a space separated string in the format "{{count}} {{unit}}" e.g. 30 seconds, 5 minutes, 2 days
     * @param parseable The string to parse
     * @returns A new Duration
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
    public as(unit:DurationUnit):number {
        return Math.trunc(this.in(unit));
    }

    /**
     * Represents this duration as a values object where the length of the duration is distributed across the various units from largest to smallest
     * @returns DurationValues
     */
    public asValues():DurationValues {
        const totals:DurationTotals = this.asTotals();
        return {
            days: totals.days,
            hours: totals.hours - (totals.days * HOURS_PER_DAY),
            minutes: totals.minutes - (totals.hours * MINUTES_PER_HOUR),
            seconds: totals.seconds - (totals.minutes * SECONDS_PER_MINUTE),
            milliseconds: totals.milliseconds - (totals.seconds * MILLIS_PER_SECOND)
        };
    }

    /**
     * Represents this duration as a values object where each value represents the total integer size of the duration expressed as that unit.
     * @returns DurationTotals
     */
    public asTotals():DurationTotals {
        return {
            days: this.as('days'),
            hours: this.as('hours'),
            minutes: this.as('minutes'),
            seconds: this.as('seconds'),
            milliseconds: this.as('milliseconds')
        };
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
    
    private flattenParamsToMillis(values: DurationParams) {
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
        if (values.milliseconds) {
            totalMillis += Math.trunc(values.milliseconds);
        }
        return totalMillis;
    }
}
/**
 * @type 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
 */
export type DurationUnit = keyof DurationValues;
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

export type DurationValues = {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
}
export type DurationParams = Partial<DurationValues>;
export function isDurationParams(ob: any): ob is DurationParams {
    return (ob as DurationParams).days !== undefined || 
        (ob as DurationParams).hours !== undefined || 
        (ob as DurationParams).minutes !== undefined || 
        (ob as DurationParams).seconds !== undefined || 
        (ob as DurationParams).milliseconds !== undefined;
}

type DurationTotals = Readonly<DurationValues>;