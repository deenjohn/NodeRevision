When you request for a paige from server , server just send you the html string :

index.ejs 

<html>
	<head>
		<title>The MEAN stack</title>
    	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.js"></script>
	</head>
	<body>
      <script src="assets/js/app.js"></script>
	</body>
</html>

Then Browser see there is a <script tag , so it download this file and run it.

<script src="assets/js/app.js"></script> sends another request to server .
and in app.js , app.use('/assets', express.static(__dirname + '/public'))




................................................

Sending Data from Server to client 

in app.js 

//data 
var people = [
	{
		name: 'John Doe'
	},
	{
		name: 'Jane Doe'
	},
	{
		name: 'Jim Doe'
	}
];

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	
	res.render('index', { serverPeople: people }); //sending data to template which will be stored in a variable 
	
});


in index.ejs
<script>
			var clientPeople = <%- JSON.stringify(serverPeople) %>; //server will run the code inside <% %> and store it a variable
		</script>
    
    
    then on client i.e browser , will run this script and render the html page accordingly
    
