<div class="header">
    <img class="logo" src="./public/logo.svg"/>
    <a class="title" href="https://gitee.com/ForeverChenY/directory.git">Directory</a>
    <p>Build the project file directory</p>
</div>

<!-- [![npm version](https://img.shields.io/npm/v/directory.svg)](https://www.npmjs.com/package/directory)[![Downloads](https://img.shields.io/npm/dm/directory.svg)](https://www.npmjs.com/package/directory) -->

## Install

``` node
npm install directory -g
```

## Usage

``` node
$ directory --help

directory v1.0.0
Usage: directory [options] [command]

Options:
  -v, --version   output the current version
  -h, --help      display help for command

Commands:
  init [options]  Build the project file directory
  help [command]  display help for command

```

## Example

```node
$ directory init


# directory 项目目录

|-- .git ---------------------------------- #
|-- .gitignore ---------------------------------- #
|-- index.js ---------------------------------- #
|-- node_modules ---------------------------------- #
|-- package.json ---------------------------------- #
|-- pnpm-lock.yaml ---------------------------------- #
|-- README.md ---------------------------------- #
|-- src ---------------------------------- #
|    |-- common.js ---------------------------------- #
```

<style>
    .header {
        text-align: center;
    }
    .logo {
        width: 180px;
        height: 200px;
        margin: 0 auto;
    }

    .title {
        font-size: 2em;
        display: flex;
        justify-content: center;
        padding-bottom: 0.3em;
        font-weight: 600;
    }
    p {
        text-align: center;
    }

    a {
        margin-right: 20px;
        display: inline-block;
    }
</style>
