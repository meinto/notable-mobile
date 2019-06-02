import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import Markdown from 'react-native-markdown-renderer'
import { material } from 'react-native-typography'
import { getNote, saveNote } from '../../filesystem/file'
import { Note } from '../../note/Note'
import { Navigation } from 'react-native-navigation'
import { setTopBarIcon } from '../../navigation/actions'
import { Root } from '../Root'

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

export class NoteDetail extends React.PureComponent<NoteProps, NoteState> {

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

  note: Note | null = null
  state: NoteState = {
    value: '',
    editMode: false,
  }

  constructor(props: NoteProps) {
    super(props)
    getNote(props.filePath).then((content: string) => {
      console.log(content)
      this.note = new Note(content, props.filePath)
      this.setState({
        value: this.note.content.toString(),
      })

      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          title: {
            text: this.note.header.getTitle(),
          },
        },
      })
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
    if (this.note) {
      saveNote(this.props.filePath, this.note.toString())
    }
  }

  updateContent = (value: string) => {
    this.setState({
      value,
    },            () => {
      if (this.note) {
        this.note.content.update(value)
      }
    })
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
