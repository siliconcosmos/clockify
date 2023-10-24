import { Clock, ClockState, Clockify, Duration, DurationParams } from '../clockify.js';
// import { Clockify } from '../clock.js';
// import { clockifyDuration } from "../clock-utils.js";



const testdur1 = Duration.of(123456789876, 'milliseconds');
console.log(testdur1.asValues());
console.log(Clockify.duration(testdur1));
console.log(Clockify.duration(testdur1, ['hours', 'minutes', 'seconds', 'milliseconds']));
console.log(Clockify.milliseconds(987654321, ['days', 'hours', 'minutes', 'seconds', 'milliseconds']));
const testdur2 = Duration.of(10067, 'milliseconds');
console.log(testdur2.asValues());
console.log(Clock.clockifyDuration(testdur2));
console.log(Clock.clockifyDuration(testdur2, ['minutes', 'seconds', 'milliseconds'], ';'));
const params:DurationParams = {}
const dur3 = new Duration(params)



let c = new Clock();
console.log(c.state); 
c.start();
console.log(c.state); 
c.pause();
console.log(c.state); 
c.stop(); 
console.log(c.state);

let d = Duration.of(65, 'seconds');
console.log(d.in('minutes'));
console.log(d.as('minutes'));

let d2 = Duration.parse("5 minutes").in('seconds');

// c = new Clock({ mode: 'countdown', initial: Duration.of(1, 'minutes') });
c.configure({ 
    mode: 'countdown',
    initial: Duration.of(5, 'seconds'),
    target: Duration.of(1, 'seconds'),
    interval: Duration.of(500, 'milliseconds')
});
c.events.subscribe('started', (state:ClockState) => {
    console.log(`STARTED }}}}}}}}}}`)
    console.log(state)
    console.log(state.time.in('seconds'))
    console.log(state.time.as('milliseconds'))
    console.log(Clock.clockifyDuration(state.time))
    console.log(`{{{{{{{{{ Started`)
});
c.events.subscribe('updated', (state:ClockState) => {
    console.log(`UPDATED >>>>>>>>>>`)
    console.log(state)
    console.log(state.time.in('seconds'))
    console.log(state.time.as('milliseconds'))
    console.log(Clock.clockifyDuration(state.time, ['minutes', 'seconds', 'milliseconds']))
    console.log(`<<<<<<<<<<<<< UPDATED`)
});

c.events.subscribe('stopped', (state:ClockState) => {
    console.log('STOPPED ::::::::::');
    console.log(state)
    console.log(state.time.in('seconds'))
    console.log(state.time.as('milliseconds'))
});
c.events.subscribe('finished', (state:ClockState) => {
    console.log('FINISHED');
    console.log(state)
    console.log(state.time.in('seconds'))
    console.log(state.time.as('milliseconds'))

    c.revert();
    c.configure({initial: Duration.of(0, 'seconds'), 
    target: Duration.of(1000, 'seconds')})

    c.events.subscribe('updated', (state:ClockState) => {
        console.log(`UPDATED >>>>>>>>>> NEW`)
        console.log(state)
        console.log(state.time.in('seconds'))
        console.log(state.time.as('milliseconds'))
        console.log(`<<<<<<<<<<<<< UPDATED`)
    });

    console.log('restart:')
    // c.start();
    console.log(c.state)
});
// c.configure({ mode: 'stopwatch' });
c.start();
c.pause();
c.pause();
c.start();
// c.pause();


// setTimeout(() => {
//     // c.pause();
//     console.log(c.state)
//     // c.configure({mode:'stopwatch'})
// }, 5000);
// setTimeout(() => {
//     c.start();
//     console.log(c.state)
// }, 10000);
// setTimeout(() => {
//     // c.start();
//     console.log(c.state)
// }, 20002);


// console.log("hello world");

export { };
