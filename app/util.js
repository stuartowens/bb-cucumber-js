const fs = require('fs');
const world = require('./worldData');

process.argv.forEach(function (value, index, array) {
  if (value.startsWith('--world-parameters=')) {
    const worldParams = value.split('=')[1];
    console.log('Found World parameters: ' + worldParams);
    world.args = JSON.parse(worldParams);
  }
});

const getConfigDirectory = function () {
  // Get the configuration directory, from which to pull all configuration data and logins
  if (world && world.args && world.args.config) {
    return world.args.config;
  }
  return 'e2e';
};

const loadJSONFile = function (fullFileName) {
  try {
    console.log(`Opening file ${fullFileName} from ${__filename} `);
    var contents = fs.readFileSync(fullFileName);
    var jsonContent = JSON.parse(contents);
    return jsonContent;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const loadConfig = function (configName) {
  try {
    const configDirectory = getConfigDirectory() || 'e2e';
    const configPath = `./config/${configDirectory}/${configName}.json`;
    console.log(
      `Opening config directory ${configDirectory} and file ${configPath}`
    );
    var contents = fs.readFileSync(configPath);
    var jsonContent = JSON.parse(contents);
    return jsonContent;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const loadLogin = function (login) {
  try {
    const configDirectory = getConfigDirectory() || 'e2e';
    const loginPath = `./config/${configDirectory}/login/${login}.json`;
    console.log(
      `Opening config ${configDirectory} and config file ${loginPath}`
    );
    var contents = fs.readFileSync(loginPath);
    var jsonContent = JSON.parse(contents);
    return jsonContent;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { loadJSONFile, loadConfig, loadLogin };
