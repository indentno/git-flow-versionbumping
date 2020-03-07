const args = process.argv;
const directory = args[2];
const flowType = args[3];
const functions = require('./functions');
const { exec } = require('child_process');

exec('git describe --tags $(git rev-list --tags --max-count=1)', (err, gitVersion, stderr) => {
  let currentVersion = '0.0.0';

  if (!err) {
    currentVersion = gitVersion;
  }

  const nextVersion = functions.determineNextVersion(currentVersion, flowType);

  console.log(nextVersion);
});
