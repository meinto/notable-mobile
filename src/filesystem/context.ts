import { observable, action } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'
import { Directory } from './directory'
import { File } from './file'

type DirectoryContextDefault = {
  dir: Directory,
  dirPath: string,
  fileList: File[],
  initialized: boolean,
  setDir: (dir: string, success: Function) => void,
}

class DirectoryContext {

  static DB_DIR_KEY: string = '@notable_dir'

  @observable dir = new Directory('')
  @observable dirPath = ''
  @observable fileList = []
  @observable initialized = false

  constructor() {
    AsyncStorage.getItem(DirectoryContext.DB_DIR_KEY)
      .then((dirPath) => {
        if (dirPath !== null) {
          this.updateDir(dirPath)
        } else {
          this.initialize()
        }
      })
      .catch((e) => {
        this.initialize()
      })
  }

  @action
  setDir = (dirPath: string, success: Function) => {
    AsyncStorage.setItem(DirectoryContext.DB_DIR_KEY, dirPath)
      .then(() => {
        this.updateDir(dirPath)
        success()
      })
      .catch((e) => {
        console.warn(e)
      })
  }

  initialize = () => {
    this.initialized = true
  }

  updateDir = (dirPath: string) => {
    this.dirPath = dirPath,
    this.dir = new Directory(dirPath),
    this.initialized = true
    this.updateFileList()
  }

  updateFileList = () => {
    this.dir.getFileList()
      .then((fileList) => {
        this.fileList = fileList
      })
  }
}

export const directoryContext = new DirectoryContext()
