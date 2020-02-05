import {Command, flags} from '@oclif/command'
import * as avro from 'avsc'
import * as chalk from 'chalk'
import * as fs from 'fs' // includes all from avro-js and some more

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

export default class Avro extends Command {
  static description = 'Avro Utility command'

  static GET_SCHEMA = 'get_schema'
  static TO_JSON = 'to_json'
  static TO_AVRO = 'to_avro'

  // do not change order otherwise we need to change order in getCommand() also
  static SupportedCommands = [Avro.GET_SCHEMA, Avro.TO_JSON, Avro.TO_AVRO]
  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({char: 'f' , description: 'input file path'}),
    output: flags.string({char: 'o' , description: 'output file path'}),
    schemaType: flags.string({char: 't' , description: 'schema type file path'}),

  }

  static args = [{name: 'command'}] // operation type
  /*
  *   input,output, and operation are all must
  * */
  async run() {
    const {args, flags} = this.parse(Avro)

    this.checkParameters(flags, args)
    this.executeCommand(flags, args)
  }

  // to check required parameters passed or not
  private checkParameters(flags: any, args: any) {
    if (!flags.file)
      Logger.error(this, 'Input file is not provided')
    if (!args.command)
      Logger.error(this, 'Command is empty or not provided, supported:' + Avro.SupportedCommands)

    // if exists then make it upperCase
    args.command = args.command.toLowerCase()

    // output is not mendatory for 'get_schema' command
    if (args.command !== Avro.GET_SCHEMA && !flags.output)
      Logger.error(this, 'Output file is not provided')

  }

  private executeCommand(flags: any, args: any) {
    switch (args.command) {
    case Avro.SupportedCommands[0]:
      return this.getSchema(flags, args)
    case Avro.SupportedCommands[1]:
      return this.toJson(flags, args)
    case Avro.SupportedCommands[2]:
      return this.toAvro(flags, args)
    default:
      Logger.error(this, 'Unsupported Command, supported: ' + Avro.SupportedCommands)
    }
  }

  // tslint:disable-next-line:no-unused
  private getSchema(flags: any, args: any) {
    avro.createFileDecoder(flags.file)
      .on('metadata', function (type) {
        let output = type.schema()
        let schemaStr = JSON.stringify(output)
        if (flags.output) {
          // @ts-ignore
          Utilities.writeStringToFile(this, flags.output, schemaStr)
        } else {
          // @ts-ignore
          Logger.success(this,
            `${chalk.yellow('Avro Schema')}\n${JSON.stringify(output, null, '  ')}`
          )
        }
      })
  }

  // tslint:disable-next-line:no-unused
  private toJson(flags: any, args: any) {
    Utilities.truncateFile(this, flags.output)
    avro.createFileDecoder(flags.file)
      .on('data', function (recordStr) {
        // @ts-ignore
        Utilities.appendStringToFile(this, flags.output, JSON.stringify(recordStr))
      })
    Logger.success(this, `output written to file: ${chalk.green(flags.output)}`) // this will output error and exit command
  }

  private toAvro(flags: any, args: any) {
    if (!flags.schemaType)
      Logger.error(this, 'Schema file is not provided')

    let schema = avro.parse(flags.schemaType)
    let avroEncoder = new avro.streams.BlockEncoder(schema)

    avroEncoder.pipe(fs.createWriteStream(flags.output))

// We write the records to the block encoder, which will take care of serializing them
// into an object container file.

    let jsonStr = '[' + Utilities.getInputString(this, flags, args) + ']'
    jsonStr = jsonStr.replace(/[\s\n]+/mg, '')
    jsonStr = jsonStr.replace(/\}\{/mg, '},{')
    let jsonObjects = JSON.parse(jsonStr)

    jsonObjects.forEach(function (data: any) {
      if (schema.isValid(data)) {
        avroEncoder.write(data)
      } else {
        // @ts-ignore
        Logger.warn(this, `${chalk.yellow('[SKIPPING RECORD]')} schema is invalid: ${chalk.yellowBright(JSON.stringify(data))}`)
      }
    })
    avroEncoder.end()
  }
}
