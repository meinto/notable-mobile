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
  margin-bottom: -1px;
  ${props => props.active && 'background-color: #ccc;'}
`

const ListRowBeforeAfterContainer = styled.View<{beforeIndent: number}>`
  flex-direction: row;
  ${props => props.beforeIndent && `padding-left: ${props.beforeIndent}px;`}
`

const ListRowContentContainer = styled.View<{before: any}>`
  flex-direction: row;
  padding-top: 20px;
  ${props => !props.before && 'padding-left: 20px;'}
  padding-right: 20px;
  padding-bottom: 20px;
`

const ListRowLine = styled.View`
  height: 1px;
  background-color: #ccc;
  margin-right: 20px;
  margin-left: 20px;
`

type ListRowProps = {
  children: any,
  before: any,
  beforeIndent: number,
  active: boolean,
}

export class ListRow extends React.PureComponent<ListRowProps> {
  render() {
    const {
      children,
      active,
      before,
      beforeIndent,
    } = this.props
    return (
      <ListRowContainer active={active}>
        <ListRowBeforeAfterContainer beforeIndent={beforeIndent}>
          {before}
          <ListRowContentContainer before={before}>
            {children}
          </ListRowContentContainer>
        </ListRowBeforeAfterContainer>
        <ListRowLine />
      </ListRowContainer>
    )
  }
}

type TouchableListRowProps = {
  children: any,
  before: any,
  beforeIndent: number,
  active: boolean,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
}

export class TouchableListRow extends React.PureComponent<TouchableListRowProps> {
  static defaultProps = {
    active: false,
    before: null,
    beforeIndent: 0,
  }

  render() {
    const { children, onPress, active, before, beforeIndent } = this.props
    return (
      <Touchable onPress={onPress}>
        <ListRow
          active={active}
          before={before}
          beforeIndent={beforeIndent}
        >
          {children}
        </ListRow>
      </Touchable>
    )
  }
}
