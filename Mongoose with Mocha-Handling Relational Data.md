
# Embedding Resources in Models

const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;


#### posts: [PostSchema]

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema]
});


### Test 

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

........................................

# adding new post in a existing document

it('Can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });  // just pushing doesn't save the record
        return user.save();  // to return promise
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });


...........................................

# virtual property
http://mongoosejs.com/docs/guide.html
Virtuals

Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage.
 
 ex : 
 
 var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});
 
 
 
 personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

ex 2 : postcount getter
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

Note : Virtual property setters are applied before other validation

..............................................................................



























