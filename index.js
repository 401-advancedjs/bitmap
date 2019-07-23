'use strict';

const fs = require('fs');
const Bitmap = require('./lib/bitmap.js');
const fileReader = require('./lib/file-reader.js');


function transformWithCallbacks() {
  fs.readFile(file, (err, buffer) => {
    if (err) {
      throw err;
    }
    bitmap.parse(buffer);
    bitmap.transform(operation);
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });
  });
}

const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();

