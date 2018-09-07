const { Readable } = require('stream');

class MyReadable extends Readable {
  constructor(options) {
    super(options);
    this.c = 97
  }

  _read() {
    this.push(String.fromCharCode(this.c++).toUpperCase())

    if('z'.charCodeAt(0) < this.c){
    	this.push(null)
    }
  }

}

const test = new MyReadable()
test.pipe(process.stdout)

process.on('exit', function () {
    console.error('bye bye');
});
process.stdout.on('error', process.exit);