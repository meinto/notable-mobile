import { Platform } from 'react-native'
import fs from 'react-native-fs'
import { getNote } from './file'
import { Note } from '../note/Note'

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

  getShortPath = (): string => {
    return this.path.replace(Directory.rootDirPath(), '')
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

  getNoteList = (): Promise<Note[]> => {
    return this.getFileListPaths()
      .then((paths: string[]) => {
        return Promise.all(
          paths.map((path) => {
            return getNote(path).then((content) => {
              return new Note(content, path)
            })
          }),
        )
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
