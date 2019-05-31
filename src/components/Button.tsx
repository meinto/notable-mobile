import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'

type TouchableProps = {
  children: any,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  dark?: boolean,
}

const Touchable = styled.TouchableHighlight.attrs<TouchableProps>((props: TouchableProps) => ({
  underlayColor: props.dark ? '#000' : '#eee',
}))<TouchableProps>`
  border-radius: 4px;
`

type GhostButtonContainerProps = {
  dark?: boolean,
}

const GhostButtonContainer = styled.View<GhostButtonContainerProps>`
  border: 1px;
  border-color: ${props => props.dark ? '#000' : '#ccc'};
  border-radius: 4px;
  background-color: ${props => props.dark ? '333' : 'transparent'};
  padding: 10px 20px;
`

type GhostButtonProps = {
  children: any,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  dark?: boolean,
}

export class GhostButton extends React.PureComponent<GhostButtonProps> {
  render() {
    const { children, onPress, dark } = this.props
    return (
      <Touchable onPress={onPress} dark={dark}>
        <GhostButtonContainer dark={dark}>
          {children}
        </GhostButtonContainer>
      </Touchable >
    )
  }
}

type GhostTextButtonContainerProps = {
  dark?: boolean,
}

const GhostTextButtonContainer = styled.Text<GhostTextButtonContainerProps>`
  color: ${props => props.dark ? 'white' : 'black'};
`

type GhostTextButtonProps = {
  children: string,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  dark?: boolean,
}

export class GhostTextButton extends React.PureComponent<GhostTextButtonProps> {
  render() {
    const { children, onPress, dark } = this.props
    return (
      <GhostButton onPress={onPress} dark={dark}>
        <GhostTextButtonContainer dark={dark}>
          {children}
        </GhostTextButtonContainer>
      </GhostButton>
    )
  }
}
