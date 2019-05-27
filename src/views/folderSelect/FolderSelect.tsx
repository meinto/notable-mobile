import React from 'react'
import styled from 'styled-components/native'
import { Root } from '../Root'
import { Directory } from '../../filesystem/directory'
import { dismissOverlay } from '../../navigation/actions'

const TouchableRow = styled.TouchableHighlight`
  padding: 10px;
`

const Text = styled.Text``

type FolderSelectProps = {
  componentId: string,
  directoryContext: {
    setDir: Function,
  },
}

type FolderSelectState = {
  readonly dir: Directory,
  readonly rows: string[],
}

export class FolderSelect extends React.PureComponent<FolderSelectProps, FolderSelectState> {

  constructor(props: FolderSelectProps) {
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
    const path = this.state.dir.getParentPath()
    this.navigate(path)
  }

  createFolder = () => {
    const currentDir = this.state.dir.getPath()
    Directory.mkdir(`${currentDir}/test`)
    this.fetchDirPaths()
  }

  fetchDirPaths = () => {
    this.state.dir.getDirListPaths().then((paths) => {
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

        <TouchableRow key={'select-folder'} onPress={() => {
          this.props.directoryContext.setDir(this.state.dir.getPath(), () => {
            dismissOverlay(this.props.componentId)
          })
        }}>
          <Text>Auswählen</Text>
        </TouchableRow>
      </Root>
    )
  }
}
