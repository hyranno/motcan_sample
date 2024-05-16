import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  server: {
    host: true
  },
  plugins: [
    motionCanvas(),
    ffmpeg(),
  ],
});
