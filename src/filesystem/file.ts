import fs from 'react-native-fs'

export class File {

  static create = (filePath: string) => {
    fs.writeFile(filePath, '', 'utf8')
      .catch((e) => {
        console.warn(e)
      })
  }

  path: string

  constructor(path: string) {
    this.path = path
  }

  getPath = (): string => {
    return this.path
  }

}
