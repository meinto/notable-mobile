import React, { PureComponent } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const DirectoryContext = React.createContext({
  dir: '',
  initialized: false,
  setDir: (dir: string, success: Function) => {},
})

export class DirectoryProvider extends PureComponent {

  static DB_DIR_KEY: string = '@notable_dir'

  state = {
    dir: '',
    initialized: false,
    setDir: (dir: string, success: Function) => {
      AsyncStorage.setItem(DirectoryProvider.DB_DIR_KEY, dir)
        .then(() => {
          this.setState({ dir })
          success()
        })
        .catch((e) => {
          console.warn(e)
        })
    },
  }

  componentDidMount() {
    AsyncStorage.getItem(DirectoryProvider.DB_DIR_KEY)
      .then((dir) => {
        this.setState({
          dir,
          initialized: true,
        })
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
