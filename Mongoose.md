
References :
http://mongoosejs.com/docs/
http://mongoosejs.com/docs/api.html

## test a connection
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/test');
mongoose.connection
    .once('open', () => console.log('connected ! Good to go !!') )
    .on('error', (error) => {
      console.warn('Warning', error);
    });


## create a model
const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

### create a user schema

const UserSchema = new Schema({
  name: {
    type: String
  }
});


### create a user model
const User = mongoose.model('user', UserSchema);

module.exports = User;




## test with Mocha 

const assert = require('assert');
const User = require('../src/user');
//const User = mongoose.model('user', UserSchema);

describe('Creating records', () => {
  it('saves a user', (done) => {
  	//create a user instance
    const joe = new User({ name: 'Joe' });
    // save user instance
    joe.save()
      .then(() => {
        // Has joe been saved successfully?
        assert(!joe.isNew);
        done();
      });
  });
});

### package.json

{
  "name": "users",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mocha": "^3.1.2",
    "mongoose": "^4.6.6",
    "nodemon": "^1.11.0"
  }
}


# run the test suite

### npm run test  : will run all the .js files in test folder

i.e  
"scripts": {
    "test": "mocha"
  }
  
  
  ## delete all documents from a collection
  db.users.remove({}) : will delete all documents from users collection














