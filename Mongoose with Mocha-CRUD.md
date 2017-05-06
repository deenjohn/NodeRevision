
References :
http://mongoosejs.com/docs/
http://mongoosejs.com/docs/api.html
http://stackoverflow.com/questions/28229424/how-to-set-execution-order-of-mocha-test-cases-in-multiple-files
http://mongoosejs.com/docs/guide.html
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise


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

# Note : Mongoose async operations, like .save() and queries, return Promises/A+ conformant promises. This means that you can do things like MyModel.findOne({}).then() and yield MyModel.findOne({}).exec() (if you're using co).
http://mongoosejs.com/docs/promises.html

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

....................................
# Automatically run test script
package.json

"scripts": {
    "test": "nodemon --exec 'mocha -R min'"
  }
  

# Using Promise.resolve()
let promise = Promise.resolve(42);

promise.then(function(value) {
    console.log(value);         // 42
});

# Chaining Promises
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = p1.then(function(value) {
    console.log(value);
})

p2.then(function() {
    console.log("Finished");
});


# The Promise.all() Method
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
    resolve(43);
});

let p3 = new Promise(function(resolve, reject) {
    resolve(44);
});

let p4 = Promise.all([p1, p2, p3]);

p4.then(function(value) {
    console.log(Array.isArray(value));  // true
    console.log(value[0]);              // 42
    console.log(value[1]);              // 43
    console.log(value[2]);              // 44
});

......................................

# Delete 
const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // Remove a bunch of records with some given criteria
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});


................................................

# UPDATE

### 5 Ways we can update :

1)Model class
  a) update
  b) findOneAndUpdate
  c)findByIdAndUpdate

2) Instance
  a)Update
  b)Set and Save


const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

### Instance
  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

### Model class
  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });

  it('A user can have their postcount incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});













