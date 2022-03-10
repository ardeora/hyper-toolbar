import { currentLoad as cpuLoad } from 'systeminformation';
import { PLUGIN_NAME } from '../utils';
import path from 'path';
import { fork } from 'child_process';

const onWindow = (window: Window) => {
  window.rpc.on(`${PLUGIN_NAME}:cpu:start`, () => {
    const cpuInterval = setInterval(() => {
      cpuLoad().then((data) => {
        window.rpc.emit(`${PLUGIN_NAME}:cpu:data`, { data: data });
      });
    }, 2500);

    window.rpc.on(`${PLUGIN_NAME}:cpu:stop`, () => {
      clearInterval(cpuInterval);
    });
  });

  window.rpc.on(`${PLUGIN_NAME}:memory:start`, () => {
    const child = fork(path.join(__dirname, '../src/components/plugins/SystemInfo/drivers/memory.js'));

    child.on('message', (data) => {
      window.rpc.emit(`${PLUGIN_NAME}:memory:data`, {
        data: data,
      });
    });

    window.rpc.on(`${PLUGIN_NAME}:memory:stop`, () => {
      child.kill('SIGKILL');
    });
  });

  window.rpc.on(`${PLUGIN_NAME}:network:start`, () => {
    const child = fork(path.join(__dirname, '../src/components/plugins/SystemInfo/drivers/network.js'));

    child.on('message', (data) => {
      window.rpc.emit(`${PLUGIN_NAME}:network:data`, {
        data: data,
      });
    });

    window.rpc.on(`${PLUGIN_NAME}:network:stop`, () => {
      child.kill('SIGKILL');
    });
  });

  window.rpc.on(`${PLUGIN_NAME}:temperature:start`, () => {
    const child = fork(path.join(__dirname, '../src/components/plugins/SystemInfo/drivers/temperature.js'));

    child.on('message', (data) => {
      window.rpc.emit(`${PLUGIN_NAME}:temperature:data`, {
        data: data,
      });
    });

    window.rpc.on(`${PLUGIN_NAME}:temperature:stop`, () => {
      child.kill('SIGKILL');
    });
  });
};

export default onWindow;
