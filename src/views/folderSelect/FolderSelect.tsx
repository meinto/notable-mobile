import React from 'react'
import fs from 'react-native-fs'
import styled from 'styled-components/native'

type FolderSelectState = {
  readonly rootPath: string,
  readonly rows: Array<string>,
}

const TouchableRow = styled.TouchableHighlight.attrs()`
  padding: 10px;
`

const Text = styled.Text``

export class FolderSelect extends React.PureComponent<{}, FolderSelectState> {

  constructor(props: object) {
    super(props)

    this.state = {
      rootPath: fs.DocumentDirectoryPath,
      rows: []
    }
  }

  componentDidMount() {
    this.fetchDirs(this.state.rootPath)
  }

  navigate = (path: string) => {
    this.setState({
      rootPath: path,
      rows: []
    })
    this.fetchDirs(path)
  }

  navigateUp = () => {
    const parentPath = this.state.rootPath
      .split('/')
      .slice(0, -1)
      .join('/')
    this.navigate(parentPath)
  }

  fetchDirs = (path: string) => {
    return fs.readDir(path)
      .then((result) => {
        this.setState({
          rows: result
            .filter(r => r.isDirectory())
            .map(folder => folder.path)
        })
      })
  }

  createFolder = (folderName: string) => {
    const currentDir = this.state.rootPath
    fs.mkdir(currentDir + '/test')
    this.fetchDirs(this.state.rootPath)
  }

  getFolderName = (path: string) => {
    return path.replace(this.state.rootPath, '')
  }

  render() {
    return [
      fs.DocumentDirectoryPath != this.state.rootPath && (
        <TouchableRow key={'navigate-up'} onPress={this.navigateUp}>
          <Text>Zurück</Text>
        </TouchableRow>
      ), 
      this.state.rows.map((path: string) => (
        <TouchableRow
          key={`folder-${path}`}
          onPress={() => this.navigate(path)}
        >
          <Text>{this.getFolderName(path)}</Text>
        </TouchableRow>
      )),
      <TouchableRow key={'create-folder'} onPress={this.createFolder}>
        <Text>Anlegen</Text>
      </TouchableRow>
    ]
  }
}