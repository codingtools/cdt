import {Command, flags} from '@oclif/command'
// @ts-ignore
import * as Hashes from 'jshashes'

// TODO: all are Hexadecimal encoding for now, can also add b64

export default class Hash extends Command {
  static description = 'create hash for a string/file'

  static flags = {
    help: flags.help({char: 'h'}),
    // -t , --type for hashing
    type: flags.string({char: 't' , description: 'type of hash, default [SHA1]'}),
    string: flags.string({char: 's' , description: 'string to be hashed'}),
    file: flags.string({char: 'f' , description: 'file to be hashed'}),
  }

  static args = [{name: 'string'}]

  async run() {
    const {args, flags} = this.parse(Hash)

    const type = flags.type || 'sha1' //by default let it be sha1

    this.log('arg:' + args.string)

    let hash: Hashes
    switch (type.toUpperCase()) {
    case 'SHA1':
      hash = new Hashes.SHA1(); break
    case 'SHA256':
      hash = new Hashes.SHA256(); break
    case 'SHA512':
      hash = new Hashes.SHA512(); break
    case 'MD5':
      hash = new Hashes.MD5(); break
    case 'RMD160':
      hash = new Hashes.RMD160(); break
    default:
      hash = undefined
    }

    let hashed: string = hash.hex(args.string)
    this.log(`[HASH]: ${hashed}`)
  }
}
