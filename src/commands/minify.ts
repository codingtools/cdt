import {Command, flags} from '@oclif/command'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

export default class Minify extends Command {
  static description = 'File Minifier'

  static flags = {
    help: flags.help({char: 'h'}),
    type: flags.string({char: 't' , description: 'type of file to be minified, it will try to find type with extension'}),
    file: flags.string({char: 'f' , description: 'file to be minified'}),
  }

  static args = [{name: 'file'}]

  static JS = 'JS'
  static HTML = 'HTML'
  static CSS = 'CSS'

  // required FILE
  async run() {
    const {args, flags} = this.parse(Minify)

    args.file = this.getFilePath(flags, args)
    args.string = this.getFileString(args)
    flags.type = this.getFileType(flags, args)

    // this.checkParameters(flags, args)

  }

  // this will get file type either from flags.type or file extension ( if flag is not given)
  private getFileType(flags: any, args: any) {
    if (flags.type) //if type is given
      return this.getFileTypeFromExtension(flags.type)

    let fileExtensionRegex = /\w+\.([a-z]+)/

    args.s

  }

  private getFileTypeFromExtension(extension: string) {
    switch (extension.toUpperCase()) {
    case 'JS': case 'JAVASCRIPT':
      return Minify.JS
    case 'CSS':
      return Minify.CSS
    case 'HTML': case 'HTM':
      return Minify.HTML
    default:
      Logger.error(this, 'Invalid File Type')
    }
  }

  // get filepath from args or flags ( if args not have file name )
  // this will get file path into args.file either from args or flags
  private getFileString(args: any) {
    return Utilities.getStringFromFile(this, args.file)
  }

  private getFilePath(flags: any, args: any) {
    if (args.file)
      return args.file
    if (flags.file)
      return flags.file
    Logger.error(this, 'File path not passed')
  }

  // private checkParameters(flags: unknown, args: { [p: string]: any }) {
  //   if(validFileType)
  // }
}
