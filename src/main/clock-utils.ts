import { Duration, DurationParams, DurationUnit, DurationValues } from "./duration";

export const Clockify = {
    duration(duration:Duration, includeUnits:DurationUnit[] = ['minutes', 'seconds'], separator:string = ':'):string {
        return clockifyDuration(duration, includeUnits, separator);
    },
    durationParams(params:DurationParams, includeUnits:DurationUnit[] = ['minutes', 'seconds'], separator:string = ':'):string {
        return this.duration(new Duration(params), includeUnits, separator);
    },
    seconds(seconds:number, includeUnits:DurationUnit[] = ['minutes', 'seconds'], separator:string = ':'):string {
        return this.duration(Duration.of(seconds, 'seconds'), includeUnits, separator);
    },
    milliseconds(millis:number, includeUnits:DurationUnit[] = ['minutes', 'seconds'], separator:string = ':'):string {
        return this.duration(Duration.of(millis, 'milliseconds'), includeUnits, separator);
    }
}

function clockifyDuration(duration:Duration, includeUnits:DurationUnit[] = ['minutes', 'seconds'], separator:string = ':'):string {
    const values:DurationValues = duration.asValues();
    let parts:(number|string)[] = [];

    includeUnits.forEach(unit => {
        const currVal:number = values[unit];
        if (unit === 'milliseconds') {
            parts.push(String(currVal).padStart(3, '0')); 
        } else {
            parts.push(currVal); 
        }
    });

    return parts.map((x) => String(x).padStart(2, '0')).join(separator);
}