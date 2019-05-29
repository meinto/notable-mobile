import React from 'react'
import styled from 'styled-components/native'
import { observer } from 'mobx-react'
import { Navigation } from 'react-native-navigation'
import { Root } from '../Root'
import {
  push,
  showOverlay,
  openDrawer,
  setTopBarIcon,
} from '../../navigation/actions'
import { File } from '../../filesystem/file'
import { Directory } from '../../filesystem/directory'
import { List, TouchableListRow } from '../../components/List'

const Text = styled.Text``

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
      topBar: {
        title: {
          text: 'Notizen',
          color: '#efefef',
        },
        background: {
          color: '#333',
        },
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
            ><Text>{file.getName()}</Text></TouchableListRow>
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
