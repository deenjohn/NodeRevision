var OAuth = require('OAuth').OAuth;


var Twitter = function (twitterKey, twitterSecret) {

    var key = twitterKey;
    var secret = twitterSecret;

    var oauth = new OAuth(            
        'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      key,
      secret,
      '1.0A',
      null,
      'HMAC-SHA1'
    );
    var getTimeline = function(userKey, userSecret, userId, done) {
        console.log(userId, userKey, userSecret);
        oauth.get(
      'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=' + userId,
      userKey,
      userSecret,
      function (e, results, res){
          //console.log(res);
        if (e) console.error('error: ' + JSON.parse(e));  
          
        results = JSON.parse(results)
        console.log(results.length);
        done(results);      
      });    
    }
    
    return {
        getTimeline: getTimeline
    }

}


module.exports = Twitter;