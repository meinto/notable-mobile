import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { observer, inject } from 'mobx-react'
import { closeDrawer } from '../../navigation/actions'
import { Notebook } from '../../note/Notebook'
import { TouchableListRow } from '../../components/List'
import { Text } from '../../components/Text'
import { Touchable } from '../../components/Button'

const Container = styled.View``

const Indent = styled.View<{level: number}>`
  flex-direction: row;
  ${props => props.level && `padding-left: ${40 * (props.level - 1)}px;`}
`

const IconContainer = styled.View`
  margin-top: -20px;
  margin-left: -20px;
  margin-bottom: -20px;
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

@inject('filterContext')
@observer
export class NotebookList extends React.Component<NotebookListProps> {

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
        >
          <Indent level={level}>
            {this.renderExpansionControl()}
            {this.renderIcon()}
            <Text>{rootNotebook.getName()}</Text>
          </Indent>
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
