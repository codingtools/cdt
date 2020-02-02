@codingtools/cdt
===
CLI for Developers

[![CircleCI](https://circleci.com/gh/codingtools/cdt/tree/release%2Frelease-v0.1.svg?style=shield)](https://circleci.com/gh/codingtools/cdt/tree/release%2Frelease-v0.1)
[![Version](https://img.shields.io/npm/v/@codingtools/cdt)](https://npmjs.org/package/@codingtools/cdt)
![npm](https://img.shields.io/npm/dt/@codingtools/cdt)
![npm](https://img.shields.io/npm/dm/@codingtools/cdt)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/codingtools/cdt)](https://github.com/codingtools/cdt/graphs/commit-activity)
[![GitHub contributors](https://img.shields.io/github/contributors/codingtools/cdt)](https://github.com/codingtools/cdt/graphs/contributors)
[![License](https://img.shields.io/npm/l/@codingtools/cdt)](https://github.com/codingtools/cdt/blob/master/package.json) 
[![Greenkeeper badge](https://badges.greenkeeper.io/codingtools/cdt.svg)](https://greenkeeper.io/)
<!--  ![Node](https://img.shields.io/node/v/@codingtools/cdt) -->
<!-- [![Downloads](https://img.shields.io/npm/dm/@codingtools/cdt)](https://npmjs.org/package/@codingtools/cdt) -->


## Introduction

**cdt** is a command line utililty for developers.
It is focused on facilitating the development of applications by helping devs to do required tasks through utilities provided to enhance efficienty.

## Support the project ⭐

If you feel awesome and want to support us in a small way, please consider starring and sharing the repo! This helps us getting known and grow the community. 🙏

<img src="https://raw.githubusercontent.com/lusaxweb/vuesax/master/public/github-vuesax-star.gif" alt="vuesax-star" />



<!-- toc -->
* [Installation](#installation)
* [Commands](#commands)
<!-- tocstop -->
# Installation
<!-- usage -->
```sh-session
$ npm install -g @codingtools/cdt
$ cdt COMMAND
running command...
$ cdt (-v|--version|version)
@codingtools/cdt/0.1.5 darwin-x64 node-v12.9.0
$ cdt --help [COMMAND]
USAGE
  $ cdt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cdt autocomplete [SHELL]`](#cdt-autocomplete-shell)
* [`cdt bundlephobia [PACKAGE]`](#cdt-bundlephobia-package)
* [`cdt crypto [STRING]`](#cdt-crypto-string)
* [`cdt datetime [DATE]`](#cdt-datetime-date)
* [`cdt hash [STRING]`](#cdt-hash-string)
* [`cdt help [COMMAND]`](#cdt-help-command)
* [`cdt minify [FILE]`](#cdt-minify-file)

## `cdt autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ cdt autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ cdt autocomplete
  $ cdt autocomplete bash
  $ cdt autocomplete zsh
  $ cdt autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.4/src/commands/autocomplete/index.ts)_

## `cdt bundlephobia [PACKAGE]`

Find cost of adding a npm/yarn packages or all dependencies in package.json file

```
USAGE
  $ cdt bundlephobia [PACKAGE]

OPTIONS
  -f, --file=file          path for package.json file
  -h, --help               show CLI help
  -p, --packages=packages  packages for which cost is required, can pass more than one separated by space
```

_See code: [src/commands/bundlephobia.ts](https://github.com/codingtools/cdt/blob/v0.1.5/src/commands/bundlephobia.ts)_

## `cdt crypto [STRING]`

Encryption and Decryption functionality for File/String

```
USAGE
  $ cdt crypto [STRING]

OPTIONS
  -d, --decryption=decryption  decryption type, Supported [AES, DES, 3DES, Rabbit, RC4, RC4Drop]
  -e, --encryption=encryption  encryption type, Supported [AES, DES, 3DES, Rabbit, RC4, RC4Drop]
  -f, --file=file              file to be encrypted/decrypted
  -h, --help                   show CLI help
  -k, --key=key                key for encryption/decryption
  -m, --mode=mode              Block Mode, Supported [CBC, CFB, CTR, OFB, ECB]
  -s, --string=string          string to be encrypted/decrypted
```

_See code: [src/commands/crypto.ts](https://github.com/codingtools/cdt/blob/v0.1.5/src/commands/crypto.ts)_

## `cdt datetime [DATE]`

Date and Time utility

```
USAGE
  $ cdt datetime [DATE]

OPTIONS
  -d, --date=date          Datetime input string, default: Current Datetime, could also be passed through argument
  -f, --format=format      Datetime format, default: Do MMMM YYYY, h:m:s A, Z UTC
  -h, --help               show CLI help
  -l, --locale=locale      Locale, default: en
  -z, --timezone=timezone  Timezone for Datetime parsing, default: Your timezone
```

_See code: [src/commands/datetime.ts](https://github.com/codingtools/cdt/blob/v0.1.5/src/commands/datetime.ts)_

## `cdt hash [STRING]`

Hashing functionality for a string/file

```
USAGE
  $ cdt hash [STRING]

OPTIONS
  -f, --file=file              file to be hashed
  -h, --help                   show CLI help
  -o, --outputFile=outputFile  output file path
  -s, --string=string          string to be hashed
  -t, --type=type              type of hash [SHA1(default), MD5, SHA256, SHA512, RMD160 or RIPEMD160]
```

_See code: [src/commands/hash.ts](https://github.com/codingtools/cdt/blob/v0.1.5/src/commands/hash.ts)_

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

## `cdt minify [FILE]`

File Minifier

```
USAGE
  $ cdt minify [FILE]

OPTIONS
  -f, --file=file              file to be minified
  -h, --help                   show CLI help
  -o, --outputFile=outputFile  output file path

  -t, --type=type              type of file to be minified, it will try to find type with extension supported: JS,
                               HTML/HTM, CSS
```

_See code: [src/commands/minify.ts](https://github.com/codingtools/cdt/blob/v0.1.5/src/commands/minify.ts)_
<!-- commandsstop -->

## Acknowledgement
 * this cli uses following opensource libraries/services
    * [bundlephobia](https://bundlephobia.com/)
    * [avro-js](https://openbase.io/js/avro-js) 
    * [avsc](https://github.com/mtth/avsc)
    
    And many others, great thanks to all the people involved in developnment and support :)

## Contribution

Please Contribute to this project by forking [cdt](https://github.com/codingtools/cdt/)

Please feel free to provide any suggestion for new utility in [Issues](https://github.com/codingtools/cdt/issues)

## @codingtools/cdt

This Project is created and supported by [Ashish Patel](http://ashish.live/)

## License

[MIT](https://raw.githubusercontent.com/codingtools/cdt/master/LICENSE)
