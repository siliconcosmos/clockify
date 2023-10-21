export class Duration {

    constructor(params:DurationParams) {

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

}

interface DurationParams {
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    millis?: number
}

export type DurationUnit =  'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';