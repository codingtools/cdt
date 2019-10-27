import {Command, flags} from '@oclif/command'
import * as CryptoJS from 'crypto-js'

import Utilities from '../utilities/Utilities'

export default class Crypto extends Command {
  static description = 'Encryption and Decryption functionality'
  static flags = {
    help: flags.help({char: 'h'}),

    encryption: flags.string({char: 'e', description: 'encryption type'}),
    decryption: flags.string({char: 'd', description: 'decryption type'}),
    string: flags.string({char: 's' , description: 'string to be encrypted/decrypted'}),
    file: flags.string({char: 'f' , description: 'file to be encrypted/decrypted'}),
    key: flags.string({char: 'k' , description: 'key for encryption/decryption'}),
  }

  async run() {
    const {args, flags} = this.parse(Crypto)

    let enc = CryptoJS.DES.encrypt('Message', 'Secret Passphrase').ciphertext

    this.log(enc)

    // if -s or -f is not passed we will take it from args
    let str = ''

    const {key, decryption, string, file, encryption} = flags

    if (string) //if -s given
      str = string
    else if (file) {
      str = Utilities.getStringFromFile(this, file)
    } else
      str = args.string

    if (!key) {
      Utilities.logError('Key is not passed')
    }

    if (encryption) {
      if (decryption) // if both given
        Utilities.logError('Both encryption and decryption methods passed')
      this.Encrypt(str, encryption, key)
    } else if (decryption) {
      this.Decrypt(str, decryption, key)
    } else {
      Utilities.logError('Neither encryption or decryption methods passed')
    }
  }

  private Encrypt(str: string, type: string, key: string | undefined) {
    let crypto = this.getCryptoType(type)

    if (crypto) {
      // @ts-ignore
      // let encrypted: string = crypto.encrypt(str, key, {
      //   mode: CryptoJS.mode.CBC}).ciphertext.toString(CryptoJS.enc.Hex)
      let encrypted: string = crypto.encrypt(str, key).ciphertext
      this.log(`[${type.toUpperCase()}]: ${encrypted}`)
    } else {
      Utilities.logError('invalid hash type')
    }
  }

  private Decrypt(str: string, type: string, key: string | undefined) {
    let crypto = this.getCryptoType(type)

    if (crypto) {
      // @ts-ignore
      let decrypted: string = crypto.decrypt(str, key)
      this.log(`[${type.toUpperCase()}]: ${decrypted}`)
    } else {
      Utilities.logError('invalid hash type')
    }
  }

  private getCryptoType(type: string) {
    switch (type.toUpperCase()) {
    case 'AES':
      return CryptoJS.AES
    case 'DES':
      return CryptoJS.DES
    default:
      // tslint:disable-next-line:no-return-undefined
      return undefined //returning because of check there
    }

  }
}
