import {Command, flags} from '@oclif/command'
import * as CryptoJS from 'crypto-js'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

export default class Avro extends Command {
  static description = 'Avro Utility command'
  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({char: 'f' , description: 'input file path'}),
    output: flags.string({char: 'o' , description: 'output file path'}),
    schema: flags.string({char: 't' , description: 'schema type file path'}),

  }

  static args = [{name: 'command'}] // operation type

  async run() {
    const {args, flags} = this.parse(Avro)

    args.string = Utilities.getInputString(this, flags, args) // from either -s,-f or args
    this.checkParameters(flags, args)
  }

  // to check required parameters passed or not
  private checkParameters(flags: any, args: any) {

    if (args.string === undefined || args.string === '')
      Logger.error(this, 'Input is empty or not provided')

    if (args.command === undefined || args.command === '')
      Logger.error(this, 'Input is empty or not provided')

  }

  private getCommandCaller(args: any) {
    let supportedCommands = ['get_schema', 'to_json', 'to_avro']

    let s = args.command.toUpperCase()
    if (s === supportedCommands[0]) {
      return CryptoJS.mode.CBC
    } else if (s === supportedCommands[1]) {
      return CryptoJS.mode.CFB
    } else if (s === supportedCommands[2]) {
      return CryptoJS.mode.OFB
    } else {
      Logger.error(this, 'Unsupported Commands Mode, supported: ' + supportedCommands)
    }
  }

}
