// tslint:disable-next-line:file-name-casing
import * as fs from 'fs'

export const getStringFromFile = (object: any, filePath: string) => {
  let fileStr = ''
  if (!fs.existsSync(filePath)) {
    object.error('reading File') // this will output error and exit command
  } else {
    fileStr = fs.readFileSync(filePath, 'utf8')

      // TODO: fix this Issue #3
    if (fileStr.charAt(fileStr.length - 1) === '\n') {
      fileStr = fileStr.substring(0, fileStr.length - 1)
    }
  }
  return fileStr
}
