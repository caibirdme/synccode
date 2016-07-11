## Features

* rsync your workspace folder to remote server


## Requirements

Make sure you have `rsync` installed on your system and it's added to PATH

`synccode` use ssh to sync your code so you should insure that you can access your remote server
just by `ssh username@a.b.c.d` without password

This is very important,so you should make sure all things above.

## Extension Settings

After installing `synccode` plugin,you should tell `synccode` where to sync your project

This extension contributes the following settings:

* `synccode.host`: (string) the host of your remote server,the format must be the same as `username@a.b.c.d:/path/to/remote/dir`
* `synccode.experiment`: (boolean) if true,the experiment function will be used,it's unstable now.Default false

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



---

**Enjoy!**
