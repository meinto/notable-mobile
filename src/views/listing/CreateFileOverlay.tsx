import React from 'react'
import styled from 'styled-components/native'
import { Root } from '../Root'
import { GhostTextButton } from '../../components/Button'
import { dismissOverlay, push } from '../../navigation/actions'
import { File } from '../../filesystem/file'

const Background = styled.TouchableHighlight`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const BackgroundColor = styled.View`
  flex: 1;
  background-color: #333;
  opacity: .5;
`

const DialogContainer = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
`

const TitleInput = styled.TextInput`
  padding: 20px;
  margin-bottom: 20px;
  border: 1px;
  border-color: #ccc;
  border-radius: 4px;
`

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

type CreateFileOverlayProps = {
  componentId: string,
  parentComponentId: string,
  dirPath: string,
}

export class CreateFileOverlay extends React.PureComponent<CreateFileOverlayProps> {

  state = {
    title: '',
  }

  cancel = () => {
    dismissOverlay(this.props.componentId)
  }

  create = () => {
    const title = this.state.title
    if (title.trim().length > 0) {
      const filePath = `${this.props.dirPath}/${title}.md`
      File.create(filePath)
        .then(() => {
          push(this.props.parentComponentId, 'note', {
            filePath,
          })
          dismissOverlay(this.props.componentId)
        })
    }
  }

  onChange = (title: string) => {
    this.setState({
      title,
    })
  }

  render() {
    return (
      <Root
        transparent
        justifyContent={'center'}
      >
        <Background onPress={this.cancel}>
          <BackgroundColor />
        </Background>
        <DialogContainer>
          <TitleInput
            placeholder={'Title of note'}
            value={this.state.title}
            onChangeText={this.onChange}
          />
          <ButtonContainer>
            <GhostTextButton onPress={this.cancel}>{'Cancel'}</GhostTextButton>
            <GhostTextButton onPress={this.create}>{'Create'}</GhostTextButton>
          </ButtonContainer>
        </DialogContainer>
      </Root>
    )
  }
}
