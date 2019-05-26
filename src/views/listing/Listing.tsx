import React, { PureComponent } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import { Navigation } from 'react-native-navigation'
import { Root } from '../Root'
import { push, showOverlay, openDrawer } from '../../navigation/actions'
import { DirectoryConsumer } from '../../filesystem/context'

const Loading = styled.Text``

type ListingProps = {
  componentId: string,
}

export class Listing extends PureComponent<ListingProps> {

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
    Icon.getImageSource('add', 30, '#efefef').then((icon) => {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          rightButtons: [
            {
              icon,
              id: 'add-note',
            },
          ],
        },
      })
    })

    Icon.getImageSource('menu', 30, '#efefef').then((icon) => {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          leftButtons: [
            {
              icon,
              id: 'menu',
            },
          ],
        },
      })
    })

    Navigation.events().bindComponent(this)
  }

  navigationButtonPressed({ buttonId }: { buttonId: string }) {
    console.warn(buttonId)
    switch (buttonId) {
      case 'add-note':
        push(this.props.componentId, 'note')
        break
      case 'menu':
        openDrawer(this.props.componentId)
        break
    }
  }

  render() {
    return (
      <Root>
        <DirectoryConsumer>
          {({ dir, initialized }) => {
            if (initialized &&  dir.getPath() === '') {
              showOverlay('folderSelect')
            }

            if (initialized && dir.getPath() !== '') {
              return <Loading>{JSON.stringify(dir.fileListPaths())}</Loading>
            }

            return <Loading>Loading</Loading>
          }}
        </DirectoryConsumer>
      </Root>
    )
  }
}
