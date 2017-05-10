


# what fails :

( 1 ) 
"scripts": {
    "test": "nodemon --exec './node_modules/mocha --recursive' "
  }
  
................................................................
(2)
"scripts": {
    "test": "nodemon --exec './node_modules/.bin/mocha --recursive' "
  }

................................................................
(3)
"scripts": {
    "test": "nodemon --exec 'mocha --recursive -R min' "
  }

................................................................

# what works :
................................................................
"scripts": {
    "test": "./node_modules/.bin/mocha"
  }
  ................................................................
  
 /test>  nodemon -x "npm run test" 


For example:

"scripts": {
    "test": "./node_modules/.bin/mocha --recursive"
  }
  http://stackoverflow.com/questions/11377392/js-unit-testing-run-tests-on-file-changes-like-nodemon
  
