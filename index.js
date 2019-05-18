'use strict';

const fs = require('fs');

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  this.file_size = buffer.readInt16LE(2);
  this.start_of_pixel = buffer.readInt16LE(10);
  this.file_width = buffer.readInt32LE(18);
  this.file_height = buffer.readInt32LE(22);
  this.bits_per_pix = buffer.readInt16LE(28);
  this.img_size = buffer.readInt32LE(38);
  // this.clr_used = buffer.readInt32LE(48);
  // this.clr_important = buffer.readInt32LE(52);
  
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  if(this.type !== 'BM'){
    return console.log(`Please choose a BM file`);
  }
  transforms[operation](this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
 * @param bmp
 */
const transformGreyscale = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);

  //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

  
  //TODO: alter bmp to make the image greyscale ...
  let img = bmp.buffer.slice(1146);
  for(let i = 0; i < img.length; i++){
    img[i] = (img[i]) + (img[i] * 0.48) + (img[i] * 0.11);
  }
};

const doTheInversion = (bmp) => {
  
};

const changeThePixelData = (bmp) => {
  bmp.buffer.writeInt16LE(0x18,28);
};

const makeItNegative = (bmp) => {
  let img = bmp.buffer.slice(48);
  img.swap16();
  console.log(bmp);
};

const test = (bmp) => {
  let img = bmp.buffer.slice(1146);
  let start = 0;
  let end = 95;
  for(let i = 0; i < img.length; i ++){
    img.slice(start, end);
    start = end;
    end += 95;
  }
}

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
  invert: doTheInversion,
  pixel: changeThePixelData,
  negative: makeItNegative,
  test: test,
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks();

