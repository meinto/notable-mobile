import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'

const ButtonTouchable = styled.TouchableHighlight.attrs({
  underlayColor: '#eee',
})`
  border-radius: 4px;
`

const GhostButtonContainer = styled.Text`
  border: 1px;
  border-color: #ccc;
  border-radius: 4px;
  padding: 10px 20px;
`

type GhostTextButtonProps = {
  children: string,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
}

export class GhostTextButton extends React.PureComponent<GhostTextButtonProps> {
  render() {
    const { children, onPress } = this.props
    return (
      <ButtonTouchable onPress={onPress}>
        <GhostButtonContainer>
          {children}
        </GhostButtonContainer>
      </ButtonTouchable >
    )
  }
}
