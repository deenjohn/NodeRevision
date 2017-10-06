

adding a 'data' event handler switches the Readable stream from paused to flowing mode and vice-versa.

```javascript

const { Writable } = require("stream");
const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());

    callback();
  }
});

process.stdin.pipe(outStream);

//works same as :
//process.stdin.pipe(process.stdout); 

```







