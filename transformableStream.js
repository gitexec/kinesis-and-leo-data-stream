const { Transform } = require('stream');

class MyTransform extends Transform {
  constructor(options) {
    super(options);
    this.c = 97
  }

  _transform(line, enc, cb) {
    this.push(line.toString().toUpperCase())
    cb()
  }

}

const test = new MyTransform()
process.stdin.pipe(test).pipe(process.stdout)

process.on('exit', (code) => {
  console.log(`bye bye: ${code}`);
});

process.on('error', (code) => {
  console.log(`bye bye`);
});