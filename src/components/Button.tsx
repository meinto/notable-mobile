import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'

const Touchable = styled.TouchableHighlight.attrs({
  underlayColor: '#eee',
})`
  border-radius: 4px;
`

const GhostButtonContainer = styled.View`
  border: 1px;
  border-color: #ccc;
  border-radius: 4px;
  padding: 10px 20px;
`

type GhostButtonProps = {
  children: any,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
}

export class GhostButton extends React.PureComponent<GhostButtonProps> {
  render() {
    const { children, onPress } = this.props
    return (
      <Touchable onPress={onPress}>
        <GhostButtonContainer>
          {children}
        </GhostButtonContainer>
      </Touchable >
    )
  }
}

const GhostTextButtonContainer = styled.Text``

type GhostTextButtonProps = {
  children: string,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
}

export class GhostTextButton extends React.PureComponent<GhostTextButtonProps> {
  render() {
    const { children, onPress } = this.props
    return (
      <GhostButton onPress={onPress}>
        <GhostTextButtonContainer>
          {children}
        </GhostTextButtonContainer>
      </GhostButton>
    )
  }
}
