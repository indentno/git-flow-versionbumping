git-flow-versionbumping
==============

> Version bumping for [git-flow (AVH Edition)][1].

[![Latest Version on NPM](https://img.shields.io/npm/v/git-flow-versionbumping.svg?style=flat-square)](https://npmjs.com/package/git-flow-versionbumping)
[![npm downloads](https://img.shields.io/npm/dm/git-flow-versionbumping.svg?style=flat-square)](http://badge.fury.io/js/git-flow-versionbumping)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

This package updates your version in either the composer.json file or package.json file based on the version from either the `git flow release start` command or the `git flow hotfix start` command. If a composer.json file is present in your git project, the version property will be updated. If the composer.json file is not present, the package will look for a package.json file and update the version there.

Version bumping should not be used if the php project is published to packagist as this might cause conflicts when a `version` property exists in composer.json.

Install
-------

1. Install globally through npm

    ```sh
    npm install --global git-flow-versionbumping
    ```

2. Update your global git config with the correct path to the package.

    ```sh
    git config --global gitflow.path.hooks /path/to/git-flow-hooks
    ```
    
    If you are unsure of where your global npm packages are located, run the following command: `npm root`

Usage
-------

Enable the package either per-project or globally.

In order to enable version bumping for your project, run the following command inside your project: `git config gitflow.versionbumping true`. In order to enable it globally, run the following command: `git config --global gitflow.versionbumping true`.

Automatic tag messages
-------

If you want tag messages to be automated (you won't be bothered with your editor to specify it), use the following configuration options:

```sh
git config gitflow.hotfix.finish.message "Hotfix %tag%"
git config gitflow.release.finish.message "Release %tag%"
```

If you like, you can change the tag-placeholder (`%tag%` in the example above) in the git-flow-hooks configuration.

License
=======

MIT License.

[1]: https://github.com/petervanderdoes/gitflow
