import React, { PureComponent } from 'react'
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

export const DirectoryContext = React.createContext<DirectoryContextDefault>({
  dir: new Directory(''),
  dirPath: '',
  fileList: [],
  initialized: false,
  setDir: (dir: string, success: Function) => {},
})

export class DirectoryProvider extends PureComponent<Object, DirectoryContextDefault> {

  static DB_DIR_KEY: string = '@notable_dir'

  state = {
    dir: new Directory(''),
    dirPath: '',
    fileList: [],
    initialized: false,
    setDir: (dirPath: string, success: Function) => {
      AsyncStorage.setItem(DirectoryProvider.DB_DIR_KEY, dirPath)
        .then(() => {
          this.updateDir(dirPath)
          success()
        })
        .catch((e) => {
          console.warn(e)
        })
    },
  }

  componentDidMount() {
    AsyncStorage.getItem(DirectoryProvider.DB_DIR_KEY)
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

  componentWillReceiveProps(nextProps: Object, nextState: DirectoryContextDefault) {
    if (nextState.dirPath !== this.state.dirPath) {
      console.warn('update file list')
      this.updateFileList()
    }
  }

  initialize = () => {
    this.setState({
      initialized: true,
    })
  }

  updateDir = (dirPath: string) => {
    this.setState({
      dirPath,
      dir: new Directory(dirPath),
      initialized: true,
    },            () => {
      this.updateFileList()
    })
  }

  updateFileList = () => {
    this.state.dir.getFileList()
      .then((fileList) => {
        this.setState({
          fileList,
        })
      })
  }

  render() {
    return (
      <DirectoryContext.Provider value={this.state}>
        {this.props.children}
      </DirectoryContext.Provider>
    )
  }
}

export const DirectoryConsumer = DirectoryContext.Consumer
