import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Listing } from '../views/listing/Listing'
import { FolderSelect } from '../views/folderSelect/FolderSelect'
import { Note } from '../views/note/Note'
import { Drawer } from '../views/navigation/Drawer'
import { directoryContext } from '../filesystem/context'

const registerComponentWithStores = (componentID: string, Component: any) => {
  Navigation.registerComponent(componentID, () => (props: Object) => (
    <Component
      { ...props }
      directoryContext={directoryContext}
    />
  ),                           () => Component)
}

registerComponentWithStores('listing', Listing)
registerComponentWithStores('note', Note)
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
