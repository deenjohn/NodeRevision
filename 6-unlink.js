
//https://stackoverflow.com/questions/10822574/difference-between-path-normalize-and-path-resolve-in-node-js

const path = require("path");

var fs = require("fs");

fs.unlinkSync(path.resolve(__dirname + "/greet.txt")); //delete greet.txt

console.log(path.resolve(__dirname + "/greet.txt"));

// var filePath = 'c:/book/discovery.docx';
// fs.unlinkSync(filePath);
