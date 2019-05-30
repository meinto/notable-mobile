import React from 'react'
import styled from 'styled-components/native'
import Markdown from 'react-native-markdown-renderer'
import { File } from '../../filesystem/file'
import { Navigation } from 'react-native-navigation'
import { setTopBarIcon } from '../../navigation/actions'
import { Root } from '../Root'

const Text = styled.Text``
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
      topBar: {
        title: {
          text: 'Notiz',
          color: '#efefef',
        },
        background: {
          color: '#333',
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
      setTopBarIcon(this.props.componentId, 'right', 'preview-mode', 'check', 30, '#efefef')
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
        <Text>{this.file.header.toString()}</Text>
        {this.state.editMode ? (
          <TextInput
            multiline
            style={{ flex: 1, padding: 20 }}
            value={this.state.value}
            onChangeText={this.updateContent}
          />
        ) : (
          <ScrollView>
            <Markdown>{this.state.value}</Markdown>
          </ScrollView>
        )}
      </Root>
    )
  }
}
