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

  // only 2 parameters required HASH_TYPE and INPUT_STRING
  async run() {
    const {args, flags} = this.parse(Hash)

    flags.type = this.getHashType(flags) //by default let it be sha1
    args.string = Hash.getInputString(this,flags,args) // from either -s,-f or args

    //check params after evaluating all
    this.checkParameters(flags, args)
    this.calculateHash(flags, args)
  }

  // to check required parameters passed or not
  private checkParameters(flags: any, args: any) {
    if(args.string == undefined || args.string =="" )
      Logger.error(this, 'Input string is empty or undefined')

  }

  private calculateHash(flags: any, args:any) {
    const hashObject = this.getHashObject(flags)
    let hashed: string = hashObject.hex(args.string)
    Logger.success(this, `[${flags.type.toUpperCase()}] ${hashed}`)
  }

  private getHashObject(flags: any){
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
        Logger.error(this, 'Invalid Or Unsupported hash type')
        return undefined // code never reach here
    }
  }

  private  getHashType(flags: any) {
    return flags.type || 'sha1'
  }

   static getInputString(thisRef: any ,flags: any, args:any) { //need to make it static so Crypto can use this
    // if -s or -f is not passed we will take it from args
    if (flags.string) //if -s given
      return flags.string
    else if (flags.file) {
      Logger.info(thisRef, `reading file: ${flags.file}`)
      return Utilities.getStringFromFile(thisRef, flags.file)
    } else
      return args.string
  }
}
