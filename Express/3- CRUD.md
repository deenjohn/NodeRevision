

# home :       
GET : http://localhost:3000/

## Find chat room :  
GET : http://localhost:3000/admin/rooms 

## CREATE a chat room : 
GET : http://localhost:3000/admin/rooms/add

POST : http://localhost:3000/admin/rooms/add

## EDIT chat room :
'/admin/rooms/edit/:id'
GET : http://localhost:3000/admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb
POST : http://localhost:3000/admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb

## DELETE chat room :
GET : /admin/rooms/delete/:id


## views :
   layout.jade
   index.jade
   rooms.jade
   add.jade
   edit.jade
.......................................................   

## Steps :

A central repo for data
  data 
     rooms.json
     
We also need a body parser to parse the request :

https://expressjs.com/en/resources/middleware/body-parser.html
https://www.npmjs.com/package/qs#readme
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

```javascript

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));  //Change accepted type for parsers
  
```
 
.................................
# CREATE room cycle
## CREATE a chat room : 

in rooms.jade

```javascript
h1 Chat Rooms
    a.btn.btn-primary(href="/admin/rooms/add") Create a new chat room
    
```
    
clicking on this button sends a GET request , GET : http://localhost:3000/admin/rooms/add   

```javascript

GET : http://localhost:3000/admin/rooms/add 

app.get('/admin/rooms/add', function (req, res) {
    res.render("add");  //add.jade
});



in add.jade

form(method="post")

POST : http://localhost:3000/admin/rooms/add  
  
app.post('/admin/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);                      //var rooms = require("./data/rooms.json");

    res.redirect("/admin/rooms");    // redirect to rooms.jade,  sends a GET request to http://localhost:3000/admin/rooms
});


After POST , // redirect to rooms.jade,  sends a GET request to http://localhost:3000/admin/rooms
res.redirect("/admin/rooms");

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms         // sends the updated rooms data
    });
});


```


//create room cycle ends here
............................................................

# EDIT room cycle

## EDIT chat room :
'/admin/rooms/edit/:id'
GET : http://localhost:3000/admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb
POST : http://localhost:3000/admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb



in rooms.jade 
   
   ```javascript

   td(style="width: 50px;"): a(href="/admin/rooms/edit/#{room.id}")
                        span.glyphicon.glyphicon-pencil
                    td= room.id
                    
```
clicking on pencil glyphicon , sends a GET request
       GET : http://localhost:3000/admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb

in apps.js

```javascript

app.get('/admin/rooms/edit/:id', function(req, res){
    var roomId = req.params.id;                    //parse the query string 'id'

    var room = _.find(rooms, r => r.id === roomId);
    if(!room){
        res.sendStatus(404);
        return;
    }

    res.render("edit", { room });             
});

// sends the edit.jade page
```

in edit.jade 

```javascript
// res.render("edit", { room }); the found room object  is sent to edit.jade

form(method="post")
        fieldset.form-group
            label(for="name") Name:
            input.form-control(name="name", type="text", placeholder="Enter a name", value="#{room.name}") 
            small.text-muted Give your chat room a meaningful name for people to refer to it.
        button.btn.btn-primary(type="submit") Save chat room
        a.btn.btn-default(href="/admin/rooms") Cancel

```
clicking on submit button (Save chat room) sends a POST request :
POST : http://localhost:3000/admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb

in apps.js

update the chat room in POST EDIT handler

```javascript

app.post('/admin/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;        

    var room = _.find(rooms, r => r.id === roomId);
    if(!room){
        res.sendStatus(404);
        return;
    }

    room.name = req.body.name;  // input.form-control(name="name",

    res.redirect("/admin/rooms");
});

```


At the end of POST request , redirect to /admin/rooms  
by sending a GET request : http://localhost:3000/admin/rooms


 // EDIT Room cycle ends here
 
....................................

# DELETE room cycle

## DELETE chat room :
GET : /admin/rooms/delete/:id

in rooms.jade

```jade

 tr
                  td(style="width: 50px;"): a(href="/admin/rooms/delete/#{room.id}")
                        span.glyphicon.glyphicon-remove
                  td= room.name
                    
```


clicking on delete glyphicon-remove  sends a DELETE GET request 
  GET : http://localhost:3000/admin/rooms/delete/6c45a844-6930-499b-80cc-b8ffa3a2e857

DELETE handler in apps.js

```javascript

app.get('/admin/rooms/delete/:id', function(req, res){
    var roomId = req.params.id;

    rooms = rooms.filter(r => r.id !== roomId);        // rooms.json is filtered

    res.redirect("/admin/rooms");
});

```
redirect to rooms by sending a GET request to 
GET : http://localhost:3000/admin/rooms


```javascript

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms     //sends the updated rooms data
    });
});

```



............................................






































   
   
   
   
   
   
   
