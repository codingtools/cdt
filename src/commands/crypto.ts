import {Command, flags} from '@oclif/command'
import * as CryptoJS from 'crypto-js'

import Logger from '../utilities/logger'

import Hash from './hash'

export default class Crypto extends Command {
  static ENCRYPTION = 'encryption'
  static DECRYPTION = 'decryption'
  static description = 'Encryption and Decryption functionality'
  static flags = {
    help: flags.help({char: 'h'}),

    encryption: flags.string({char: 'e', description: 'encryption type, Supported [AES, DES, 3DES, Rabbit, RC4, RC4Drop]'}),
    decryption: flags.string({char: 'd', description: 'decryption type, Supported [AES, DES, 3DES, Rabbit, RC4, RC4Drop]'}),
    string: flags.string({char: 's' , description: 'string to be encrypted/decrypted'}),
    file: flags.string({char: 'f' , description: 'file to be encrypted/decrypted'}),
    key: flags.string({char: 'k' , description: 'key for encryption/decryption'}),
    mode: flags.string({char: 'm' , description: 'Block Mode, Supported [CBC, CFB, CTR, OFB, ECB]'})
  }

  static args = [{name: 'string'}]
  //need INPUT_STRING, TYPE_OF_CRYPTO , KEY, MODE
  async run() {
    const {args, flags} = this.parse(Crypto)

    args.string = Hash.getInputString(this, flags, args) //always add input to args
    args.type = flags.encryption ? flags.encryption : flags.decryption //type like AES,DES

    this.checkParameters(flags, args)
    flags.encryption ? this.Encrypt(flags, args) : this.Decrypt(flags, args)
  }

  private Encrypt(flags: any, args: any) {
    let crypto = this.getCryptoType(args.type)
    Logger.info(this, `Encryption: ${flags.encryption.toUpperCase()}`)
    // @ts-ignore // as crypto will never be undefined and reach here
    let encrypted: string = crypto.encrypt(args.string, flags.key, {
      mode: this.getCryptoMode(flags)
    }).toString()
    Logger.success(this, `${encrypted}`)
  }

  private Decrypt(flags: any, args: any) {
    let crypto = this.getCryptoType(args.type)
    Logger.info(this, `Decryption: ${flags.decryption.toUpperCase()}`)
    // @ts-ignore // as crypto will never be undefined and reach here
    let decrypted: string = crypto.decrypt(args.string, flags.key, {
      mode: this.getCryptoMode(flags)
    }).toString(CryptoJS.enc.Utf8)
    Logger.success(this, `${decrypted}`)
  }

  private getCryptoType(type: string) {
    switch (type.toUpperCase()) {
    case 'AES':
      return CryptoJS.AES
    case 'DES':
      return CryptoJS.DES
    case '3DES':
      return CryptoJS.TripleDES
    case 'RABBIT':
      return CryptoJS.Rabbit
    case 'RC4':
      return CryptoJS.RC4
    case 'RC4DROP':
      return CryptoJS.RC4Drop
    default:
      Logger.error(this, 'Invalid or Unsupported Encryption/Decryption type')
    }
  }

  // to check required parameters passed or not
  private checkParameters(flags: any, args: any) {
    if (!flags.key)
      Logger.error(this, 'Key is not passed')

    if (args.string === undefined || args.string === '')
      Logger.error(this, 'Input string is empty or undefined')

    if (flags.encryption && flags.decryption)
      Logger.error(this, 'Both encryption and decryption methods passed')

    if (!(flags.encryption || flags.decryption))
      Logger.error(this, 'Neither encryption or decryption methods passed')
  }

  private getCryptoMode(flags: any) {
    if (!flags.mode) //set default
      flags.mode = 'CBC' // it will not set to flags.mode there in run() but we do not require it
    Logger.info(this, 'Block Mode: ' + flags.mode)
    switch (flags.mode.toUpperCase()) {
    case 'CBC':
      return CryptoJS.mode.CBC
    case 'CFB':
      return CryptoJS.mode.CFB
    case 'OFB':
      return CryptoJS.mode.OFB
    case 'ECB':
      return CryptoJS.mode.ECB
    default:
      Logger.error(this, 'Invalid or Unsupported Block Mode')
    }
  }

}
