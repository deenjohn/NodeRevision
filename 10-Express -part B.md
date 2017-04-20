

https://expressjs.com/en/resources/middleware.html
http://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js

jsonfile.writeFile('f.json', JSON.stringify(tweets), {spaces:2}, function(err){
      console.log(err);
     });


using twitter API

client.get('search/tweets', {q: 'Sonu nigam'}, function(error, tweets, response) {
	
	var jsn = JSON.stringify(tweets);
	
	jsonfile.writeFile('f.json', jsn, function(err){
          console.log(err);
         });
          var obj = JSON.parse(jsn);
      obj.statuses.forEach(function(st){

        console.log(st.text);
        console.log("................")

      });
    
  });
