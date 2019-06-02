import React from 'react'
import styled from 'styled-components/native'
import { Notebook } from '../../note/Notebook'
import { TouchableListRow } from '../../components/List'
import { Text } from '../../components/Text'

const Container = styled.View`
  padding-left: 20px;
`

type NotebookListProps = {
  rootNotebook: Notebook,
}

export class NotebookList extends React.PureComponent<NotebookListProps> {

  hasChildren = () => {
    const { rootNotebook } = this.props
    return rootNotebook.getChildren().length > 0
  }

  render() {
    const { rootNotebook } = this.props

    return (
      <Container>
        <TouchableListRow key={rootNotebook.getName()}>
          <Text>{rootNotebook.getName()}</Text>
        </TouchableListRow>
        {rootNotebook.getChildren().map((child: Notebook) => (
          <NotebookList key={child.getName()} rootNotebook={child}/>
        ))}
      </Container>
    )
  }
}
