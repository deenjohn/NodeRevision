## 1) npm start will run command "node ./bin/www" which runs code inside for starting server

## 2) app.js
      //for images , css etc
      //http://localhost:3000/lib/jquery/dist/jquery.js

      app.use(express.static(path.join(__dirname, 'public')));



      /*var routes = require('./routes/index');
      var users = require('./routes/users');
      var auth = require('./routes/auth');*/

      app.use('/', routes); //index.js for    '/'
      app.use('/users', users); //users.js for       '/users'
      app.use('/auth', auth); //auth.js for       '/auth' '/auth'

## 3) runs config/passport.js which requires all the social strategies
## 4) localhost:3000 > will launch index.js which renders index.ejs
## 5) clicking on any icon , will connect to auth
     ex : clicking on any social link on index.ejs (index.html) , for ex - google link , will connect to 'auth/google'
      so this midlleware : app.use('/auth', auth); //auth.js for       '/auth' '/auth'  runs

      This will run :
      router.route('/google')
          .get(passport.authenticate('google', {
              scope: ['https://www.googleapis.com/auth/userinfo.profile',
                  'https://www.googleapis.com/auth/userinfo.email']
          }))
      from auth.js


       https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=822246465440-rbv8o8b5t465fupp0voesgfipapmdio1.apps.googleusercontent.com&as=-14d95c5b8acbd9c0&destination=http%3A%2F%2Flocalhost%3A3000&approval_state=!ChRKNHhBVHc0RE9FUWFlM3dmX2MzThIfazFPQTluUVVDWm9RVU9xWmlfQjdtUi1rWHlKMHdCVQ%E2%88%99ADiIGyEAAAAAWRm0WvOMdM5x6GIkq4wNRZlNUfSKGBjT&xsrfsig=AHgIfE8jtps8yb2s5bAOs4R2zQLrmYRg-g&flowName=GeneralOAuthFlow


## 6) then after authentication , 
      google.strategy.js
       function (req, accessToken, refreshToken, profile, done) {
                  var query = {
                      'google.id': profile.id
                  };

                  User.findOne(query, function (error, user) {
                      if (user) {
                          console.log('found');
                          done(null, user);
                      } else {
                          console.log('not found');
                          console.log(profile)
                          var user = new User; //creata a model instance

                          user.email = profile.emails[0].value;
                          user.image =
                              profile._json.profile_image_url;
                          user.displayName = profile.displayName;

                          user.google = {};
                          user.google.id = profile.id;
                          user.google.token = accessToken;
                          console.log("save details in mongo")
                          user.save();
                          done(null, user);
                      }
                  })
              }
          ));
      ..........................
## 6) 
      then runs call back
      # auth.js
      router.route('/google/callback')
          .get(passport.authenticate('google', {
              successRedirect: '/users/',
              failure: '/error/'
          }));

## 7) then on sucess ,  runs         '/users'
    routes/users.js




6) on sucess redirect to '/users/',
