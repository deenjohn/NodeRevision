

const path = require("path");

var fs = require("fs");
var fp = path.resolve(__dirname + "/greet.txt");
console.log(fp);
var stats = fs.statSync(fp);
console.log(stats.size);

fs.truncateSync(fp, Math.round(stats.size / 2));
//console.log(path.join(__dirname + "greet.txt"));
