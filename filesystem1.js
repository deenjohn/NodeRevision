

var fs = require("fs");
//var fd;

console.log(
  "'r flag' - Open file for reading. An exception occurs if the file does not exist."
);

console.log("............");

//https://github.com/nodejs/node/blob/master/lib/fs.js#L518

//https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback

fs.open(__dirname + "mynewfile2.txt", "w", function(err, fd) {
  if (err) throw err;

  console.log("created file");

  fs.write(fd, "1write", function(err) {
    if (err) {
      console.log(err);
    }
    console.log("file written");
  });
});

fs.open(__dirname + "mynewfile2.txt", "a", function(err, fd) {
  if (err) throw err;

  //fs.write(fd, string[, position[, encoding]], callback)

  //fs.write(fd, "\n123", 2, function(err)

  //fs.write(fd, buffer[, offset[, length[, position]]], callback)
  var buffer = new Buffer("\n123");
  fs.write(fd, buffer, 2, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("file written");
  });
});
