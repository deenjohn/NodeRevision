var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('703186593144235', '08c0e83ab9529e9a44160e772a628121');
var twitter = require('../services/twitter')('XMdFNmS90OOV8AZcHueuwnerV', 'K82cZEEryygSDDvbZHnyvx20rlxJDTSNZvnHWFUnrDtZb9zJ3R');



//middlewares 
router.use('/', function (req, res, next) {
        //User identified ? ! req.user
        if (!req.user) {
            console.log('user not identified. Redirecting...')
            res.redirect('/');
        }
        next();
    })
    /* GET users listing. */

router.use('/', function(req,res,next){
    if(req.user.twitter)
    {
        console.log("req.user.twitter")
        twitter.getTimeline(req.user.twitter.token,
                            req.user.twitter.tokenSecret,
                            req.user.twitter.id,
                           function(results){
                                req.user.twitter.lastPost = results[0].text;
                                next();
                            })
    }
})
//middlewares ends

router.get('/', function (req, res) {
    console.log(req.user);
    if (req.user.facebook) {
        console.log('if facebook');
        facebook.getImage(req.user.facebook.token,
            function (imageUrl) {
                console.log('got data');
                console.log(imageUrl);
                req.user.facebook.image = imageUrl;
                facebook.getFriends(req.user.facebook.token,
                    function (results) {
                        
                        console.log(results);
                    req.user.friends = results.total_count;
                        res.render('users', {
                            user: req.user
                        });
                    }
                )
            })
        } else {
            //google
            console.log("for google from routes/user.js")
            res.render('users', {
                user: req.user
            });
        }

    }
);


        module.exports = router;