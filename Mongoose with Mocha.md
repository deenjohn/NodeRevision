
References :
http://mongoosejs.com/docs/
http://mongoosejs.com/docs/api.html
http://stackoverflow.com/questions/28229424/how-to-set-execution-order-of-mocha-test-cases-in-multiple-files
http://mongoosejs.com/docs/guide.html

## test a connection
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/user_test'); // to check in mongodb : "use user_test" will swich to this db
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


### create a user model & export it only
const User = mongoose.model('user', UserSchema);

### Note : 'user' is mapped as 'users' in MongoDB

module.exports = User;

#### we create instances of model and save in mongo


## test with Mocha 

const assert = require('assert');
const User = require('../src/user');
//const User = mongoose.model('user', UserSchema);

### create a user instance
### save user instance

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

### Note : you can install Mocha globally too
# run the test suite

### npm run test  : will run all the .js files in test folder

i.e  
"scripts": {
    "test": "mocha"
  }
  
  
  ## delete all documents from a collection
  db.users.remove({}) : will delete all documents from users collection


## wait till connection before running another test using " done()"

before((done) => {
  mongoose.connect('mongodb://localhost/test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
mongoose.connection.collections.users.drop(() =>{
  
    done(); //wait till drop the collection is completed
    
  });


# Reading from Mongo

const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

      console.log("test if joe has id ?");
      console.log(joe);
    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
      .then(() => done());
  });

### Note : Mongoose automatically provides an _id even when we just create an instance and have not saved it
#### Note : we are doing "User.find" , User is a model

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particular id', (done) => {
     console.log(joe);
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      });
  });
});











