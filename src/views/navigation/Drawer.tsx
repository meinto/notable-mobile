import React from 'react'
import styled from 'styled-components/native'
import { Root } from '../Root'
import { showOverlay, closeDrawer } from '../../navigation/actions'
import { TouchableListRow } from '../../components/List'
import { BoldHeadline, Subheading, Text } from '../../components/Text'
import { Wrapper } from '../../components/Page'

const Container = styled.View`
  background-color: white;
  flex: 1;
`

const Logo = styled.Image`
  width: 60px;
  height: 60px;
`

const TitleContainer = styled.View`
  margin-left: 10px;
`

type DrawerProps = {
  componentId: string,
}

export class Drawer extends React.PureComponent<DrawerProps> {
  render() {
    return (
      <Root>
        <Container>
          <Wrapper row>
            <Logo source={require('../../assets/img/notable-unofficial.png')}/>
            <TitleContainer>
              <BoldHeadline>Notable Mobile</BoldHeadline>
              <Subheading>(Unofficial)</Subheading>
            </TitleContainer>
          </Wrapper>
          <Wrapper>
            <Subheading>Notebooks</Subheading>
          </Wrapper>
          <Wrapper>
            <Subheading>Optionen</Subheading>
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
