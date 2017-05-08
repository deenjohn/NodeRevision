

http://mongoosejs.com/docs/middleware.html

# Pre middleware

http://stackoverflow.com/questions/13582862/mongoose-pre-save-async-middleware-not-working-as-expected

#### remove is an event

UserSchema.pre('remove',true, function(next , done) {
 console.log("pre in user.js")
  const BlogPost = mongoose.model('blogPost');
  
  // this === joe

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => {
     console.log( )
      next();
      setTimeout(done, 100);
    });
})



describe('Middlware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    console.log("starting remove in middleware_test")
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        console.log(count)
        assert(count ===0);
        done();
      });
  });
#### Instead of iterating , we use { $in: this.blogPosts }

