import React from 'react'
import styled from 'styled-components/native'
import { observer, inject } from 'mobx-react'
import { Root } from '../Root'
import { showOverlay, closeDrawer } from '../../navigation/actions'
import { List, TouchableListRow } from '../../components/List'
import { BoldHeadline, Subheading, Text } from '../../components/Text'
import { Wrapper } from '../../components/Page'
import { NotebookList } from './NotebookList'
import { Notebook } from '../../note/Notebook'

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
  directoryContext: {
    getLinkedRootNotebook: Function,
  },
}

@inject('directoryContext')
@inject('filterContext')
@observer
export class Drawer extends React.Component<DrawerProps> {

  render() {
    const { getLinkedRootNotebook } = this.props.directoryContext
    const { activeNotebook, setActiveNotebook } = this.props.filterContext

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
          <List>
            <TouchableListRow
              onPress={() => {
                setActiveNotebook('')
                closeDrawer(this.props.componentId)
              }}
              active={activeNotebook === ''}
            >
              <Text>Notebooks</Text>
            </TouchableListRow>
            {getLinkedRootNotebook().getChildren().map((child: Notebook) => (
              <NotebookList
                key={child.getName()}
                drawerComponentId={this.props.componentId}
                rootNotebook={child}
              />
            ))}
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
          </List>
        </Container>
      </Root>
    )
  }
}
