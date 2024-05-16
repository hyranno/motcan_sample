import {Circle, makeScene2D} from '@motion-canvas/2d';
import {createRef, useDuration, waitUntil} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Create your animations here

  const circle = createRef<Circle>();

  view.add(<Circle ref={circle} size={320} fill={'lightseagreen'} />);

  yield* circle().scale(2, useDuration('event0')).to(1, 2);
  yield* waitUntil('event1');
});
