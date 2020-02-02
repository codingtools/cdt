import {Command, flags} from '@oclif/command'
import * as avro from 'avsc'
import * as chalk from 'chalk' // includes all from avro-js and some more

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

export default class Avro extends Command {
  static description = 'Avro Utility command'
  static SupportedCommands = ['get_schema', 'to_json', 'to_avro']
  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({char: 'f' , description: 'input file path'}),
    output: flags.string({char: 'o' , description: 'output file path'}),
    schema: flags.string({char: 't' , description: 'schema type file path'}),

  }

  static args = [{name: 'command'}] // operation type
  /*
  *   input,output, and operation are all must
  * */
  async run() {
    const {args, flags} = this.parse(Avro)

    this.checkParameters(flags, args)
    args.commandFunction = this.getCommandCaller(args)
    args.commandFunction(flags, args)
  }

  // to check required parameters passed or not
  private checkParameters(flags: any, args: any) {
    if (flags.file === undefined || flags.file === '')
      Logger.error(this, 'Input file is not provided')
    if (flags.output === undefined || args.output === '')
      Logger.error(this, 'Output file is not provided')
    if (args.command === undefined || args.command === '')
      Logger.error(this, 'Command is empty or not provided, supported:' + Avro.SupportedCommands)
  }

  private getCommandCaller(args: any) {
    switch (args.command.toLowerCase()) {
    case Avro.SupportedCommands[0]:
      return this.getSchema
    case Avro.SupportedCommands[1]:
      return this.toJson
    case Avro.SupportedCommands[2]:
      return this.toAvro
    default:
      Logger.error(this, 'Unsupported Command, supported: ' + Avro.SupportedCommands)
    }
  }

  private getSchema(flags: any, args: any) {
    avro.createFileDecoder(flags.file)
      .on('metadata', function (type) {
        let output = type.schema()
        let schemaStr = JSON.stringify(output, null, '\t')
        Utilities.writeStringToFile(this, flags.output, schemaStr)
      })

  }
  private toJson(flags: any, args: any) {
    Utilities.truncateFile(this, flags.output)
    avro.createFileDecoder(flags.file)
      .on('data', function (recordStr) {
        Utilities.appendStringToFile(this, flags.output, JSON.stringify(recordStr, null, '\t'))
      })
    Logger.success(this, `output written to file: ${chalk.green(flags.output)}`) // this will output error and exit command
  }
  private toAvro(flags: any, args: any) {

  }

  // private checkValidAvsc(){
  //   // Or we can specify a path to a schema file (not in the browser):
  //   var type = avro.parse('./Person.avsc');
  //   var person = {name: 'Bob', address: {city: 'Cambridge', zip: '02139'}};
  //   var status = type.isValid(person); // Boolean status.
  // }
}
