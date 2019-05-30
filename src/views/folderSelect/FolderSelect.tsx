import React from 'react'
import styled from 'styled-components/native'
import { Root } from '../Root'
import { Directory } from '../../filesystem/directory'
import { dismissOverlay } from '../../navigation/actions'
import { List, TouchableListRow } from '../../components/List'
import { GhostTextButton } from '../../components/Button'
import { Text } from '../../components/Text'

const TopNavigationContainer = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-color: #ccc;
  background-color: #eee;
`
const PathText = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
`

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
        <TopNavigationContainer>
          {Directory.rootDirPath() !== this.state.dir.getPath() && (
            <GhostTextButton key={'navigate-up'} onPress={this.navigateUp}>
              Zurück
            </GhostTextButton>
          )}
          <PathText>{`Ordner: ${this.state.dir.getShortPath()}`}</PathText>
          <GhostTextButton key={'select-folder'} onPress={() => {
            this.props.directoryContext.setDir(this.state.dir.getPath(), () => {
              dismissOverlay(this.props.componentId)
            })
          }}>
              Auswählen
          </GhostTextButton>
        </TopNavigationContainer>
        <List>
          {this.state.rows.map((path: string) => (
            <TouchableListRow
              key={`folder-${path}`}
              onPress={() => this.navigate(path)}
            >
              <Text>{this.getFolderName(path)}</Text>
            </TouchableListRow>
          ))}
        </List>
      </Root>
    )
  }
}
