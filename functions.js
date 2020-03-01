const path = require('path');
const fs = require('fs');

function getVersionFilePath(directory) {
  if (fs.existsSync(path.join(directory, 'composer.json'))) {
    return path.join(directory, 'composer.json');
  }

  if (fs.existsSync(path.join(directory, 'package.json'))) {
    return path.join(directory, 'package.json');
  }

  return null;
}

// Attempts to read the version number. Defaults to '0.0.0' if no version is defined.
function readVersionNumber(filePath) {
  let contents = fs.readFileSync(filePath, 'utf-8');

  try {
    contents = JSON.parse(contents);
  } catch (e) {
    contents = {};
  }

  return contents.version || '0.0.0';
}

function writeVersionNumber(filePath, version) {
  let contents = fs.readFileSync(filePath, 'utf-8');
  let tabSize = 2;

  if (filePath.indexOf('composer.json') !== -1) {
    tabSize = 4;
  }

  try {
    contents = JSON.parse(contents);
  } catch (e) {
    contents = {};
  }

  contents.version = version;

  fs.writeFileSync(filePath, JSON.stringify(contents, null, tabSize));
}

/*
 * Tries to determine the next version number that should be used, based on the previous
 * version number and which git flow type that is being used (hotfix or release).
 */
function determineNextVersion(previousVersionNumber, flowType) {
  const parts = previousVersionNumber.split('.');

  if (flowType === 'hotfix') {
    let hotfixNumber = parseInt(parts[2]);

    hotfixNumber++;

    return `${parts[0]}.${parts[1]}.${hotfixNumber}`;
  }

  if (flowType === 'release') {
    let minorNumber = parseInt(parts[1]);

    minorNumber++;

    return `${parts[0]}.${minorNumber}.0`;
  }

  return null;
}

module.exports = {
  getVersionFilePath,
  readVersionNumber,
  writeVersionNumber,
  determineNextVersion,
};
