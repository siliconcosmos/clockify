import { Clock, ClockState, Clockify, Duration } from '../moondial.js';
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
    const c = new Clock({ interval: Duration.of(100, 'milliseconds') });
    let clockTxt = Clockify.duration(c.state.time, ['minutes', 'seconds', 'milliseconds']);
    let phaseTxt = c.state.phase.toLocaleUpperCase();

    // c.configure({ target: Duration.of(365, 'days'), interval: Duration.of(100, 'milliseconds') });
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

export { };
