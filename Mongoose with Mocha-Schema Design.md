
https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/





# Refer documents


#### Association :

#### Creating Associations with Refs

user > blogpost
blogpost > comment

comment > user 

...................................

#### helper.js

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});



#### user.js

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});



#### blogPost.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;






#### comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;

.............................

#### associate test

beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

   

#### Populate : loading associations on demand

#### Without populate 

 it.only('saves a relation between a user and a blogpost', (done) => {
      User.findOne({ name: 'Joe' })
        .then((user) => {
          console.log(user);
          done();
        });
    });


 #### Result 
Assocations
{ _id: 590fd973276bf804b025e2c1,
  name: 'Joe',
  __v: 0,
  blogPosts: [ 590fd973276bf804b025e2c2 ],
  posts: [] }
  
  
  #### With Populate
  
  it.only('saves a relation between a user and a blogpost', (done) => {
      User.findOne({ name: 'Joe' }).populate('blogPosts')
        .then((user) => {
          console.log(user);
          done();
        });
    });
    
   #### Result 
 Assocations
{ _id: 590fd8e1eeb0c5215c5c5f2b,
  name: 'Joe',
  __v: 0,
  blogPosts: 
   [ { _id: 590fd8e1eeb0c5215c5c5f2c,
       title: 'JS is Great',
       content: 'Yep it really is',
       __v: 0,
       comments: [Object] } ],
  posts: [] }

#### Note : 
User.findOne({ name: 'Joe' }).populate('blogPosts')
blogPosts is a property on User
...................................

# Populate full relational graph

 it.only('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');

        done();
      });
  });
  
  
  ..................................................................


 it.only('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',  ///  mongoose.model('comment', CommentSchema);
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        console.log(user);
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');

        done();
      });
  });


console.log(user.blogPosts[0]);

{ _id: 590ff3e75353fb27c817caf0,
  title: 'JS is Great',
  content: 'Yep it really is',
  __v: 0,
  comments: 
   [ { _id: 590ff3e75353fb27c817caf1,
       user: [Object],
       content: 'Congrats on great post',
       __v: 0 } ] }


# Note on Mocha :

Mocha always runs 'before' function  1st , then 'describe' , then beforeEach , then 'it' no matter in which modules we load first

before > describe >  beforeEach > it


