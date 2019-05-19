import React from 'react'
import { Text } from 'react-native'
import Markdown from 'react-native-simple-markdown'

export class Note extends React.PureComponent {

  render() {
    return (
      <Markdown>
        # Markdown in react-native is so cool! {'\n\n'}

        You can **emphasize** what you want, or just _suggest it_ 😏…{'\n'}
      </Markdown>
    )
  }
}