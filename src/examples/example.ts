import { Clock } from '../clockify';
import { Duration } from '../duration'
// import { Clock } from '../../dist/clock';
// import { Clock } from '../../dist/clockify';

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
c.configure({ mode: 'countdown', initial: Duration.of(1, 'minutes') });
c.start();

setTimeout(() => {
    c.pause();
    console.log(c.state)
}, 5000);
setTimeout(() => {
    c.start();
    console.log(c.state)
}, 10000);


console.log("hello world");

export {};