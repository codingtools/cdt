// tslint:disable-next-line:file-name-casing
import * as Ora from 'ora'
import * as signale from 'signale'

// tslint:disable-next-line:no-unnecessary-class
export default class Logger {
  static spinner: any

  // uses signale for logging withoug thisRef
  // tslint:disable-next-line:no-unused
  public static success(thisRef: any, message: string) {
    signale.success(`${message}`)
  }
  // tslint:disable-next-line:no-unused
  public static info(thisRef: any, message: string) {
    signale.info(`${message}`)
  }
  public static error(thisRef: any, message: string) {
    signale.error(`${message}`)
    thisRef.exit(0) //added to exit command
  }

  // tslint:disable-next-line:no-unused
  public static warn(thisRef: any, message: any) {
    signale.warn(`${message}`)
  }

  // tslint:disable-next-line:no-unused
  public static progressStart(thisRef: any, message: string) {
    // signale.watch(`${message}`)
    Logger.spinner = Ora(message)
    Logger.spinner.start()
  }

  // tslint:disable-next-line:no-unused
  public static progressStart1(thisRef: any, message: string) {
    // signale.watch(`${message}`)
    Logger.spinner = Ora()
    Logger.spinner.start()
  }

  // tslint:disable-next-line:no-unused
  public static progressStop(thisRef: any, message: string) {
    Logger.spinner.succeed(message)
  }

  // tslint:disable-next-line:no-unused
  public static progressStopError(thisRef: any, message: string) {
    Logger.spinner.warn(message)
  }

  // public static logSuccess(thisRef: any, message: string) {
  //   thisRef.log(` ›   Success: ${message}`)
  // }
  // public static logInfo(thisRef: any, message: string) {
  //   thisRef.log(` ›   Info: ${message}`)
  // }
  // public static logError(thisRef: any, message: string) {
  //   thisRef.error(`${message}`)
  // }
}
