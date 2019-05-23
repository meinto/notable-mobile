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

  parentPath = (): string => {
    return this.path
      .split('/')
      .slice(0, -1)
      .join('/')
  }

  dirList = (): Promise<Directory[]> => {
    return this.dirListPaths()
      .then(paths => paths.map(path => new Directory(path)))
  }

  dirListPaths = (): Promise<string[]> => {
    return fs.readDir(this.path)
      .then((result) => {
        return result
          .filter(r => r.isDirectory())
          .map(folder => folder.path) 
      })
  }

  fileListPaths = (): Promise<string[]> => {
    return fs.readDir(this.path)
      .then((result) => {
        return result
          .filter(r => !r.isDirectory())
          .map(file => file.path)
      })
  }
}