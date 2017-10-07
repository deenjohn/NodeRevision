
```javascript

var apiRouter = require("./api");
app.use("/api", apiRouter);

```

## Place the below code after all the routing code

```javascript

app.use(function(req,res,next){

  res.send('Got Error');

});

```
