import React from 'react'
import styled from 'styled-components/native'
import { observer, inject } from 'mobx-react'
import { closeDrawer } from '../../navigation/actions'
import { Notebook } from '../../note/Notebook'
import { TouchableListRow } from '../../components/List'
import { Text } from '../../components/Text'

const Container = styled.View``

const Intent = styled.View<{level: number}>`
  ${props => props.level && `padding-left: ${20 * props.level}px;`}
`

interface NotebookListProps {
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

  hasChildren = () => {
    const { rootNotebook } = this.props
    return rootNotebook.getChildren().length > 0
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
          <Intent level={level}>
            <Text>{rootNotebook.getName()}</Text>
          </Intent>
        </TouchableListRow>
    {rootNotebook.getChildren().map((child: Notebook) => (
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
