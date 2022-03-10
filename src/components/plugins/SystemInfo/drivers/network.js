/* eslint-disable @typescript-eslint/no-var-requires */
const process = require('process');
const si = require('systeminformation');

const getNetworkStats = () => {
  si.networkStats().then((data) => {
    process.send(data);
  });
};

getNetworkStats();

setInterval(() => {
  getNetworkStats();
}, 3500);
