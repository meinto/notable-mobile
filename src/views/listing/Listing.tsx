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
        },
      },
    }
  }

  constructor(props: ListingProps) {
    super(props)
    Icon.getImageSource('add', 30, 'black').then((icon) => {
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
      Navigation.events().bindComponent(this)
    })

    Icon.getImageSource('menu', 30, 'black').then((icon) => {
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
      Navigation.events().bindComponent(this)
    })
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

  render() {
    return (
      <Root>
        <DirectoryConsumer>
          {({ dir, initialized }) => {
            if (initialized && dir === '') {
              showOverlay('folderSelect')
            }

            if (initialized && dir !== '') {
              return <Loading>{JSON.stringify(dir)}</Loading>
            }

            return <Loading>{dir}</Loading>
          }}
        </DirectoryConsumer>
      </Root>
    )
  }
}
