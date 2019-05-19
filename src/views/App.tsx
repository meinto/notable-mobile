import React, {Component} from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { Note } from './note/Note'

const PageWrapper = styled.View`
  flex: 1;
  padding: 20px;
`

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <PageWrapper>
          <Note />
        </PageWrapper>
      </SafeAreaView>
    );
  }
}