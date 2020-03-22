import {Command, flags} from '@oclif/command'
import * as avro from 'avsc'
import * as chalk from 'chalk'
import * as fs from 'fs' // includes all from avro-js and some more
import * as Json2Csv from 'json-2-csv'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

export default class Avro extends Command {
  static description = 'Avro Utility command'

  static GET_SCHEMA = 'get_schema'
  static TO_JSON = 'to_json'
  static TO_AVRO = 'to_avro'
  static TO_CSV = 'to_csv'

  // do not change order otherwise we need to change order in getCommand() also
  static SupportedCommands = [Avro.GET_SCHEMA, Avro.TO_JSON, Avro.TO_AVRO, Avro.TO_CSV]

  static flags = {
    help: flags.help({char: 'h'}),
    command: flags.string({char: 'c' , description: `commands supported: ${Avro.SupportedCommands}`}),
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

    if (flags.command) // if -c flag have value, then override
      args.command = flags.command

    if (!args.command)
      Logger.error(this, 'Command is empty or not provided, supported:' + Avro.SupportedCommands)
    else // if exists then make Lower Case
      args.command = args.command.toLowerCase()

    // output is not mendatory for 'get_schema' command
    if (args.command !== Avro.GET_SCHEMA && !flags.output)
      Logger.error(this, 'Output file is not provided')

  }

  private executeCommand(flags: any, args: any) {
    switch (args.command) {
    case Avro.GET_SCHEMA:
      return this.getSchema(flags, args)
    case Avro.TO_JSON:
      return this.toJson(flags, args)
    case Avro.TO_AVRO:
      return this.toAvro(flags, args)
    case Avro.TO_CSV:
      return this.toCsv(flags, args)
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
    Logger.progressStart(this, 'Converting Avro To Json')
    // setTimeout(() => {
    Logger.progressStop(this, ' Converting Avro To Json')
    Utilities.truncateFile(this, flags.output)
    avro.createFileDecoder(flags.file)
      .on('data', function (recordStr) {
        // @ts-ignore
        Utilities.appendStringToFile(this, flags.output, JSON.stringify(recordStr))
      })
    Logger.success(this, `${chalk.blue('Json')} written to file: ${chalk.green(flags.output)}`) // this will output error and exit command
    // }, 1000)
  }

// tslint:disable-next-line:no-unused
  private toCsv(flags: any, args: any) {
    Logger.progressStart(this, 'Converting Avro To Csv')

    // setTimeout(() => {
    Logger.progressStop(this, ' Converting Avro To Csv')
    Utilities.truncateFile(this, flags.output)
    let prependHeader = true // only write on the first line
    avro.createFileDecoder(flags.file)
      .on('data', function (recordStr) {
        // @ts-ignore
        let json = JSON.parse(JSON.stringify(recordStr))
        Json2Csv.json2csv(json, (err?: Error, csv?: string) => {
          if (csv) {
            // @ts-ignore
            Utilities.appendStringToFile(this, flags.output, csv + '\n')
          }
          if (err) {
            // @ts-ignore
            Logger.error(this, err.toString())
          }
        }, {prependHeader})
        prependHeader = false
      })
    Logger.success(this, `${chalk.blue('Csv')} written to file: ${chalk.green(flags.output)}`) // this will output error and exit command
    // }, 300)
  }

  private toAvro(flags: any, args: any) {
    if (!flags.schemaType)
      Logger.error(this, 'Schema file is not provided')

    Logger.progressStart(this, 'Generating Avro')
    // setTimeout(() => {
    Logger.progressStop(this, ' Generating Avro')

    let schema = avro.parse(flags.schemaType)
    let avroEncoder = new avro.streams.BlockEncoder(schema)

    avroEncoder.pipe(fs.createWriteStream(flags.output))

// We write the records to the block encoder, which will take care of serializing them
// into an object container file.

    let inputString = Utilities.getInputString(this, flags, args)
    let jsonStr = this.convertAvroJsonToValidJson(inputString)

    let jsonObjects = JSON.parse(jsonStr)

    jsonObjects.forEach(function (data: any) {
      if (schema.isValid(data)) {
        avroEncoder.write(data)
      } else {
        // @ts-ignore
        Logger.warn(this, `${chalk.yellow('[SKIPPING RECORD]')} schema is invalid: ${chalk.yellowBright(JSON.stringify(data))}`)
      }
    })
    Logger.success(this, `${chalk.blue('Avro')} written to file: ${chalk.green(flags.output)}`) // this will output error and exit command
    avroEncoder.end()
    // }, 300)

  }

  private convertAvroJsonToValidJson(json: string) {
    let jsonStr = '[' + json + ']'
    jsonStr = jsonStr.replace(/[\s\n]+/mg, '')
    jsonStr = jsonStr.replace(/\}\{/mg, '},{')
    return jsonStr
  }
}
