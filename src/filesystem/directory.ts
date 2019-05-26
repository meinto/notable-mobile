import fs from 'react-native-fs'

export class Directory {

  static rootDirPath = (): string => {
    return fs.DocumentDirectoryPath
  }

  static mkdir = (path: string): void => {
    fs.mkdir(path)
  }

  path: string

  constructor(path: string) {
    this.path = path
  }

  getPath = (): string => {
    return this.path
  }

  getParentPath = (): string => {
    return this.path
      .split('/')
      .slice(0, -1)
      .join('/')
  }

  getDirList = (): Promise<Directory[]> => {
    return this.getDirListPaths()
      .then(paths => paths.map(path => new Directory(path)))
  }

  getDirListPaths = (): Promise<string[]> => {
    return fs.readDir(this.path)
      .then((result) => {
        return result
          .filter(r => r.isDirectory())
          .map(folder => folder.path)
      })
  }

  getFileListPaths = (): Promise<string[]> => {
    return fs.readDir(this.path)
      .then((result) => {
        return result
          .filter(r => !r.isDirectory())
          .map(file => file.path)
      })
  }
}
