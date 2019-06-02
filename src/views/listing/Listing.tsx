import React from 'react'
import { observer } from 'mobx-react'
import { Navigation } from 'react-native-navigation'
import { Root } from '../Root'
import {
  push,
  showOverlay,
  openDrawer,
  setTopBarIcon,
} from '../../navigation/actions'
import { Note } from '../../note/Note'
import { Directory } from '../../filesystem/Directory'
import { List, TouchableListRow } from '../../components/List'
import { Text } from '../../components/Text'

type ListingProps = {
  componentId: string,
  directoryContext: {
    dir: Directory,
    noteList: Note[],
    initialized: boolean,
  },
}

@observer
export class Listing extends React.Component<ListingProps> {

  static options() {
    return {
      statusBar: {
        backgroundColor: '#20272c',
      },
      topBar: {
        title: {
          text: 'Notizen',
          color: '#efefef',
        },
        background: {
          color: '#20272c',
        },
      },
      layout: {
        orientation: ['portrait'],
      },
    }
  }

  constructor(props: ListingProps) {
    super(props)

    const { dir, initialized } = this.props.directoryContext
    if (initialized && dir.getPath() === '') {
      showOverlay('folderSelect')
    }

    this.loadTopBarIcons()
    Navigation.events().bindComponent(this)
  }

  loadTopBarIcons = () => {
    setTopBarIcon(this.props.componentId, 'right', 'add-note', 'add', 30, '#efefef')
    setTopBarIcon(this.props.componentId, 'left', 'menu', 'menu', 30, '#efefef')
  }

  navigationButtonPressed({ buttonId }: { buttonId: string }) {
    switch (buttonId) {
      case 'add-note':
        const { dir } = this.props.directoryContext
        showOverlay('listing.createFileOverlay', {
          dirPath: dir.getPath(),
          parentComponentId: this.props.componentId,
        })
        break
      case 'menu':
        openDrawer(this.props.componentId)
        break
    }
  }

  renderFileList = () => {
    const { dir, noteList, initialized } = this.props.directoryContext

    if (initialized && dir.getPath() !== '') {
      return (
        <List>
          {noteList.map((note, i) => {
            return (
            <TouchableListRow
              key={`${note.header.getTitle()}-${i}`}
              onPress={() => {
                push(this.props.componentId, 'note', {
                  filePath: note.getFilePath(),
                })
              }}
            ><Text>{note.getFileName()}</Text></TouchableListRow>
            )
          })}
        </List>
      )
    }

    return <Text>Loading</Text>
  }

  render() {
    return (
      <Root>
        {this.renderFileList()}
      </Root>
    )
  }
}
