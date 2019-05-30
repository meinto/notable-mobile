import React from 'react'
import { SafeAreaView } from 'react-native'
import { PageWrapper } from '../components/Page'

type RootProps = {
  transparent: boolean,
  withPadding: boolean,
  backgroundColor: string,
  justifyContent: string,
}

export class Root extends React.PureComponent<RootProps> {

  static defaultProps = {
    transparent: false,
    withPadding: false,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  }

  render() {
    const { transparent, backgroundColor, justifyContent, withPadding } = this.props
    const rootStyle = { backgroundColor, flex: 1 }
    if (transparent) rootStyle.backgroundColor = 'transparent'
    return (
      <SafeAreaView style={rootStyle}>
        <PageWrapper
          justifyContent={justifyContent}
          withPadding={withPadding}
        >
          {this.props.children}
        </PageWrapper>
      </SafeAreaView >
    )
  }
}
