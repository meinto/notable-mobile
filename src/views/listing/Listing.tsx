import React, { PureComponent } from 'react'
import styled from 'styled-components/native'
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
  dir: Directory,
  fileList: File[],
  initialized: boolean,
}

export class Listing extends PureComponent<ListingProps> {

  constructor(props: ListingProps) {
    super(props)

    const { dir, initialized } = this.props
    if (initialized && dir.getPath() === '') {
      showOverlay('folderSelect')
    }

    this.loadTopBarIcons()
    this.navigationOptions()
    Navigation.events().bindComponent(this)
  }

  navigationOptions = () => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: 'Notizen',
          color: '#efefef',
        },
        background: {
          color: '#333',
        },
      },
    })
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
    const { dir, fileList, initialized } = this.props

    console.log({ dir, fileList, initialized })

    if (initialized && dir.getPath() !== '') {
      return fileList.map((file) => {
        return <Loading>{file.getPath()}</Loading>
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
