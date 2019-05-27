import React, { PureComponent } from 'react'
import styled from 'styled-components/native'
import { observer, inject } from 'mobx-react'
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

const Loading = styled.Text``

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
        push(this.props.componentId, 'note')
        break
      case 'menu':
        openDrawer(this.props.componentId)
        break
    }
  }

  renderFileList = () => {
    const { dir, fileList, initialized } = this.props.directoryContext

    if (initialized && dir.getPath() !== '') {
      return fileList.map((file) => {
        return <Loading key={file}>{file.getPath()}</Loading>
      })
    }

    return <Loading>Loading</Loading>
  }

  render() {
    return (
      <Root>
        {this.renderFileList()}
      </Root>
    )
  }
}
