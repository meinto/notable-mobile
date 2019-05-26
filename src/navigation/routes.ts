import { Navigation } from 'react-native-navigation'
import { Listing } from '../views/listing/Listing'
import { FolderSelect } from '../views/folderSelect/FolderSelect'
import { Note } from '../views/note/Note'

Navigation.registerComponent('folderSelect', () => FolderSelect)
Navigation.registerComponent('listing', () => Listing)
Navigation.registerComponent('note', () => Note)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'note',
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
