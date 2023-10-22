import { Clock, ClockState, Duration } from '../clockify';

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
    initial: Duration.of(10, 'seconds'), 
    target: Duration.of(1, 'seconds'),    
    interval: Duration.of(500, 'milliseconds')
});
c.events.on('started', (state:ClockState) => {
    console.log(`STARTED }}}}}}}}}}`)
    console.log(state.time.in('seconds'))
    console.log(state.time.as('milliseconds'))
    console.log(`{{{{{{{{{ Started`)
});
c.events.on('updated', (state:ClockState) => {
    console.log(`UPDATED >>>>>>>>>>`)
    console.log(state.time.in('seconds'))
    console.log(state.time.as('milliseconds'))
    console.log(`<<<<<<<<<<<<< UPDATED`)
});
c.events.on('finished', (state:ClockState) => {
    console.log('FINISHED');
    console.log(state.time.in('seconds'))
    console.log(state.time.as('milliseconds'))
});
// c.configure({ mode: 'stopwatch' });
c.start();

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

export {};