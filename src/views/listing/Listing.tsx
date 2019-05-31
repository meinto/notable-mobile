import React from 'react'
import { observer } from 'mobx-react'
import { Navigation } from 'react-native-navigation'
import { Root } from '../Root'
import {
  push,
  showOverlay,
  openDrawer,
  setTopBarIcon,
} from '../../navigation/actions'
import { File } from '../../filesystem/File'
import { Directory } from '../../filesystem/Directory'
import { List, TouchableListRow } from '../../components/List'
import { Text } from '../../components/Text'

type ListingProps = {
  componentId: string,
  directoryContext: {
    dir: Directory,
    fileList: File[],
    initialized: boolean,
  },
}

@observer
export class Listing extends React.Component<ListingProps> {

  static options() {
    return {
      statusBar: {
        backgroundColor: '#20272c',
      },
      topBar: {
        title: {
          text: 'Notizen',
          color: '#efefef',
        },
        background: {
          color: '#20272c',
        },
      },
      layout: {
        orientation: ['portrait'],
      },
    }
  }

  constructor(props: ListingProps) {
    super(props)

    const { dir, initialized } = this.props.directoryContext
    if (initialized && dir.getPath() === '') {
      showOverlay('folderSelect')
    }

    this.loadTopBarIcons()
    Navigation.events().bindComponent(this)
  }

  loadTopBarIcons = () => {
    setTopBarIcon(this.props.componentId, 'right', 'add-note', 'add', 30, '#efefef')
    setTopBarIcon(this.props.componentId, 'left', 'menu', 'menu', 30, '#efefef')
  }

  navigationButtonPressed({ buttonId }: { buttonId: string }) {
    switch (buttonId) {
      case 'add-note':
        const { dir } = this.props.directoryContext
        showOverlay('listing.createFileOverlay', {
          dirPath: dir.getPath(),
          parentComponentId: this.props.componentId,
        })
        break
      case 'menu':
        openDrawer(this.props.componentId)
        break
    }
  }

  renderFileList = () => {
    const { dir, fileList, initialized } = this.props.directoryContext

    if (initialized && dir.getPath() !== '') {
      return (
        <List>
          {fileList.map((file) => {
            return (
            <TouchableListRow
              key={file.getPath()}
              onPress={() => {
                push(this.props.componentId, 'note', {
                  filePath: file.getPath(),
                })
              }}
            ><Text>{file.header.getTitle()}</Text></TouchableListRow>
            )
          })}
        </List>
      )
    }

    return <Text>Loading</Text>
  }

  render() {
    return (
      <Root>
        {this.renderFileList()}
      </Root>
    )
  }
}
