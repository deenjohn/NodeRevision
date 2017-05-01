

# Delete a Single Document

The remove() collection method will delete documents that match the provided query.

db.potions.remove(
{"name": "Love"}
)

WriteResult({ "nRemoved": 1 })


# Updating a Document : only applies to 1st matching document

### {"$set": {"price": 3.99 }}

db.potions.update(
{"name": "Love"},
{"$set": {"price": 3.99 }}
)

### nMatched : how many doc were matched

WriteResult({
"nMatched": 1,   
"nUpserted": 0,
"nModified": 1
})


# Update Without an Operator

If the update parameter consists of only field/value pairs, then everything but the _id is
replaced in the matching document.

db.potions.update(
{"name": "Love"},
{"price": 3.99 }
)

### Document replaced with the update parameter "price"


# Updating Multiple Documents

{"multi": true}

db.potions.update(
{"vendor": "KC"},
{"$set": { "vendor": "Kettlecooked" }}
{"multi": true}
)


# Update a Document’s Count

We can use the $inc operator to increment the count of an existing log document.

db.logs.update(
{"potion": "Shrinking"},
{"$inc": {"count": 1}}
)

If field doesn’t exist, it gets created with the value.

### If we run the update on a potion that doesn’t exist, then nothing will happen.

 
# Find or Create With Upsert
  ### {"upsert": true}
  

db.logs.update(
 {"potion": "Love"},
{"$inc": {"count": 1}},
{"upsert": true}
)

WriteResult({
    "nMatched": 0,
    "nUpserted": 1,
    "nModified": 0
})

Running same query again will result in :

WriteResult({
   "nMatched": 1,
  "nUpserted": 0,
  "nModified": 1

})

# Advanced Modification

###  Removing Fields From Documents

### The $unset operator can be used to remove specified fields.

Unset field : color
db.potions.update(
{},
{"$unset": {"color": ""}},
{"multi": true}
)


# Updating a Field Name With $rename
We can use $rename to change field names.

{"$rename": {fieldToRename: newField}}

db.potions.update(
{},
{"$rename": {"score": "grade"}},
{"multi": true}
)


# The Dilemma of Updating an Array

"ingredients": ["hippo", "secret", "mouse feet"]

db.potions.update(
{"ingredients": "secret"},
{"$set": {"ingredients": "42"}}
)

### Would overwrite the entire array and set it as 42

### Updating Array Values by Location

Since array values are treated individually, we can update a single value by specifying its
location in the array using dot notation.

ingredients.1 : Means 2nd array element

db.potions.update(
{"name": "Shrinking"},
{"$set": {"ingredients.1" : 42}}
)

# Updating Values Without Knowing Position

### We need to change “secret” in multiple documents
db.potions.update(
{"ingredients": "secret"},
{"$set": {"ingredients.$" : 42}},
{"multi": true}
)

### The $ is a placeholder for the matched value

# Updating an Embedded Value

"ratings": {
   
   "strength": 1,
    "flavor": 5
}


db.potions.update(
  {"name": "Shrinking"},
  {"$set": {"ratings.strength" : 5}}
)


# Useful Update Operators

$max , $min , $mul

# Modifying Arrays

### Removing the First or Last Value of an Array

#### Removes the first element
"categories": ["tasty", "effective"]

db.potions.update(
{"name": "Shrinking"},
{"$pop": {"categories": 1}})

Result
"categories": ["tasty"]


# Adding Values to the End of an Array
The $push operator will add a value to the end of an array.

# Adding Unique Values to an Array
The $addToSet operator will add a value to the end of an array unless it is already present.


# Removing Values From an Array

The $pull operator will remove any instance of a value from an array.


































































