import React, {Component} from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { FolderSelect } from './folderSelect/FolderSelect'

const PageWrapper = styled.View`
  flex: 1;
  padding: 20px;
`

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <PageWrapper>
          <FolderSelect />
        </PageWrapper>
      </SafeAreaView>
    );
  }
}