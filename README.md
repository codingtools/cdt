cdt
===

Command Line tools for CODERs

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cdt.svg)](https://npmjs.org/package/cdt)
[![Downloads/week](https://img.shields.io/npm/dw/cdt.svg)](https://npmjs.org/package/cdt)
[![License](https://img.shields.io/npm/l/cdt.svg)](https://github.com//cdt/blob/master/package.json) [![Greenkeeper badge](https://badges.greenkeeper.io/codingtools/cdt.svg)](https://greenkeeper.io/)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cdt
$ cdt COMMAND
running command...
$ cdt (-v|--version|version)
cdt/0.0.1 darwin-x64 node-v12.9.0
$ cdt --help [COMMAND]
USAGE
  $ cdt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cdt hash [STRING]`](#cdt-hash-string)
* [`cdt help [COMMAND]`](#cdt-help-command)

## `cdt hash [STRING]`

create hash for a string/file

```
USAGE
  $ cdt hash [STRING]

OPTIONS
  -f, --file=file      file to be hashed
  -h, --help           show CLI help
  -s, --string=string  string to be hashed
  -t, --type=type      type of hash [SHA1(default),MD5,SHA256,SHA512,RMD160]
```

_See code: [src/commands/hash.ts](https://github.com/codingtools/cdt/blob/v0.0.1/src/commands/hash.ts)_

## `cdt help [COMMAND]`

display help for cdt

```
USAGE
  $ cdt help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
