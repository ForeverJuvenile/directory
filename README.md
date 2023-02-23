
<div align=center><a href="https://github.com/ForeverJuvenile/directory#readme"><img src="https://raw.githubusercontent.com/ForeverJuvenile/directory/1c34c1bce8163aec2fa615ae2a181be5e049a8a3/public/logo.svg"></a></div>

<div align=center><a href="https://github.com/ForeverJuvenile/directory#readme" ><font face="黑体" size=6>Directory</font></a></div>
<div align=center><font face="黑体">Build the project file directoryDirectory</font></div>
<br/>

[![npm version](https://badge.fury.io/js/directory-doc.svg)](https://www.npmjs.com/package/directory-doc)

## Install

``` node
npm install directory-doc -g
```

## Usage

``` node
$ directory-doc --help

directory-doc v1.0.0
Usage: directory-doc [options] [command]

Options:
  -v, --version   output the current version
  -h, --help      display help for command

Commands:
  init [options]  Build the project file directory
  help [command]  display help for command

```

## Example

```node
$ directory-doc init


# directory 项目目录

    |-- .git ---------------------------------- #
    |-- lib ---------------------------------- #
    |    |-- src ---------------------------------- #
    |    |    |-- hook.js ---------------------------------- #
    |    |-- index.js ---------------------------------- #
    |-- node_modules ---------------------------------- #
    |-- public ---------------------------------- #
    |    |-- logo.svg ---------------------------------- #
    |-- src ---------------------------------- #
    |    |-- hook.js ---------------------------------- #
    |-- .babelrc ---------------------------------- #
    |-- .gitignore ---------------------------------- #
    |-- directory.md ---------------------------------- #
    |-- index.js ---------------------------------- #
    |-- LICENSE ---------------------------------- #
    |-- package.json ---------------------------------- #
    |-- pnpm-lock.yaml ---------------------------------- #
    |-- README.md ---------------------------------- #
```
