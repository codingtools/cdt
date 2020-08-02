import {Command, flags} from '@oclif/command'
import axios from 'axios'
import chalk from 'chalk'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

// TODO:
// ADD VALID tests ( for now they just ignoring )
export default class Bundlephobia extends Command {
  static description = 'Find cost of adding a npm/yarn packages or all dependencies in package.json file'

  static flags = {
    help: flags.help({char: 'h'}),
    packages: flags.string({
      char: 'p',
      description: 'packages for which cost is required, can pass more than one separated by space',
      multiple: true // can get multiple package names
    }),
    file: flags.string({char: 'f', description: 'path for package.json file'}),
  }

  static args = [{name: 'package'}] // only one can be passed club which one passed through flag and arg

  private static getSize(byteSize: number) {
    if (byteSize >= 1024 * 1024)
      return `${chalk.red((byteSize / (1024 * 1024)).toFixed(1) + 'MB')}`
    else if (byteSize >= 1024)
      return `${chalk.blue((byteSize / (1024)).toFixed(1) + 'KB')}`
    else //if (byteSize < 1024)
       return `${chalk.green(byteSize.toFixed(1) + 'B')}`
  }

  // values needed package
  async run() {
    const {args, flags} = this.parse(Bundlephobia)

    args.packages = this.getPackages(flags, args) // get a list

    Logger.info(this, `running bundlephobia for ${args.packages.length} packages`)
    this.checkParameters(flags, args)
    this.bundlePhobia(flags, args)
  }

  private getErrorMessage(pkg: string, message: string) {
    // replacing will be useful when we do not have specific version
    // output will be like below
/*
    ⚠ @codingtools/cdt@1.2.3 This package has not been published with this particular version.
                     Valid versions - `<code>latest</code>`, `<code>0.1.1</code>` and `<code>0.1.2</code>`
*/
    if (message.includes('This package has not been published with this particular version.'))
      message = message.replace(/`<code>|<\/code>`/g, '')

    return `${chalk.red(pkg)} ${message}`
  }

  private getPackages(flags: any, args: any) {
    let packages = []

    if (args.package)
      packages.push(args.package)
    if (flags.packages)
      packages = packages.concat(flags.packages) // not inplace operation

    // package.json file passed
    if (flags.file) {
      let jsonObject = Utilities.getJsonObjectFromFile(this, flags.file)
      packages = packages.concat(this.convertObjectToArray(jsonObject.dependencies))
    }
    return packages
  }

  // tslint:disable-next-line:no-unused
  private checkParameters(flags: unknown, args: any) {
    if (args.packages.length === 0)
      Logger.error(this, 'At least one package must be passed')
  }

  // tslint:disable-next-line:no-unused
  private bundlePhobia(flags: any, args: any) {
    Logger.progressStart(this, 'finding size...')

    let size = 0
    let gzip = 0
    let dependencyCount = 0
    let packagesResolved = 0

    let packagesInfo: any[] = args.packages.map(
      (pkg: string) => {
        return {
          url: `https://bundlephobia.com/api/size?package=${pkg}`,
          pkg
        }
      }
    )

    // tslint:disable-next-line:no-unsafe-any no-unused
    let x = axios.all(packagesInfo.map((packageInfo: any) => { // have to use x for removing TSLintError: promises must be handled appropriately
      return axios.get(packageInfo.url).then(successResponse => {
        packagesResolved ++
        size += successResponse.data.size
        gzip += successResponse.data.gzip
        dependencyCount += successResponse.data.dependencyCount
        Logger.progressStop(this, this.getSuccessMessage(successResponse.data))
      }).catch(errorResponse => {
        Logger.progressStopError(this, this.getErrorMessage(packageInfo.pkg, errorResponse.response.data.error.message))
      })
      // tslint:disable-next-line:no-unused
    }))
      .then(() => {}).catch(() => {})
      . finally(() => {
        Logger.success(this, this.getFinalMessage({
          count: packagesResolved,
          dependencyCount,
          size,
          gzip
        }))
      })

  }

  private getFinalMessage(data: any) {
    return `\n${chalk.magenta('Total')} [${chalk.cyan(data.count + ' packages resolved')}]  has ${data.dependencyCount} dependencies with size of ${Bundlephobia.getSize(data.size)}(${Bundlephobia.getSize(data.gzip)} gzipped)`
  }

  private getSuccessMessage(data: any) {
    return `${chalk.magenta(data.name)}@${chalk.cyan(data.version)} has ${data.dependencyCount} dependencies with size of ${Bundlephobia.getSize(data.size)}(${Bundlephobia.getSize(data.gzip)} gzipped)`
  }

  private convertObjectToArray(jsobObject: any) {
    return Object.keys(jsobObject).map(key => {
      return `${key}@${jsobObject[key]}`
    })
  }
}
