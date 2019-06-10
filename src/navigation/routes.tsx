import React from 'react'
import { Provider } from 'mobx-react'
import { Navigation } from 'react-native-navigation'
import { Listing } from '../views/listing/Listing'
import { CreateFileOverlay } from '../views/listing/CreateFileOverlay'
import { FolderSelect } from '../views/folderSelect/FolderSelect'
import { NoteDetail } from '../views/note/NoteDetail'
import { Drawer } from '../views/navigation/Drawer'
import { directoryContext } from '../context/directory'
import { filterContext } from '../context/filter'

const registerComponentWithStores = (componentID: string, Component: any) => {
  Navigation.registerComponent(componentID, () => (props: Object) => (
    <Provider
      directoryContext={directoryContext}
      filterContext={filterContext}
    >
      <Component { ...props }/>
    </Provider>
  ),                           () => Component)
}

registerComponentWithStores('listing', Listing)
registerComponentWithStores('listing.createFileOverlay', CreateFileOverlay)
registerComponentWithStores('note', NoteDetail)
registerComponentWithStores('folderSelect', FolderSelect)
registerComponentWithStores('navigation.drawer', Drawer)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'navigation.drawer',
          },
        },
        center: {
          stack: {
            children: [
              {
                component: {
                  name: 'listing',
                },
              },
            ],
          },
        },
      },
    },
  })
})
