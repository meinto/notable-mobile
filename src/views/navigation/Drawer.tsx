import React from 'react'
import styled from 'styled-components/native'
import { Root } from '../Root'
import { showOverlay, closeDrawer } from '../../navigation/actions'
import { TouchableListRow } from '../../components/List'

const Container = styled.View`
  background-color: white;
  flex: 1;
`

const Text = styled.Text``

const FolderSelectBtn = styled.TouchableHighlight``

type DrawerProps = {
  componentId: string,
}

export class Drawer extends React.PureComponent<DrawerProps> {
  render() {
    return (
      <Root>
        <Container>
          <TouchableListRow
            onPress={() => {
              showOverlay('folderSelect')
              closeDrawer(this.props.componentId)
            }}
          >
            <Text>Notable Ordner auswählen</Text>
          </TouchableListRow>
        </Container>
      </Root>
    )
  }
}
