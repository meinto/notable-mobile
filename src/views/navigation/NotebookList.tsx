import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { observer, inject } from 'mobx-react'

import { TouchableListRow } from '../../components/List'
import { Text } from '../../components/Text'
import { Touchable } from '../../components/Button'
import { closeDrawer } from '../../navigation/actions'
import { Notebook } from '../../note/Notebook'

const Container = styled.View``

const IconContainer = styled.View`
  padding: 20px;
`

type NotebookListProps = {
  rootNotebook: Notebook,
  level: number,
  drawerComponentId: string,
  filterContext?: {
    activeNotebook: string,
    setActiveNotebook: Function,
  },
}

type NotebookListState = {
  closed: boolean,
}

@inject('filterContext')
@observer
export class NotebookList extends React.Component<NotebookListProps, NotebookListState> {

  static defaultProps = {
    level: 0,
  }

  constructor(props: NotebookListProps) {
    super(props)

    this.state = {
      closed: props.level > 0,
    }
  }

  hasChildren = () => {
    const { rootNotebook } = this.props
    return rootNotebook.getChildren().length > 0
  }

  renderIcon = () => {
    const { rootNotebook } = this.props
    if (rootNotebook.getPath() === 'Notebooks') {
      return <IconContainer><Icon name="book" size={20} color="#000" /></IconContainer>
    }
  }

  renderExpansionControl = () => {
    const { rootNotebook, level } = this.props
    let iconComponent = null
    if (rootNotebook.hasChildren() && this.state.closed === true) {
      iconComponent = <Icon name="chevron-right" size={20} color="#000" />
    }
    if (rootNotebook.hasChildren() && this.state.closed === false) {
      iconComponent = <Icon name="expand-more" size={20} color="#000" />
    }
    return level > 0 && iconComponent && (
      <Touchable onPress={() => {
        this.setState({
          closed: !this.state.closed,
        })
      }}>
        <IconContainer>
          {iconComponent}
        </IconContainer>
      </Touchable>
    )
  }

  render() {
    const { rootNotebook, level, drawerComponentId } = this.props
    const { activeNotebook, setActiveNotebook } = this.props.filterContext!

    return (
      <Container>
        <TouchableListRow
          onPress={() => {
            setActiveNotebook(rootNotebook.getPath())
            closeDrawer(drawerComponentId)
          }}
          active={activeNotebook === rootNotebook.getPath()}
          key={rootNotebook.getName()}
          before={this.renderExpansionControl() || this.renderIcon()}
          beforeIndent={40 * (level - 1)}
        >
          <Text>{rootNotebook.getName()}</Text>
        </TouchableListRow>
        {!this.state.closed && rootNotebook.getChildren().map((child: Notebook) => (
          <NotebookList
            key={child.getName()}
            level={level + 1}
            drawerComponentId={drawerComponentId}
            filterContext={this.props.filterContext}
            rootNotebook={child}
          />
        ))}
      </Container >
    )
  }
}
