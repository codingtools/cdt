cdt
===

Command Line tools for CODERs

[![Version](https://img.shields.io/npm/v/@codingtools/cdt.svg)](https://npmjs.org/package/@codingtools/cdt)
[![Downloads/week](https://img.shields.io/npm/dw/@codingtools/cdt.svg)](https://npmjs.org/package/@codingtools/cdt)
[![License](https://img.shields.io/npm/l/@codingtools/cdt.svg)](https://github.com/codingtools/cdt/blob/master/package.json) 
[![Greenkeeper badge](https://badges.greenkeeper.io/codingtools/cdt.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/codingtools/cdt/tree/master.svg?style=shield)](https://circleci.com/gh/codingtools/cdt/tree/release/release-v0.1)
[![Downloads/week](https://img.shields.io/npm/dw/@codingtools/cdt/command.svg)](https://npmjs.org/package/@codingtools/cdt/command)

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
cdt/0.1.1 darwin-x64 node-v12.9.0
$ cdt --help [COMMAND]
USAGE
  $ cdt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cdt crypto [STRING]`](#cdt-crypto-string)
* [`cdt hash [STRING]`](#cdt-hash-string)
* [`cdt help [COMMAND]`](#cdt-help-command)
* [`cdt minify [FILE]`](#cdt-minify-file)

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

_See code: [src/commands/crypto.ts](https://github.com/codingtools/cdt/blob/v0.1.1/src/commands/crypto.ts)_

## `cdt hash [STRING]`

Hashing functionality for a string/file

```
USAGE
  $ cdt hash [STRING]

OPTIONS
  -f, --file=file      file to be hashed
  -h, --help           show CLI help
  -s, --string=string  string to be hashed
  -t, --type=type      type of hash [SHA1(default), MD5, SHA256, SHA512, RMD160 or RIPEMD160]
```

_See code: [src/commands/hash.ts](https://github.com/codingtools/cdt/blob/v0.1.1/src/commands/hash.ts)_

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
  -f, --file=file  file to be minified
  -h, --help       show CLI help
  -t, --type=type  type of file to be minified, it will try to find type with extension
```

_See code: [src/commands/minify.ts](https://github.com/codingtools/cdt/blob/v0.1.1/src/commands/minify.ts)_
<!-- commandsstop -->
