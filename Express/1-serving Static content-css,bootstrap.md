



```javascript



var express = require("express");
var app = express();

// all the static content is served from 'public' folder
//http://localhost:3000/style.css
app.use(express.static("public"));

//if not found in public folder , search in node_modules/bootstrap/dist
//http://localhost:3000/css/bootstrap.min.css
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/bootstrap/js"));
//GET : http://localhost:3000/ 'index.html' is served from public folder

app.get("/", function(req, res) {
  res.send("Hello!");
});

app.get("/hello", function(req, res) {
  res.send("Hello Worldss!");
});

app.listen(3000, function() {
  console.log("Chat app listening on port 3000!");
});


```



```html

<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Chat</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/css/bootstrap-theme.min.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="/jquery-min.js"></script>
    <script src="/popper.min.js"></script>
    <script src="/bootstrap-min.js"></script>

</head>

<body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/">Home</a></li>
                    <li><a href="/admin/rooms">Chat Rooms</a></li>
                    <li><a href="/admin/users">Users</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">Dropdown</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">

        <div class="main-content">
            <h1>Hello from index.html</h1>
        </div>

    </div>

</body>

</html>



```







