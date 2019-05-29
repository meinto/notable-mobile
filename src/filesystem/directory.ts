import { Platform } from 'react-native'
import fs from 'react-native-fs'
import { File } from './file'

export class Directory {

  static rootDirPath = (): string => {
    if (Platform.OS === 'ios') {
      return fs.DocumentDirectoryPath
    }
    return fs.ExternalStorageDirectoryPath
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

  getFileList = (): Promise<File[]> => {
    return this.getFileListPaths()
      .then(paths => paths.map(path => new File(path)))
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
