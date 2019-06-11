import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'

const Touchable = styled.TouchableHighlight.attrs({
  underlayColor: '#eee',
})`
  border-radius: 4px;
`

export const List = styled.ScrollView``

type ListRowContainerProps = {
  active: boolean,
}

const ListRowContainer = styled.View<ListRowContainerProps>`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: -1px;
  ${props => props.active && 'background-color: #ccc;'}
`

const ListRowContentContainer = styled.View`
  flex-direction: row;
`

const ListRowLine = styled.View`
  height: 1px;
  margin-top: 20px;
  background-color: #ccc;
`

type ListRowProps = {
  children: any,
  active: boolean,
}

export class ListRow extends React.PureComponent<ListRowProps> {
  render() {
    const { children, active } = this.props
    return (
      <ListRowContainer active={active}>
        <ListRowContentContainer>
          {children}
        </ListRowContentContainer>
        <ListRowLine />
      </ListRowContainer>
    )
  }
}

type TouchableListRowProps = {
  children: any,
  active: boolean,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
}

export class TouchableListRow extends React.PureComponent<TouchableListRowProps> {
  static defaultProps = {
    active: false,
  }

  render() {
    const { children, onPress, active } = this.props
    return (
      <Touchable onPress={onPress}>
        <ListRow active={active}>
          {children}
        </ListRow>
      </Touchable>
    )
  }
}
