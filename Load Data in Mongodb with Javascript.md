

# How to batch load mongodb data with javascript

https://docs.mongodb.com/manual/reference/method/load/



#### script.js
// 1) Switch to the 'bookAPI' database
db = db.getSiblingDB('bookAPI');

// 2) Enter these documents into the collection 'Book'
db.Book.save({ _id: 1, title: 'War and Peace', author:'Leo Tolstoy' ,genre:'Novel' , read:false});
db.Book.save({ _id: 2, title: 'The Time Machine', author:'H.G Wells' ,genre:'Fiction' , read:false});
db.Book.save({ _id: 3, title: 'This Is Not Your Story', author:'Savi Sharma' ,genre:'Romance' , read:false});

