import React, { PureComponent } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Directory } from './directory'

export const DirectoryContext = React.createContext({
  dir: new Directory(''),
  dirPath: '',
  initialized: false,
  setDir: (dir: string, success: Function) => {},
})

export class DirectoryProvider extends PureComponent {

  static DB_DIR_KEY: string = '@notable_dir'

  state = {
    dir: new Directory(''),
    dirPath: '',
    initialized: false,
    setDir: (dirPath: string, success: Function) => {
      AsyncStorage.setItem(DirectoryProvider.DB_DIR_KEY, dirPath)
        .then(() => {
          this.setState({
            dirPath,
            dir: new Directory(dirPath),
          })
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
          this.setState({
            dirPath,
            dir: new Directory(dirPath),
            initialized: true,
          })
        } else {
          this.setState({
            initialized: true,
          })
        }
      })
      .catch((e) => {
        this.setState({
          initialized: true,
        })
        console.warn(e)
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
