https://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers/
https://nodejs.org/api/buffer.html
Samer buna advanced node course

https://nelsonic.gitbooks.io/node-js-by-example/content/core/buffer/README.html

#What Are Buffers?
Buffers are instances of the Buffer class in node, which is designed to handle raw binary data. Each buffer corresponds to some raw memory allocated outside V8. Buffers act somewhat like arrays of integers, but aren't resizable and have a whole bunch of methods specifically for binary data. In addition, the "integers" in a buffer each represent a byte and so are limited to values from 0 to 255 (2^8 - 1), inclusive.

#Where You See Buffers:

In the wild, buffers are usually seen in the context of binary data coming from streams, such as fs.createReadStream.



#Binary data type, to create:

          Buffer.alloc(size)
          Buffer.from(array)
          Buffer.from(buffer)
          Buffer.from(str[, encoding])

          #buffer.js
          Buffer.from = function(value, encodingOrOffset, length) {
            if (typeof value === 'number')
              throw new TypeError('"value" argument must not be a number');

            if (isArrayBuffer(value) || isSharedArrayBuffer(value))
              return fromArrayBuffer(value, encodingOrOffset, length);

            if (typeof value === 'string')
              return fromString(value, encodingOrOffset);

            return fromObject(value);
          };

#When we read from buffers , we need to provide encoding

The character encodings currently supported by Node.js include:

        'ascii' - for 7-bit ASCII data only. This encoding is fast and will strip the high bit if set.

        'utf8' - Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.

        'utf16le' - 2 or 4 bytes, little-endian encoded Unicode characters. Surrogate pairs (U+10000 to U+10FFFF) are supported.

        'ucs2' - Alias of 'utf16le'.

        'base64' - Base64 encoding. When creating a Buffer from a string, this encoding will also correctly accept "URL and Filename Safe Alphabet" as specified in RFC4648, Section 5.

        'latin1' - A way of encoding the Buffer into a one-byte encoded string (as defined by the IANA in RFC1345, page 63, to be the Latin-1 supplement block and C0/C1 control codes).

        'binary' - Alias for 'latin1'.

        'hex' - Encode each byte as two hexadecimal characters.
      
    
 #if no encoding provided for string then , it will automatically be assigned utf-8   
   function fromString(string, encoding) {
    if (typeof encoding !== 'string' || encoding === '')
      encoding = 'utf8';
      
 
 #Writting to buffers
    Buffer.prototype.write = function(string, offset, length, encoding) {
    
 #Buffer once allocated can't be resized
 
 #alloc vs unalloc 
 
 Buffer.alloc(8); will allocate 8 bytes and initialize them as 0 
 Buffer.allocUnsafe(8) will allocate 8 bytes but won't fill the created buffer.
 This is unsafe as it might contain old sensitive data.
 
 To fill unsafe buffer :
    Buffer.allocUnsafe(8).fill();
 
 
 #buf.slice([start[, end]]) 
 will share the original buffer and if this new buffer created by slice method make changes then these changes are reflected in original buffer too.
 
 #String decoder
 
 #buffer.copy(target, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
 > var frosty = new Buffer(24)
> var snowman = new Buffer("☃", "utf-8")
> frosty.write("Happy birthday! ", "utf-8")
16
> snowman.copy(frosty, 16) ;   // copied the "snowman" buffer, which contains a 3 byte long character, to the "frosty" buffer
3
> frosty.toString("utf-8", 0, 19) // the result takes up 19 bytes of the buffer.
'Happy birthday! ☃'
 
 
 
 ///https://nodejs.org/api/buffer.html#buffer_buf_write_string_offset_length_encoding
 
 
 #buf.write(string[, offset[, length]][, encoding])
 
 var buffer = new Buffer(16); //buffer of 16 bytes
 const a = buffer.write("Hello", "utf-8");
 console.log(a); // log 5  i.e wrote 5 bytes

 
 var buffer = new Buffer(16);
 const a = buffer.write("Hello", "utf-8");
 console.log(buffer.byteLength); //16
 buffer.write("world", "utf-8");  //overwrites the Hello and stuffed rest of the space with utf-8 characters for space
 //buffer.write("world", 5, "utf-8"); offset 5 bytes so , start from 6th 
 console.log(buffer.toString());
 
 #buffer.js
 case 'utf8':
 case 'utf-8':
        return this.utf8Write(string, offset, length);
 
 
