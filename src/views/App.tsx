import React, {Component} from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
var RNFS = require('react-native-fs');
import { Note } from './note/Note'

const PageWrapper = styled.View`
  flex: 1;
  padding: 20px;
`

export default class App extends Component {

  componentDidMount() {
    this.listDirTest()
  }

  listDirTest = () => {
    RNFS.readDir(RNFS.MainBundlePath)
    .then((result) => {
      console.log('GOT RESULT', result);
  
      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }
  
      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

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