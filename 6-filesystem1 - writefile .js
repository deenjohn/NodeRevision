



//fs.writeFile(file, data[, options], callback)
//fs.writeFile(filename, data, [encoding], callback)
//Asynchronously writes data to a file, replacing the file
//if it already exists. data can be a string or a buffer.

fs.writeFile(__dirname + "\\write-File.txt", "Hello Node.js", err => {
  if (err) throw err;
  console.log("The file has been saved!");
});
