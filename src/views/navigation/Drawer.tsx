import React from 'react'
import styled from 'styled-components/native'
import { showOverlay, closeDrawer } from '../../navigation/actions'

const Container = styled.View`
  padding-top: 100px;
  background-color: white;
  flex: 1;
`

const BtnText = styled.Text``

const FolderSelectBtn = styled.TouchableHighlight``

type DrawerProps = {
  componentId: string,
}

export class Drawer extends React.PureComponent<DrawerProps> {
  render() {
    return (
      <Container>
        <FolderSelectBtn
          onPress={() => {
            showOverlay('folderSelect')
            closeDrawer(this.props.componentId)
          }}
        >
          <BtnText>open folder select</BtnText>
        </FolderSelectBtn>
      </Container>
    )
  }
}
