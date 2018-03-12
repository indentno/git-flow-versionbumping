const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const args = process.argv;
const version = args[3];
const directory = args[2];

// Check the git config to see if versionbumping is enabled
exec('git config --get gitflow.versionbumping', (err, value, stderr) => {
  if (err) {
    // Not defined in config, ignoring further actions
    return;
  }

  try {
  	value = JSON.parse(value);
  } catch (err) {
  	value = false;
  }

  if (JSON.parse(value) === true) {
  	// We check for a composer.json file first, if it does not exist, read package.json
  	try {
		const content = JSON.parse(fs.readFileSync(path.join(directory, 'composer.json'), 'utf-8'));

		bumpVersion('composer.json', content, 4);
	} catch (e) {
		try {
			const content = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf-8'));

			bumpVersion('package.json', content);
		} catch (e) {

		}
	}
  }
});

function bumpVersion(file, content, tabSize = 2) {
	content.version = version;

	fs.writeFileSync(path.join(directory, file), JSON.stringify(content, null, tabSize));

	console.log(`Bumped ${file} version to ${version}`);
}
