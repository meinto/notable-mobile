import React from 'react'
import styled from 'styled-components/native'
import { Root } from '../Root'
import { DirectoryConsumer } from '../../filesystem/context'
import { Directory } from '../../filesystem/directory'
import { dismissOverlay } from '../../navigation/actions'

type FolderSelectState = {
  readonly dir: Directory,
  readonly rows: string[],
}

const TouchableRow = styled.TouchableHighlight`
  padding: 10px;
`

const Text = styled.Text``

export class FolderSelect extends React.PureComponent<Object, FolderSelectState> {

  constructor(props: Object) {
    super(props)

    this.state = {
      dir: new Directory(Directory.rootDirPath()),
      rows: [],
    }
  }

  componentDidMount() {
    this.fetchDirPaths()
  }

  navigate = (path: string) => {
    this.setState({
      dir: new Directory(path),
      rows: [],
    },            () => {
      this.fetchDirPaths()
    })
  }

  navigateUp = () => {
    const path = this.state.dir.parentPath()
    this.navigate(path)
  }

  createFolder = () => {
    const currentDir = this.state.dir.getPath()
    Directory.mkdir(`${currentDir}/test`)
    this.fetchDirPaths()
  }

  fetchDirPaths = () => {
    this.state.dir.dirListPaths().then((paths) => {
      this.setState({
        rows: paths,
      })
    })
  }

  getFolderName = (path: string) => {
    return path.replace(this.state.dir.getPath(), '')
  }

  render() {
    return (
      <Root>
        {Directory.rootDirPath() !== this.state.dir.getPath() && (
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
              setDir(this.state.dir.getPath(), () => {
                dismissOverlay('folderSelect')
              })
            }}>
              <Text>Auswählen</Text>
            </TouchableRow>
          )}
        </DirectoryConsumer>
      </Root>
    )
  }
}
