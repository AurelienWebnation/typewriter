import { resolve } from 'path';

export default {
  build: {
    lib: {
      entry: resolve(__dirname, 'src/TypeWriter.ts'),
      name: '@aureliencabirol/typewriter',
      fileName: '@aureliencabirol/typewriter'
    }
  }
}