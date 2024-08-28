import {Circle, SVG, makeScene2D} from '@motion-canvas/2d';
import {ThreadGenerator, all, createRef, useDuration, useLogger, useTime, waitFor, waitUntil} from '@motion-canvas/core';

var timings: number[] = [];

export default makeScene2D(function* (view) {
  // Create your animations here
  timings = [];

  const svg = createRef<SVG>();
  const rawsvg = `
    <svg>
      <text stroke="#0000ff" fill="#0000ff" y="10">Lorem ipsum dolor</text>
      <rect width="10" height="10" fill="#0000ff"></rect>
    </svg>
  `;
  view.add(<SVG ref={svg} svg={rawsvg} scale={11} />);

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
