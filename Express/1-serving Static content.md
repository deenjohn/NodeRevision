
```javascript



var express = require("express");
var app = express();

// all the static content is served from 'public' folder
//http://localhost:3000/style.css
app.use(express.static("public"));

//if not found in public folder , search in node_modules/bootstrap/dist
//http://localhost:3000/css/bootstrap.min.css
app.use(express.static("node_modules/bootstrap/dist"));

app.get("/hello", function(req, res) {
  res.send("Hello Worldss!");
});

app.listen(3000, function() {
  console.log("Chat app listening on port 3000!");
});


```



