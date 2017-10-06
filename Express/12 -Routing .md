https://expressjs.com/en/guide/routing.html
https://expressjs.com/en/4x/api.html#router

```javascript

app
  .route("/book")
  .get(function(req, res) {
    res.send("Get a random book");
  })
  .post(function(req, res) {
    res.send("Add a book");
  })
  .put(function(req, res) {
    res.send("Update the book");
  });
  
  GET : http://localhost:3000/book
  POST : http://localhost:3000/book
  PUT : http://localhost:3000/book
 
 .................................
  
 birds.js
  
var express = require("express");


 var router = express.Router();

// middleware that is specific to this router

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();                              //forward request 
});

// define the home page route
router.get("/", function(req, res) {
  res.send("Birds home page");
});
// define the about route
router.get("/about", function(req, res) {
  res.send("About birds");
});

module.exports = router;    // EXPORT 


app.js

var birds = require("./birds");

app.use("/birds", birds);

GET : http://localhost:3000/birds


.................................
```



















