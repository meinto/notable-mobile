import React, {Component} from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { FolderSelect } from './folderSelect/FolderSelect'
import { PageWrapper } from '../components/PageWrapper'

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <PageWrapper>
        </PageWrapper>
      </SafeAreaView>
    );
  }
}