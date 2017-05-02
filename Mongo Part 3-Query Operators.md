https://docs.mongodb.com/manual/reference/operator/query/


# Querying With single Criteria


{ <field>: { $eq: <value> } }
db.inventory.find( { qty: { $eq: 20 } } )
The query is equivalent to:

db.inventory.find( { qty: 20 } )



# Querying With Multiple Criteria

We can query based on multiple criteria by passing in comma-separated queries.

db.potions.find(
  {
  "vendor": "Kettlecooked",
  "ratings.strength": 5
  }
)

# Comparison Query Operators
We can use comparison query operators to match documents based on the comparison of a
specified value.
$gt greater than
$gte
$lt
$lte Syntax: { field: { $lte: value} }
Consider the following example which uses the $lt operator with a field from an embedded document:

db.inventory.update( { "carrier.fee": { $lte: 5 } }, { $set: { price: 9.99 } } )
This update() operation will set the price field value in the documents that contain the embedded document carrier whose fee field value is less than or equal to 5

$and https://docs.mongodb.com/manual/reference/operator/query/and/#op._S_and

### Exists and Not Equal To

Consider the following example:

db.inventory.find( { qty: { $exists: true, $nin: [ 5, 15 ] } } )
This query will select all documents in the inventory collection where the qty field exists and its value does not equal 5 or 15.

$ne
greater than or equal to
less than
less than or equal to
not equal to Common

# We can query with a range by combining comparison operators.

db.potions.find({"price": {"$gt":10, "$lt": 20}}


# Be Careful When Querying Arrays With Ranges
db.potions.find(
{"sizes" :{"$gt": 8, "$lt": 16} }

)

### Each value in the array is checked individually. If at least 1 array value is true for each criteria,
the entire document matches.


### Conversely, the document will not match if only 1 criteria is met.

# $elemMatch
{ <field>: { $elemMatch: { <query1>, <query2>, ... } } }

The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria

### field is an array here 





# Introducing Projections



find() takes a second parameter called a “projection” that we can use to specify the exact
fields we want back by setting their value to true.






### Only retrieve what’s needed

db.potions.find(
    {"grade": {"$gte": 80}},
    {"vendor": true, "name": true}
)


{
"_id": ObjectId(...),
"vendor": "Kettlecooked",
"name": "Shrinking"
}

# Excluding Fields
{"vendor": false, "price": false}


# Excluding the _id
{"vendor": true, "price": true,
"_id": false
}


# Either Select or Exclude Fields
Whenever projecting, we either select or exclude the fields we want — we don’t do both.

# We can use the sort() cursor method to sort documents.

"price is the field to sort
db.potions.find().sort({"price": 1})
### "price": 1 , 1 means in descending order


# Basic Pagination

We can implement basic pagination by limiting and skipping over documents. To do this, we’ll
use the skip() and limit() cursor methods.

### db.potions.find().limit(3)


# We can implement basic pagination by limiting and skipping over documents.

db.potions.find().skip(3).limit(3)


















