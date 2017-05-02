

# Introducing the Aggregation Framework

db.potions.aggregate(
   [{"$group": {"_id": "$vendor_id"}}]

)

Results :

{"_id": "Kettlecooked"},
{"_id": "Brewers"},
{"_id": "Leprechaun Inc"}

# Using Accumulators

Anything specified after the group key is considered an accumulator. Accumulators take a
single expression and compute the expression for grouped documents.


### Total number of documents per vendor! Will add 1 for each Accumulator matching document

db.potions.aggregate(
   [{"$group": {"_id": "$vendor_id" ,"total": {"$sum": 1}}}]

)

{"_id": "Kettlecooked", "total": 2},
{"_id": "Brewers", "total": 1,},
{"_id": "Leprechaun Inc”, "total": 1}

# Field Paths Vs. Operators
### When fields begin with a “$”, they are operators that perform a task
### When values begin with a “$”, they represent field paths that point to the value

# Averaging Potion Grade Per Vendor


db.potions.aggregate([
    { "$group": {
        "_id": "$vendor_id",
        "avg_grade": {"$avg": "$grade"}
    }

])


# The Aggregation Pipeline

db.potions.aggregate([stage, stage, stage])

# Using the $match Stage Operator


db.potions.aggregate([
  {"$match": {"ingredients": "unicorn"}}
   
])


db.potions.aggregate([
{"$match": {"price": {"$lt": 15}}}

])
























