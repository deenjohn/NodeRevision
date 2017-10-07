

```javascript


var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

app.use(require("morgan")("combined", {stream: accessLogStream}));


```

