/* eslint-disable @typescript-eslint/no-var-requires */
const process = require('process');
const systeminformation = require('systeminformation');

const getMemory = () => {
  systeminformation.mem().then((data) => {
    process.send(data);
  });
};

getMemory();

setInterval(() => {
  getMemory();
}, 3000);
