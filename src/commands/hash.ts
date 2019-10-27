import {Command, flags} from '@oclif/command'
// @ts-ignore
import * as Hashes from 'jshashes'

import Utilities from '../utilities/Utilities'
import Logger from '../utilities/Logger'
// TODO: all are Hexadecimal encoding for now, can also add b64

export default class Hash extends Command {
  static description = 'create hash for a string/file'

  static flags = {
    help: flags.help({char: 'h'}),
    // -t , --type for hashing
    type: flags.string({char: 't' , description: 'type of hash [SHA1(default),MD5,SHA256,SHA512,RMD160]'}),
    string: flags.string({char: 's' , description: 'string to be hashed'}),
    file: flags.string({char: 'f' , description: 'file to be hashed'}),
  }

  static args = [{name: 'string'}]

  async run() {
    const {args, flags} = this.parse(Hash)

    // only 2 parameters required HASH_TYPE and INPUT_STRING
    flags.type = Hash.getHashType(flags) //by default let it be sha1
    flags.string = Hash.getInputString(flags,args) // from either -s,-f or args

    this.calculateHash(flags)
  }

  private calculateHash(flags: any) {
    const hashObject = Hash.getHashObject(flags)

    if (hashObject) {
      let hashed: string = hashObject.hex(flags.string)
      Logger.success(this, `[${flags.type.toUpperCase()}] ${hashed}`)
    } else {
      Logger.error(this, 'Invalid Or Unsupported hash type')
    }
  }

  private static getHashObject(flags: any){
    switch (flags.type.toUpperCase()) {
      case 'SHA1':
        return new Hashes.SHA1()
      case 'SHA256':
        return new Hashes.SHA256()
      case 'SHA512':
        return new Hashes.SHA512()
      case 'MD5':
        return new Hashes.MD5()
      case 'RMD160':
        return new Hashes.RMD160()
      default:
        return  undefined
    }
  }

  private static getHashType(flags: any) {
    return flags.type || 'sha1'
  }

  private static getInputString(flags: any, args:any) {
    // if -s or -f is not passed we will take it from args
    let str=''
    if (flags.string) //if -s given
      str = flags.string
    else if (flags.file) {
      Logger.info(this, `reading file: ${flags.file}`)
      str = Utilities.getStringFromFile(this, flags.file)
    } else
      str = args.string
    return str;
  }
}
