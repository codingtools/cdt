import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
// @ts-ignore
import * as Hashes from 'jshashes'

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

    const type: string = flags.type || 'sha1' //by default let it be sha1

    // if -s or -f is not passed we will take it from args
    let str = ''

    if (flags.string) //if -s given
      str = flags.string
    else if (flags.file) {
      str = this.getStringFromFile(flags.file)
    } else
    str = args.string

    this.calculateHash(type, str)
  }

  private calculateHash(type: string, str: string) {
    let hash: Hashes
    switch (type.toUpperCase()) {
    case 'SHA1':
      hash = new Hashes.SHA1()
      break
    case 'SHA256':
      hash = new Hashes.SHA256()
      break
    case 'SHA512':
      hash = new Hashes.SHA512()
      break
    case 'MD5':
      hash = new Hashes.MD5()
      break
    case 'RMD160':
      hash = new Hashes.RMD160()
      break
    default:
      hash = undefined
    }

    if (hash) {
      let hashed: string = hash.hex(str)
      this.log(`[${type.toUpperCase()}]: ${hashed}`)
    } else {
      this.log('[ERROR]: invalid hash type')
    }
  }

  private getStringFromFile(filePath: string) {
    let fileStr = ''
    if (!fs.existsSync(filePath)) {
      this.error('reading File') // this will output error and exit command
    } else {
      fileStr = fs.readFileSync(filePath, 'utf8')

      // TODO: fix this Issue #3
      if (fileStr.charAt(fileStr.length - 1) === '\n') {
        fileStr = fileStr.substring(0, fileStr.length - 1)
      }
    }
    return fileStr

  }
}
