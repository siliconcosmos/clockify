import { Clock, ClockState, Clockify, Duration } from '../clockify.js';
import $ from 'jquery';

function writeToDom(selector:string, value:any) {
    $(selector).html(value);
    $(selector).html(value);
}
function onClick(selector:string, handler:() => void) {
    $(selector).on('click', () => handler());
}

// #region jquery
// #region ex1
const ex1 = function() {
    const c = new Clock();
    let clockTxt = 'Not Started';
    let statusTxt = 'Running...';
    
    c.configure({ 
        target: Duration.of(30, 'seconds')
    });
    c.events.subscribe('updated', (state:ClockState) => {            
        clockTxt = Clockify.duration(state.time); 
        writeToDom('#ex1 .clockTxt', clockTxt);
    });
    c.events.subscribe('finished', (state:ClockState) => {            
        clockTxt = Clockify.duration(state.time);
        statusTxt = "FINISHED!";
        writeToDom('#ex1 .clockTxt', clockTxt);
        writeToDom('#ex1 .statusTxt', statusTxt);
    });
    
    writeToDom('#ex1 .clockTxt', clockTxt);
    writeToDom('#ex1 .statusTxt', statusTxt);
    c.start();
}
ex1();
// #endregion

// #region ex2
const ex2 = function() {
    const c = new Clock();
    let clockTxt = Clockify.duration(c.state.time, ['minutes', 'seconds', 'milliseconds']);
    let phaseTxt = c.state.phase.toLocaleUpperCase();

    c.configure({ target: Duration.of(365, 'days'), interval: Duration.of(100, 'milliseconds') });
    c.events.subscribe('started', (state:ClockState) => {
        phaseTxt = state.phase.toLocaleUpperCase();
        writeToDom('#ex2 .phaseTxt', phaseTxt);
    });
    c.events.subscribe('paused', (state:ClockState) => {
        phaseTxt = state.phase.toLocaleUpperCase();
        writeToDom('#ex2 .phaseTxt', phaseTxt);
    });
    c.events.subscribe('stopped', (state:ClockState) => {
        phaseTxt = state.phase.toLocaleUpperCase();
        writeToDom('#ex2 .phaseTxt', phaseTxt);
    });
    c.events.subscribe('updated', (state:ClockState) => {
        clockTxt = Clockify.duration(state.time, ['minutes', 'seconds', 'milliseconds']);
        writeToDom('#ex2 .clockTxt', clockTxt);
    });

    function start() {
        c.start();
    }
    function pause() {
        c.pause();
    }
    function stop() {
        c.stop();
    }

    onClick('#ex2 .startBtn', start);
    onClick('#ex2 .pauseBtn', pause);
    onClick('#ex2 .stopBtn', stop);
    writeToDom('#ex2 .phaseTxt', phaseTxt);
    writeToDom('#ex2 .clockTxt', clockTxt);
}
ex2();
// #endregion

// #region ex3
const ex3 = function() {
    const c = new Clock();
    let clockTxt = 'Not Started';
    let phaseTxt = c.state.phase.toLocaleUpperCase();

    c.configure({ mode: 'countdown', initial: Duration.of(5, 'minutes'), interval: Duration.of(100, 'milliseconds') });

    c.events.subscribe('started', (state:ClockState) => {
        phaseTxt = state.phase.toLocaleUpperCase();
        clockTxt = Clockify.duration(state.time);
        writeToDom('#ex3 .phaseTxt', phaseTxt);
        writeToDom('#ex3 .clockTxt', clockTxt);
    });
    c.events.subscribe('paused', (state:ClockState) => {
        phaseTxt = state.phase.toLocaleUpperCase();
        writeToDom('#ex3 .phaseTxt', phaseTxt);
    });
    c.events.subscribe('stopped', (state:ClockState) => {
        phaseTxt = state.phase.toLocaleUpperCase();
        writeToDom('#ex3 .phaseTxt', phaseTxt);
    });
    c.events.subscribe('finished', (state:ClockState) => {
        phaseTxt = state.phase.toLocaleUpperCase();            
        clockTxt = Clockify.duration(state.time);
        writeToDom('#ex3 .phaseTxt', phaseTxt);
        writeToDom('#ex3 .clockTxt', clockTxt);
    });
    c.events.subscribe('updated', (state:ClockState) => {
        clockTxt = Clockify.duration(state.time);
        writeToDom('#ex3 .clockTxt', clockTxt);
    });

    function start() {
        c.start();
    }
    function pause() {
        c.pause();
    }
    function stop() {
        c.stop();
    }

    c.start();

    onClick('#ex3 .startBtn', start);
    onClick('#ex3 .pauseBtn', pause);
    onClick('#ex3 .stopBtn', stop);
    writeToDom('#ex3 .phaseTxt', phaseTxt);
    writeToDom('#ex3 .clockTxt', clockTxt);
}
ex3();
// #endregion

// #endregion


// #region junk
// const testdur1 = Duration.of(123456789876, 'milliseconds');
// console.log(testdur1.asValues());
// console.log(Clockify.duration(testdur1));
// console.log(Clockify.duration(testdur1, ['hours', 'minutes', 'seconds', 'milliseconds']));
// console.log(Clockify.milliseconds(987654321, ['days', 'hours', 'minutes', 'seconds', 'milliseconds']));
// const testdur2 = Duration.of(10067, 'milliseconds');
// console.log(testdur2.asValues());
// console.log(Clockify.duration(testdur2));
// console.log(Clockify.duration(testdur2, ['minutes', 'seconds', 'milliseconds'], ';'));
// const params:DurationParams = {}
// const dur3 = new Duration(params)



// let c = new Clock();
// console.log(c.state); 
// c.start();
// console.log(c.state); 
// c.pause();
// console.log(c.state); 
// c.stop(); 
// console.log(c.state);

// let d = Duration.of(65, 'seconds');
// console.log(d.in('minutes'));
// console.log(d.as('minutes'));

// let d2 = Duration.parse("5 minutes").in('seconds');

// // c = new Clock({ mode: 'countdown', initial: Duration.of(1, 'minutes') });
// c.configure({ 
//     mode: 'countdown',
//     initial: Duration.of(5, 'seconds'),
//     target: Duration.of(1, 'seconds'),
//     interval: Duration.of(500, 'milliseconds')
// });
// c.events.subscribe('started', (state:ClockState) => {
//     console.log(`STARTED }}}}}}}}}}`)
//     console.log(state)
//     console.log(state.time.in('seconds'))
//     console.log(state.time.as('milliseconds'))
//     console.log(Clockify.duration(state.time))
//     console.log(`{{{{{{{{{ Started`)
// });
// c.events.subscribe('updated', (state:ClockState) => {
//     console.log(`UPDATED >>>>>>>>>>`)
//     console.log(state)
//     console.log(state.time.in('seconds'))
//     console.log(state.time.as('milliseconds'))
//     console.log(Clockify.duration(state.time, ['minutes', 'seconds', 'milliseconds']))
//     console.log(`<<<<<<<<<<<<< UPDATED`)
// });

// c.events.subscribe('stopped', (state:ClockState) => {
//     console.log('STOPPED ::::::::::');
//     console.log(state)
//     console.log(state.time.in('seconds'))
//     console.log(state.time.as('milliseconds'))
// });
// c.events.subscribe('finished', (state:ClockState) => {
//     console.log('FINISHED');
//     console.log(state)
//     console.log(state.time.in('seconds'))
//     console.log(state.time.as('milliseconds'))

//     c.revert();
//     c.configure({initial: Duration.of(0, 'seconds'), 
//     target: Duration.of(1000, 'seconds')})

//     c.events.subscribe('updated', (state:ClockState) => {
//         console.log(`UPDATED >>>>>>>>>> NEW`)
//         console.log(state)
//         console.log(state.time.in('seconds'))
//         console.log(state.time.as('milliseconds'))
//         console.log(`<<<<<<<<<<<<< UPDATED`)
//     });

//     console.log('restart:')
//     // c.start();
//     console.log(c.state)
// });
// // c.configure({ mode: 'stopwatch' });
// c.start();
// c.pause();
// c.pause();
// c.start();
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
// #endregion

export { };
