import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'

const Touchable = styled.TouchableHighlight.attrs({
  underlayColor: '#eee',
})`
  border-radius: 4px;
`

export const List = styled.ScrollView``

const ListRowContainer = styled.View`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`

const ListRowLine = styled.View`
  height: 1px;
  margin-top: 20px;
  background-color: #ccc;
`

type ListRowProps = {
  children: any,
}

export class ListRow extends React.PureComponent<ListRowProps> {
  render() {
    const { children } = this.props
    return (
      <ListRowContainer>
        {children}
        <ListRowLine />
      </ListRowContainer>
    )
  }
}

type TouchableListRowProps = {
  children: any,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
}

export class TouchableListRow extends React.PureComponent<TouchableListRowProps> {
  render() {
    const { children, onPress } = this.props
    return (
      <Touchable onPress={onPress}>
        <ListRow>
          {children}
        </ListRow>
      </Touchable>
    )
  }
}
