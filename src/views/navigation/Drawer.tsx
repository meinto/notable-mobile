import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { observer, inject } from 'mobx-react'

import { Root } from '../Root'
import { List, TouchableListRow } from '../../components/List'
import { BoldHeadline, Subheading, Text } from '../../components/Text'
import { Wrapper } from '../../components/Page'
import { showOverlay, closeDrawer } from '../../navigation/actions'
import { NotebookList } from './NotebookList'
import { i18n } from '../../language/i18n'

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

const IconContainer = styled.View`
  padding-right: 20px;
`

type DrawerProps = {
  componentId: string,
  directoryContext: {
    getLinkedRootNotebook: Function,
  },
  filterContext: {
    activeNotebook: string,
    resetActiveNotebook: Function,
  },
}

@inject('directoryContext')
@inject('filterContext')
@observer
export class Drawer extends React.Component<DrawerProps> {

  render() {
    const { getLinkedRootNotebook } = this.props.directoryContext
    const { activeNotebook, resetActiveNotebook } = this.props.filterContext

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
                resetActiveNotebook()
                closeDrawer(this.props.componentId)
              }}
              active={activeNotebook === ''}
            >
              <IconContainer>
                <Icon name="description" size={20} color="#000" />
              </IconContainer>
              <Text>Alle Notes</Text>
            </TouchableListRow>
            <NotebookList
              key={getLinkedRootNotebook().getName()}
              drawerComponentId={this.props.componentId}
              rootNotebook={getLinkedRootNotebook()}
            />
            <Wrapper>
              <Subheading>{i18n.t('sidebar.options')}</Subheading>
            </Wrapper>
            <TouchableListRow
              onPress={() => {
                showOverlay('folderSelect')
                closeDrawer(this.props.componentId)
              }}
            >
              <Text>{i18n.t('sidebar.selectFolder')}</Text>
            </TouchableListRow>
          </List>
        </Container>
      </Root>
    )
  }
}
