import React from 'react'
import styled from 'styled-components/native'
import { observer, inject } from 'mobx-react'
import { closeDrawer } from '../../navigation/actions'
import { Notebook } from '../../note/Notebook'
import { TouchableListRow } from '../../components/List'
import { Text } from '../../components/Text'

const Container = styled.View`
  padding-left: 20px;
`

interface NotebookListProps {
  rootNotebook: Notebook,
  drawerComponentId: string,
  filterContext?: {
    activeNotebook: string,
    setActiveNotebook: Function,
  },
}

@inject('filterContext')
@observer
export class NotebookList extends React.Component<NotebookListProps> {

  hasChildren = () => {
    const { rootNotebook } = this.props
    return rootNotebook.getChildren().length > 0
  }

  render() {
    const { rootNotebook, drawerComponentId } = this.props
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
          <Text>{rootNotebook.getName()}</Text>
        </TouchableListRow>
    {rootNotebook.getChildren().map((child: Notebook) => (
          <NotebookList
            key={child.getName()}
            drawerComponentId={drawerComponentId}
            filterContext={this.props.filterContext}
            rootNotebook={child}
          />
        ))}
      </Container >
    )
  }
}
