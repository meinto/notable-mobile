import { Navigation } from 'react-native-navigation'
import { Listing } from '../views/listing/Listing'
import { FolderSelect } from '../views/folderSelect/FolderSelect'
import { Note } from '../views/note/Note'
import { Drawer } from '../views/navigation/Drawer'

Navigation.registerComponent('listing', () => Listing)
Navigation.registerComponent('note', () => Note)
Navigation.registerComponent('folderSelect', () => FolderSelect)
Navigation.registerComponent('navigation.drawer', () => Drawer)

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
