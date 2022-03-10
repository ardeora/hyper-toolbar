/* eslint-disable @typescript-eslint/no-var-requires */
const cp = require('child_process');
const path = require('path');
const si = require('systeminformation');

const getTemperature = () => {
  if (process.platform === 'darwin') {
    return getMacOSTemperature();
  }
  si.cpuTemperature((data) => {
    return data;
  });
};
const getMacOSTemperature = () => {
  cp.exec(`/Users/aryandeora/.nvm/versions/node/v16.9.1/bin/node ${path.join(__dirname, './temp_helper.js')}`, (err, stdout, stderr) => {
    console.log('INSIDEEE');
    console.log(err, stdout, stderr);
    if (err || stderr) {
      return { data: { main: null } };
    }
    console.log(JSON.parse(stdout));
    process.send(JSON.parse(stdout));
  });
};

getTemperature();

setInterval(() => {
  getTemperature();
}, 3500);
