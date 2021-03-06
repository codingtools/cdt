import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import moment from 'moment-timezone' //has both momentjs and timezone support

// @ts-ignore
moment.suppressDeprecationWarnings = true

import Logger from '../utilities/logger'

// TODO: add timezone support for input and output
export default class Datetime extends Command {
  static description = 'Date and Time utility'

  static defaultFormat = 'Do MMMM YYYY, h:m:s A, Z UTC'

  static flags = {
    help: flags.help({char: 'h'}),
    date: flags.string({char: 'd', description: 'Datetime input string, default: Current Datetime, could also be passed through argument'}),
    format: flags.string({char: 'f', description: `Datetime format, default: ${Datetime.defaultFormat}`}),
    timezone: flags.string({char: 'z', description: 'Timezone for Datetime parsing, default: Your timezone'}),
    locale: flags.string({char: 'l', description: 'Locale, default: en'}),
  }

  static args = [{name: 'date'}]

  //arguments 'date' ( default now() ), 'format' ( default 'dd-MMM-YYYY' ), 'timezone' (default user local)
  async run() {
    const {args, flags} = this.parse(Datetime)

    args.date = this.getDateString(flags, args) // getting date object
    args.locale = this.getLocale(flags, args) // getting date object
    args.format = this.getFormat(flags, args) // getting date object
    args.timezone = this.getTimezone(flags, args) // getting date object

    Logger.info(this, `Input String: ${ args.date ? args.date : chalk.magenta('Not Provided, using Current timestamp') }`)
    Logger.info(this, `Locale: ${chalk.magenta(args.locale)}`)
    Logger.info(this, `Format: ${chalk.magenta(args.format)}`)
    Logger.info(this, `Timezone: ${chalk.magenta(args.timezone)}`) // true - do not used cached timezone, find every time

    args.momentDate = this.getMomentDate(flags, args)
    this.checkParameters(flags, args)

    Logger.success(this, `${args.momentDate.tz(args.timezone).format(args.format)}`)

  }

  // tslint:disable-next-line:no-unused
  private getTimezone(flags: any, args: any) {
    if (flags.timezone)
      return flags.timezone
    else
      return moment.tz.guess()
  }

  // tslint:disable-next-line:no-unused
  private getLocale(flags: any, args: any) {
    if (flags.locale)
      return flags.locale
    else
      return 'en'
  }

  private getDateString(flags: any, args: any) {
    let dateString: string | undefined

    if (args.date)
      dateString = args.date
    else if (flags.date)
      dateString = flags.date
    else
      dateString = undefined // will be set to  now()

    return dateString
  }

  private getMomentDate(flags: any, args: any) {
    let date: moment.Moment

    if (args.date)
      date = moment.tz(args.date, args.timezone)
    else
      date = moment.tz([], args.timezone) // return now() if args.date is undefined

    // set locale
    date.locale(flags.locale)
    return date
  }

  // tslint:disable-next-line:no-unused
  private checkParameters(flags: any, args: any) {
    if (!args.momentDate.isValid())
      Logger.error(this, 'Invalid Date String Passed')
  }

  // tslint:disable-next-line:no-unused
  private getFormat(flags: any, args: any) {
    return flags.format ? flags.format : Datetime.defaultFormat
  }
}
