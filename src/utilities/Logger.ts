import * as signale from 'signale'

export default class Logger {

  // uses signale for logging withoug thisRef
  public static success(thisRef: any, message: string) {
    signale.success(`${message}`)
  }
  public static info(thisRef: any, message: string) {
    signale.info(`${message}`)
  }
  public static error(thisRef: any, message: string) {
    signale.error(`${message}`)
    thisRef.exit() //added to exit command
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
