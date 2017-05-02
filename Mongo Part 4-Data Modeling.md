
# Dangers of Duplication
Duplicate data can be hard to keep consistent throughout the database.

#### Instead of embedding the vendor information, we can create a vendors collection and
reference the vendor document in each potion document.

Potion
{
"_id": ObjectId(...),
"name": "Invisibility",
"vendor_id": "Kettlecooked
}

Vendor
{
"_id": "Kettlecooked",
"phone": 5555555555,
"organic": true
}

### Inserting Referenced Documents

db.vendors.insert({
    "_id": "Kettlecooked",
    "phone": 5555555555,
    "organic": true
})


db.potions.insert({
"name": "Invisibility",
"vendor_id": "Kettlecooked"
})

#### "vendor_id": "Kettlecooked" is the referenced document



# Data Modeling Decisions












































