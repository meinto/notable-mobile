import React from 'react'
import { SafeAreaView } from 'react-native'
import { PageWrapper } from '../components/PageWrapper'
import { DirectoryProvider } from '../filesystem/context'

export class Root extends React.PureComponent {

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <PageWrapper>
          {this.props.children}
        </PageWrapper>
      </SafeAreaView>
    )
  }
}
