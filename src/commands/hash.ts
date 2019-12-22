import {Command, flags} from '@oclif/command'
import * as CryptoJS from 'crypto-js'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'
// import * as Hashes from 'jshashes'

// TODO: all are Hexadecimal encoding for now, can also add b64

export default class Hash extends Command {
  static description = 'Hashing functionality for a string/file'

  static flags = {
    help: flags.help({char: 'h'}),
    // -t , --type for hashing
    type: flags.string({char: 't' , description: 'type of hash [SHA1(default), MD5, SHA256, SHA512, RMD160 or RIPEMD160]'}),
    string: flags.string({char: 's' , description: 'string to be hashed'}),
    file: flags.string({char: 'f' , description: 'file to be hashed'}),
    outputFile: flags.string({char: 'o' , description: 'output file path'}),
  }

  static args = [{name: 'string'}]

  // only 2 parameters required HASH_TYPE and INPUT_STRING
  async run() {
    const {args, flags} = this.parse(Hash)

    flags.type = this.getHashType(flags) //by default let it be sha1
    args.string = Utilities.getInputString(this, flags, args) // from either -s,-f or args

    //check params after evaluating all
    this.checkParameters(flags, args)
    this.calculateHash(flags, args)
  }

  // to check required parameters passed or not
  // tslint:disable-next-line:no-unused
  private checkParameters(flags: any, args: any) {
    if (args.string === undefined || args.string === '')
      Logger.error(this, 'Input string is empty or undefined')

  }

  private calculateHash(flags: any, args: any) {
    const hashObject = this.getHashObject(flags)
    // @ts-ignore
    let hashed: string = hashObject(args.string)
    Logger.success(this, `[${flags.type.toUpperCase()}] ${hashed}`)

    if (flags.outputFile) { // if output path is provided then write to file also
      Utilities.writeStringToFile(this, flags.outputFile, hashed)
    }
  }

  // BACKUP function
  // private getHashObject2(flags: any) {
  //   switch (flags.type.toUpperCase()) {
  //   case 'SHA1':
  //     return new Hashes.SHA1().hex
  //   case 'SHA256':
  //     return new Hashes.SHA256().hex
  //   case 'SHA512':
  //     return new Hashes.SHA512().hex
  //   case 'MD5':
  //     return new Hashes.MD5().hex
  //   case 'RMD160':
  //     return new Hashes.RMD160().hex
  //   default:
  //     Logger.error(this, 'Invalid Or Unsupported hash type')
  //   }
  // }

  private getHashObject(flags: any) {
    switch (flags.type.toUpperCase()) {
    case 'SHA1':
      return CryptoJS.SHA1
    case 'SHA256':
      return CryptoJS.SHA256
    case 'SHA512':
      return CryptoJS.SHA512
    case 'MD5':
      return CryptoJS.MD5
    case 'RMD160': case 'RIPEMD160':
      return CryptoJS.RIPEMD160
    default:
      Logger.error(this, 'Invalid Or Unsupported hash type')
    }
  }

  private getHashType(flags: any) {
    return flags.type || 'sha1'
  }
}
