import React from 'react'
import styled from 'styled-components/native'
import { Root } from '../Root'
import { showOverlay, closeDrawer } from '../../navigation/actions'
import { TouchableListRow } from '../../components/List'
import { H1, H2, Text } from '../../components/Text'
import { Wrapper } from '../../components/Page'

const Container = styled.View`
  background-color: white;
  flex: 1;
`

type DrawerProps = {
  componentId: string,
}

export class Drawer extends React.PureComponent<DrawerProps> {
  render() {
    return (
      <Root>
        <Container>
          <Wrapper>
            <H1>Notable Mobile</H1>
            <H2>(Unofficial)</H2>
          </Wrapper>
          <Wrapper>
            <H2>Notebooks</H2>
          </Wrapper>
          <Wrapper>
            <H2>Optionen</H2>
          </Wrapper>
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
