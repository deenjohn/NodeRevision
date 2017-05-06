

# SchemaTypes
http://mongoosejs.com/docs/schematypes.html

#### Following are all valid Schema Types.

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- Objectid
- Array


# validation
http://mongoosejs.com/docs/validation.html

####  user.validateSync();
### user.js
const UserSchema = new Schema({
  name: {
    type: String,
    required : [true , 'Name is required.']
  }
  
});

### validate_user.js
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });
  
  
  ### using custom validator
  
  const UserSchema = new Schema({
  name: {
    type: String,
    validate :{
        validator: (name)=> name.length > 2,
        message : 'Name must be longer than 2 characters.'
    } ,
    required : [true , 'Name is required.']
   }
  
  });
  
 ### test this custom validator:
    it('requires a user\'s name longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
  });
  
  
