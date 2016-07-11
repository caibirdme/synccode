## Features

* rsync your workspace folder to remote server


## Requirements

Make sure you have `rsync` installed on your system and it's added to PATH

`synccode` use ssh to sync your code so you should insure that you can access your remote server
just by `ssh username@a.b.c.d` without password

This is very important,so you should make sure all things above.

## Extension Settings

This extension contributes the following settings:

* `synccode.host`: (string | required) the host of your remote server,the format must be the same as `username@a.b.c.d:/path/to/remote/dir`
* `synccode.experiment`: (boolean | default `false`) if `true`,the experiment function will be used,it's unstable now.
* `synccode.debug`: (boolean | default `false`) if `true` the synccode will output logs,in most cases you will never use this function
* `synccode.exclude`: (array | default `[".git/*"]`) files that you want exclude them
* `synccode.delete`: (boolean | default `false`) set `true` to add `--delete` in rsync command


Click `Code->preference->workspace settings`,input `"synccode.host": username@yourIP:/path/to/remote/dir` in the right panel
,in most cases,when you input `synccode` there will be autocomplete.

## Known Issues

If you have any problem welcome to create an issue

## Release Notes


### 0.0.1
* Initialize the plugin

### 0.0.2
* add debug mode
* add exclude configuration
* add non deleting mode
* beautify homepage

### 0.0.3
* add LICENSE

### 0.0.4
* add configuration description in README.md

### building
* maintain directory tree in memory to reduce the transfer bytes



---

**Enjoy!**
