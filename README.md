# Clockify Timer
A tiny stopwatch, chronometer, and countdown timer library with millisecond precision built in TypeScript. Support for state change events implemented via RxJs. Use it in the browser or NodeJs.

See the docs for live examples of the library in action: http://clockify.siliconcosmos.com
See the docs for live examples of the library in action: http://clockify.siliconcosmos.com/examples


## Project Setup
Build the project:
```
> npm run build
# OR
> npm run watch
```

Run a demo of the project with:
```
> npm run demo
```
This demo is equivalent to the live demo in the docs.


## Usage
### Import the Library
ES Modules:
``` typescript
import { Clock, Duration } from "clockify.js";
```
Require statement:
``` typescript
var { Clock, Duration } = require("clockify.js");
```

### Quickstart Example
Setup a new clock with some basic configuration.
``` typescript
let c = new Clock({ 
    mode: 'countdown',
    initial: Duration.of(20, 'seconds')
});
```
This creates a new countdown clock with an inital time of 20 seconds. If we set no configuration the mode would default to 'stopwatch' and initial time would default to 0 seconds.

We can start the clock...
```typescript
c.start();
```
pause the clock...
```typescript
c.pause();
```
and stop the clock. Stopping the clock will cause it to revert to initial on next start.
```typescript
c.stop();
```
We can also reconfigure the clock later.
```typescript
c.configure({ 
    mode: 'countdown',
    initial: Duration.of(10, 'minutes'),
    interval: Duration.of(100, 'milliseconds')
});
```
The update interval would otherwise default to 500ms.

When the clock is running (or any other phase, really) we can fetch the state.
```typescript
const cState = c.state;
// Which returns:
{
    phase: 'running',
    time: {} //some Duration object
}
```
We can access the time in a particular unit.
```typescript
cState.time.as('milliseconds'); // e.g. 9845
```
OR convert the time to a nice clock style string
```typescript
import { Clockify } from "clockify.js";

Clockify.duration(cState.time, ['hours', 'minutes', 'seconds']);
// Which returns:
// 00:09:57
```
The units are not mandatory and would default to `['minutes', 'seconds']`. We can also clockify other things.
```typescript
// all Duration params are optional
Clockify.durationParams({ days: 1, hours: 3, minutes: 30, seconds: 10, milliseconds: 0 });
Clockify.seconds(280, [['minutes', 'seconds'], ';']); // optional separator character results in - 04;40
Clockify.milliseconds(10000); // 00:10
```
OR we could subscribe to clock updated events and do any of these things in the callback.
```typescript
c.events.subscribe('updated', (state:ClockState) => {
    console.log(state.phase);
    console.log(state.time.as('milliseconds'));
    console.log(Clockify.duration(state.time));
});
```

The library also contains typescript definitions with doc comments for editors which support hinting. 

See the docs for more examples and API details: http://clockify.siliconcosmos.com
