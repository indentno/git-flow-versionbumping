const args = process.argv;
const directory = args[2];
const flowType = args[3];
const functions = require('./functions');
const filePath = functions.getVersionFilePath(directory);

if (!filePath) {
  console.error('Could not auto resolve version number as neither composer.json or package.json file was found in your project root.');
  process.exit(1);
}

const currentVersion = functions.readVersionNumber(filePath);
const nextVersion = functions.determineNextVersion(currentVersion, flowType);

console.log(nextVersion);
