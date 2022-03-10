/* eslint-disable @typescript-eslint/no-var-requires */
const osxTemp = require('osx-temperature-sensor');
let temperature = osxTemp.cpuTemperature();
console.log(JSON.stringify(temperature));
