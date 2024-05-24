import {Circle, makeScene2D} from '@motion-canvas/2d';
import {ThreadGenerator, all, createRef, useDuration, useLogger, useTime, waitFor, waitUntil} from '@motion-canvas/core';

var timings: number[] = [];

export default makeScene2D(function* (view) {
  // Create your animations here
  timings = [];

  const circle = createRef<Circle>();

  view.add(<Circle ref={circle} size={320} fill={'lightseagreen'} />);

  timings.push(useTime());
  yield* circle().scale(2, useDuration('event0')).to(1, 2);
  timings.push(useTime());
  yield* waitUntil('event1');
  yield* all(
    generator(circle()),
    waitGenerator(),
  );
  useLogger().info(timings.toString());
});


function* generator(circle: Circle): ThreadGenerator {
  yield* circle.scale(2, 2).to(1, 2);
}

function* waitGenerator(): ThreadGenerator {
  timings.push(useTime());
  yield* waitFor(6);
}
