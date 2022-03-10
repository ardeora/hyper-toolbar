NODE_PATH=$(which node)
sed -i '' "s/node_path/${NODE_PATH//\//\\/}/" $PWD/src/components/plugins/SystemInfo/drivers/temperature.js