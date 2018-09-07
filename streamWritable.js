const { Writable } = require('stream');

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, cb) {
    console.log(chunk.toString())
    cb()
  }
}

const test = new MyWritable()
process.stdin.pipe(test)