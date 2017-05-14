var OAuth = require('OAuth').OAuth2;


var Facebook = function (facebookKey, facebookSecret) {

    var key = facebookKey;
    var secret = facebookSecret;

    var oauth = new OAuth(
        key, secret, 'https://graph.facebook.com',
        null,
        'oauth2/token',
        null
    );
    var getImage = function(userKey, done) {
        oauth.get(
      'https://graph.facebook.com/v2.3/me/picture?redirect=false&type=large',
      userKey, //test user token
      function (e, results, res){
          //console.log('hi');
        if (e) console.error('error: ' + e);  
          //console.log(res);
        results = JSON.parse(results)
        done(results.data.url);      
      });    
    }
    var getFriends = function(userKey, done) {
        oauth.get(
      'https://graph.facebook.com/v2.3/me/friends?redirect=false',
      userKey, //test user token
      function (e, results, res){
          //console.log('hi');
        if (e) console.error('error: ' + e);  
          //console.log(res);
        results = JSON.parse(results)
        console.log(results.data);
        done(results.summary);      
      });    
    }
    return {
        getImage: getImage,
        getFriends: getFriends
    }

}


module.exports = Facebook;