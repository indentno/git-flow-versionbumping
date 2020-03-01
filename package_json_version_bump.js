const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const args = process.argv;
const version = args[3];
const directory = args[2];

// Check the git config to see if versionbumping is enabled
exec('git config --get gitflow.versionbumping', (err, versionBumpingIsEnabled, stderr) => {
  if (err) {
    // Not defined in config, ignoring further actions
    return;
  }

  try {
    versionBumpingIsEnabled = JSON.parse(versionBumpingIsEnabled);
  } catch (err) {
    versionBumpingIsEnabled = false;
  }

  if (versionBumpingIsEnabled) {
    // We check for a composer.json file first, if it does not exist, read package.json
    if (fs.existsSync(path.join(directory, 'composer.json'))) {
      bumpVersion('composer.json', 4);
    } else if (fs.existsSync(path.join(directory, 'package.json'))) {
      bumpVersion('package.json');
    }
  }
});

function bumpVersion(file, tabSize = 2) {
  let content = fs.readFileSync(path.join(directory, file), 'utf-8');

  try {
    content = JSON.parse(content);
  } catch (e) {
    content = {};
  }

  content.version = version;

  fs.writeFileSync(path.join(directory, file), JSON.stringify(content, null, tabSize));

  console.log(`Bumped ${file} version to ${version}`);
}
