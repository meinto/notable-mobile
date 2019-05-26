import React from 'react'
import { Listing } from './Listing'
import { Providers } from '../Providers'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Navigation } from 'react-native-navigation'
import { DirectoryConsumer } from '../../filesystem/context'

type ListingContainerProps = {
  componentId: string,
}

export class ListingContainer extends React.PureComponent<ListingContainerProps> {

  constructor(props: ListingContainerProps) {
    super(props)
    this.loadTopBarIcons()
  }

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

  loadTopBarIcons = () => {
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
  }

  render() {
    return (
      <Providers>
        <DirectoryConsumer>
          {({ dir, fileList, initialized }) => {
            const context = { dir, fileList, initialized }
            return (
              <Listing
                {...this.props}
                {...context}
              />
            )
          }}
        </DirectoryConsumer>
      </Providers>
    )
  }
}
