import React from 'react'
import { observer, inject } from 'mobx-react'
import { BackHandler, PermissionsAndroid, Platform } from 'react-native'
import styled from 'styled-components/native'
import { Root } from '../Root'
import { Directory } from '../../filesystem/Directory'
import { dismissOverlay } from '../../navigation/actions'
import { List, TouchableListRow } from '../../components/List'
import { GhostTextButton } from '../../components/Button'
import { Text } from '../../components/Text'
import { i18n } from '../../language/i18n'

const TopNavigationContainer = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-color: #ccc;
  background-color: #20272c;
`
const PathText = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;
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

@inject('directoryContext')
@observer
export class FolderSelect extends React.PureComponent<FolderSelectProps, FolderSelectState> {

  static options() {
    return {
      layout: {
        orientation: ['portrait'],
      },
    }
  }

  backHandler: any

  constructor(props: FolderSelectProps) {
    super(props)

    this.state = {
      dir: new Directory(Directory.rootDirPath()),
      rows: [],
    }
  }

  componentDidMount() {
    this.androidReadFilesystemPermission()

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (Directory.rootDirPath() !== this.state.dir.getPath()) {
        this.navigateUp()
      } else {
        dismissOverlay(this.props.componentId)
      }
      return true
    })
    this.fetchDirPaths()
  }

  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove()
    }
  }

  androidReadFilesystemPermission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: i18n.t('permissions.read.title'),
          message: i18n.t('permissions.read.message'),
          buttonNegative: i18n.t('permissions.cancel'),
          buttonPositive: i18n.t('permissions.ok'),
        },
      ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.fetchDirPaths()
          this.androidWriteFilesystemPermission()
        } else {
          BackHandler.exitApp()
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  androidWriteFilesystemPermission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: i18n.t('permissions.write.title'),
          message: i18n.t('permissions.write.message'),
          buttonNegative: i18n.t('permissions.cancel'),
          buttonPositive: i18n.t('permissions.ok'),
        },
      ).then((granted) => {
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          BackHandler.exitApp()
        }
      }).catch((err) => {
        console.log(err)
      })
    }
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
            <GhostTextButton
              dark
              key={'navigate-up'}
              onPress={this.navigateUp}
            >
              {i18n.t('folderSelect.back')}
            </GhostTextButton>
          )}
          <PathText>
            {`${i18n.t('folderSelect.folder')}: ${this.state.dir.getShortPath()}`}
          </PathText>
          <GhostTextButton
            dark
            key={'select-folder'}
            onPress={() => {
              this.props.directoryContext.setDir(this.state.dir.getPath(), () => {
                dismissOverlay(this.props.componentId)
              })
            }}
          >
              {i18n.t('folderSelect.select')}
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
