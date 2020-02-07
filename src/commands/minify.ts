import {Command, flags} from '@oclif/command'

const MinifyJs = require('minify')

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

export default class Minify extends Command {
  static description = 'File Minifier'

  static flags = {
    help: flags.help({char: 'h'}),
    type: flags.string({char: 't' , description: 'type of file to be minified, it will try to find type with extension supported: JS, HTML/HTM, CSS'}),
    file: flags.string({char: 'f' , description: 'file to be minified'}),
    output: flags.string({char: 'o' , description: 'output file path'}),
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

    Logger.info(this, `reading file: ${args.file}`)
    Logger.info(this, `file type: ${flags.type}`)

    this.checkParameters(flags, args)
    this.minifyString(flags, args)
  }

  // this will get file type either from flags.type or file extension ( if flag is not given)
  private getFileType(flags: any, args: any) {
    if (flags.type) //if type is given
      return this.getFileTypeFromExtension(flags.type)

    let fileExtensionRegex = /\w+\.([a-z]+)/
    let extension = args.file.match(fileExtensionRegex)[1]
    return this.getFileTypeFromExtension(extension)
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

  // tslint:disable-next-line:no-unused
  private checkParameters(flags: unknown, args: { [p: string]: any }) {
    if (args.file === undefined || args.file === '')
      Logger.error(this, 'File path is empty')
    // others already checked
  }

  //TODO: add image compression also
  //TODO: add error handling also
  private minifyString(flags: any, args: any) {
    Logger.progressStart(this, 'minifying...')

    let output = ''
    // setTimeout(() => { //TODO: can add spinner for bigger files using promise
    switch (flags.type) {
    case Minify.JS:
      output = MinifyJs.js(args.string); break
    case Minify.CSS:
      output = MinifyJs.css(args.string); break
    case Minify.HTML:
      output = MinifyJs.html(args.string); break
    default:
      Logger.error(this, 'Invalid Minifier Type')
    }
    Logger.progressStop(this, `file: ${flags.file} minified`)
    // }, 1000)

    if (flags.output) { // if output path is provided then write to file also
      Utilities.writeStringToFile(this, flags.output, output)
    } else
      Logger.success(this, `minified output: \n${output}`)
  }
}
