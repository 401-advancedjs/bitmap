![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Bitmap and Buffers

### Author: Melissa Stock

### Links and Resources
* [submission PR](https://github.com/401-advancedjs/lab05/pull/1)
* [travis](https://www.travis-ci.com/401-advancedjs/lab05)


#### Documentation
* [bitmap docs](http://www.dragonwins.com/domains/getteched/bmp/bmpfileformat.htm)
* [bitmap docs](http://www.dragonwins.com/domains/getteched/bmp/bmpfileformat.htm) 
* [buffer docs](https://nodejs.org/api/buffer.html)

### Modules
#### `bitmap.js`
#### `transform.js`
##### Exported Values and Methods

###### `bitmap(file) -> new bitmap`
###### `trasforms(operation) -> transformed bitmap`

#### Running the app
* `node index.js assets/[FILE_NAME] [OPERATION]`
* Endpoint: `/foo/bar/`
  * Returns a new bitmap with specified operation done to it
  
#### Tests
* How do you run tests? `npm test`
* What assertions were made?
  * Details of the BM are stored in an object
  * BMs are transformed when a valid operation is inputed
  * Error is thrown if an invalid path is inputed
  * Error is thrown is an invalid operation is inputed
* What assertions need to be / should be made?

#### Getting inputs from the command line
* How does this command work? `const [file, operation] = process.argv.slice(2);`
  * argv is an array that contains everything typed into the command line. In this app it looks like: [node, name of file you're running the command on, file path, operation]. We use slice with the argument 2 to disgard the first two indecies. We store the remaining two arguments as variables 'file' and 'operation'.



