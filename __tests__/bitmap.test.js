'use strict';

const fs = require('fs');
const Bitmap = require('../lib/bitmap.js');
const transforms = require('../lib/transforms');


describe('Bitmap', () => {
  it('should create an object with details about the selected BM', () => {
    let test = new Bitmap('../assets/baldy.bmp');
    fs.readFile('../assets/baldy.bmp', buffer => {
      test.parse(buffer);
      expect(test.type).toEqual('BM');
    });
  });
  it('should transform the BM when a valid operation is inputed', () => {
    let check = new Bitmap('../assets/baldy.bmp');
    let test = new Bitmap('../assets/baldy.bmp');
    fs.readFile('../assets/baldy.bmp', buffer => {
      test.parse(buffer);
      check.parse(buffer);
      transforms['bluescale'](test);
      expect(test.buffer.slice(1146)).not.toEqual(check.buffer.slice(1146));
    });

  });
  it('should throw an error if an invalid path is inputed', () => {

  });
  it('should throw an error if an invalid opertation is inputed', () => {

  });
  it('what else can we test?', () => {

  });

});