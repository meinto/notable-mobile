import React, { PureComponent } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Navigation } from 'react-native-navigation'
import { SafeAreaView } from 'react-native'
import { PageWrapper } from '../../components/PageWrapper'
import { push } from '../../navigation/actions'

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
  }

  navigationButtonPressed() {
    push(this.props.componentId, 'note')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <PageWrapper>
        </PageWrapper>
      </SafeAreaView>
    )
  }
}
