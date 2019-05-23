import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { FolderSelect } from './FolderSelect'
import { PageWrapper } from '../../components/PageWrapper'

export class Overlay extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <PageWrapper>
          <FolderSelect />
        </PageWrapper>
      </SafeAreaView>
    )
  }
}
