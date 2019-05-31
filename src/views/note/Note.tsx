import React from 'react'
import styled from 'styled-components/native'
import Markdown from 'react-native-markdown-renderer'
import { material } from 'react-native-typography'
import { File } from '../../filesystem/file'
import { Navigation } from 'react-native-navigation'
import { setTopBarIcon } from '../../navigation/actions'
import { Root } from '../Root'
import { Text } from '../../components/Text'
import { Platform } from 'react-native'

const TextInput = styled.TextInput`
  text-align-vertical: top;
`
const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
  },
})``

type NoteProps = {
  filePath: string,
  componentId: string,
}

type NoteState = {
  value: string,
  editMode: boolean,
}

export class Note extends React.PureComponent<NoteProps, NoteState> {

  static options() {
    return {
      statusBar: {
        backgroundColor: '#20272c',
      },
      topBar: {
        title: {
          text: 'Notiz',
          color: '#efefef',
        },
        background: {
          color: '#20272c',
        },
        backButton: {
          color: 'white',
        },
      },
    }
  }

  file: File
  state: NoteState = {
    value: '',
    editMode: false,
  }

  constructor(props: NoteProps) {
    super(props)
    this.file = new File(props.filePath)
    this.file.loadContent()
      .then((value) => {
        this.setState({
          value,
        })
      })

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: this.file.getName(),
        },
      },
    })

    Navigation.events().bindComponent(this)
    this.setTopBarButtons()
  }

  navigationButtonPressed({ buttonId }: { buttonId: string }) {
    switch (buttonId) {
      case 'edit-mode':
        this.setState({
          editMode: true,
        })
        break
      case 'preview-mode':
        this.setState({
          editMode: false,
        })
        break
    }
    this.setTopBarButtons()
  }

  setTopBarButtons = () => {
    if (this.state.editMode) {
      setTopBarIcon(this.props.componentId, 'right', 'preview-mode', 'mode-edit', 30, '#ef6c00')
    } else {
      setTopBarIcon(this.props.componentId, 'right', 'edit-mode', 'mode-edit', 30, '#efefef')
    }
  }

  componentWillUnmount() {
    this.file.saveChanges()
  }

  updateContent = (value: string) => {
    this.setState({
      value,
    },            () => this.file.updateContent(value))
  }

  render() {
    return (
      <Root>
        {/* <Text>{this.file.header.toString()}</Text> */}
        {this.state.editMode ? (
          <TextInput
            multiline
            style={{
              flex: 1,
              padding: 20,
              color: 'black',
              fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
            }}
            value={this.state.value}
            onChangeText={this.updateContent}
          />
        ) : (
          <ScrollView>
            <Markdown style={{
              text: {
                color: 'black',
              },
              heading: {
                ...material.headline,
                marginTop: 20,
                marginBottom: 20,
              },
            }}>{this.state.value}</Markdown>
          </ScrollView>
        )}
      </Root>
    )
  }
}
