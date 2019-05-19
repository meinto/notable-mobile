import React from 'react'
import styled from 'styled-components/native'
import { DirectoryProvider, DirectoryConsumer } from '../../directory/context'
import { 
  rootDirPath, 
  fetchDirPaths, 
  mkdir,
  parentPath,
} from '../../directory/operations'
import { dismissOverlay } from '../../navigation/actions'

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
      rootPath: rootDirPath(),
      rows: []
    }
  }

  componentDidMount() {
    this.fetchDirPaths(this.state.rootPath)
  }

  navigate = (path: string) => {
    this.setState({
      rootPath: path,
      rows: []
    })
    this.fetchDirPaths(path)
  }

  navigateUp = () => {
    const path = parentPath(this.state.rootPath)
    this.navigate(path)
  }

  createFolder = (folderName: string) => {
    const currentDir = this.state.rootPath
    mkdir(currentDir + '/test')
    this.fetchDirPaths(this.state.rootPath)
  }

  fetchDirPaths = (path: string) => {
    fetchDirPaths(path).then(paths => {
      this.setState({ 
        rows: paths,
      })
    })
  }

  getFolderName = (path: string) => {
    return path.replace(this.state.rootPath, '')
  }

  render() {
    return (
      <DirectoryProvider>
        {rootDirPath() != this.state.rootPath && (
          <TouchableRow key={'navigate-up'} onPress={this.navigateUp}>
            <Text>Zurück</Text>
          </TouchableRow>
        )}

        {this.state.rows.map((path: string) => (
          <TouchableRow
            key={`folder-${path}`}
            onPress={() => this.navigate(path)}
          >
            <Text>{this.getFolderName(path)}</Text>
          </TouchableRow>
        ))}

        <TouchableRow key={'create-folder'} onPress={this.createFolder}>
          <Text>Anlegen</Text>
        </TouchableRow>
        
        <DirectoryConsumer>
          {({ setDir }) => (
            <TouchableRow key={'create-folder'} onPress={() => {
              setDir(this.state.rootPath)
              dismissOverlay('folderSelect')
            }}>
              <Text>Auswählen</Text>
            </TouchableRow>
          )}
        </DirectoryConsumer>
      </DirectoryProvider>
    )
  }
}