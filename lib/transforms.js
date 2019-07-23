'use strict';

const transforms = module.exports = {};

transforms.greyscale = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);
  let img = bmp.buffer.slice(1146);
  for(let i = 0; i < img.length; i++){
    img[i] = (img[i]) + (img[i] * 0.48) + (img[i] * 0.11);
  }
};

transforms.pixel = (bmp) => {
  console.log('Transforming bitmap into pixalated', bmp);
  bmp.buffer.writeInt16LE(0x18,28);
};

transforms.bluescale= (bmp) => {
  console.log('Transforming bitmap into bluescale', bmp);

  let img = bmp.buffer.slice(48);
  img.swap16();
};

transforms.negative = (bmp) => {
  let img = bmp.buffer.slice(1146);

  console.log('Transforming bitmap into negative', bmp);
  for(let i = 0; i < img.length; i++){
    img[i] = 255 - img[i];
  }
};

transforms.test = (bmp) => {
  console.log('Transforming bitmap into test', bmp);

  let img = bmp.buffer.slice(1146);
  let start = 0;
  let end = 110;
  let row = img.slice(start, end);
  for(let i = 0; i < 63; i++){
    for(let j = 0; j < row.length; j++){
      row[j] = 'ff';
    }
    start = end + 111;
    end = start + 110;
    row = img.slice(start, end);
  }

};