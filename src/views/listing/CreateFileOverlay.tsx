import React from 'react'
import styled from 'styled-components/native'
import { BackHandler } from 'react-native'
import { Root } from '../Root'
import { GhostTextButton } from '../../components/Button'
import { dismissOverlay, push } from '../../navigation/actions'
import { createFile } from '../../filesystem/file'
import { observer, inject } from 'mobx-react'
import { i18n } from '../../language/i18n'

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
  directoryContext: {
    updateNoteList: Function,
  },
}

@inject('directoryContext')
@observer
export class CreateFileOverlay extends React.Component<CreateFileOverlayProps> {

  backHandler: any
  state = {
    title: '',
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      dismissOverlay(this.props.componentId)
      return true
    })
  }

  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove()
    }
  }

  cancel = () => {
    dismissOverlay(this.props.componentId)
  }

  create = () => {
    const title = this.state.title
    if (title.trim().length > 0) {
      const filePath = `${this.props.dirPath}/${title}.md`
      createFile(filePath)
        .then(() => {
          push(this.props.parentComponentId, 'note', {
            filePath,
          })
          this.props.directoryContext.updateNoteList()
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
        withPadding
        justifyContent={'center'}
      >
        <Background onPress={this.cancel}>
          <BackgroundColor />
        </Background>
        <DialogContainer>
          <TitleInput
            placeholder={i18n.t('createNoteOverlay.titleOfNote')}
            value={this.state.title}
            onChangeText={this.onChange}
          />
          <ButtonContainer>
            <GhostTextButton onPress={this.cancel}>
              {i18n.t('createNoteOverlay.cancel')}
            </GhostTextButton>
            <GhostTextButton onPress={this.create}>
              {i18n.t('createNoteOverlay.create')}
            </GhostTextButton>
          </ButtonContainer>
        </DialogContainer>
      </Root>
    )
  }
}
