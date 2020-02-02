import {Command, flags} from '@oclif/command'
import * as avsc from 'avsc'
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
    args.commandFunction = this.getCommandCaller(args)
  }

  // to check required parameters passed or not
  private checkParameters(flags: any, args: any) {
    if (args.string === undefined || args.string === '')
      Logger.error(this, 'Input is empty or not provided')
    if (args.command === undefined || args.command === '')
      Logger.error(this, 'command is empty or not provided')
  }

  private getCommandCaller(args: any) {
    let supportedCommands = ['get_schema', 'to_json', 'to_avro']

    switch (args.command.toLowerCase()) {
    case supportedCommands[0]:
      return 'supported'
    case supportedCommands[1]:
      return 'supported'
    case supportedCommands[2]:
      return 'supported'
    default:
      Logger.error(this, 'Unsupported Commands Mode, supported: ' + supportedCommands)
    }
  }

}
