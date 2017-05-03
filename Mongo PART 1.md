# create a collection and save a doc in it
> use mydb

> db.foo.save({a:2})

### {a:2} is a document saved in collection foo in the database mydb

# show collections

# db.system.indexes.find()

mongo has created an index on id field . "key":


# id can't be an array
# id can be a floating point integer, date , string

# objectid function returns a new id everytime you call it

# 2 documents can't have the same id
# saving the last one will overide the 1st one
# insert with same id will give error


# Insert a document into a collection 

db.collection_name.insert(
    {
      "name   ": "Invisibility" , 
      "vendor ":  "Kettlecooked"
    }

)


# find " returns all the documents in a collection

db.collection_name.find()


# Objectid : make data unique. Automatically generated but can be manually set.

# Finding a Specific Potion With a Query

db.potions.find({"name": "Invisibility"})

{
"_id": ObjectId("559f07d741894edebdd8aa6d"),
"name": "Invisibility",
"vendor": "Kettlecooked"
}

## can return multiple documents if matched. 

# Arrays are a great option for storing lists of data.

{.
"name": "Invisibility",
"vendor": "Kettlecooked",
"price": 10.99,
"score": 59
Adding a List of Ingredients
Arrays are a great option for storing lists of data.
We can store any data type
within an array
"tryDate": new Date(2012, 8, 13)
"ingredients": ["newt toes", 42, "laughter"]
}



#  MongoDB supports embedded documents so we
can simply add this to our potion document

{
"name": "Invisibility",
"vendor": "Kettlecooked",
"price": 10.99,
"score": 59
Each rating will have 2 fields
MongoDB supports embedded documents so we
can simply add this to our potion document
}


{
"strength": 2,
"flavor": 5
}

### Embedded Documents
{
"name": "Invisibility",
"vendor": "Kettlecooked",
"price": 10.99,
"score": 59
An embedded document doesn’t require an id
since it’s a child of the main document
Embedded Documents
We embed documents simply by adding the document as a value for a given field.
,
"tryDate": new Date(2012, 8, 13),
"ingredients": ["newt toes", 42, "laughter"],
}

# Array values are treated individually, which means we can query them by specifying the field
of the array and the value we’d like to find.

db.potions.find({"ingredients": "laughter"})

{
"_id": "ObjectId(...)",
"name": "Invisibility",
"ingredients": ["newt toes","secret", "laughter"]
}


### using dot notation to specify the embedded field
we’d like to search.

db.potions.find({"ratings.flavor": 5})

{
"_id": "ObjectId(...)",
"name": "Invisibility",
"ratings": {"strength": 2, "flavor": 5}
}


# Insert Validations

### Validations Supported by MongoDB
MongoDB will only enforce a few rules, which means we’ll need to make sure data is valid
client-side before saving it.

1) NO DUPLICATE ID 
2) No syntax error
3) document is less than 16 mb











