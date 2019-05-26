import { Navigation } from 'react-native-navigation'
import { Listing } from '../views/listing/Listing'
import { Overlay } from '../views/folderSelect/Overlay'
import { Note } from '../views/note/Note'
import { showOverlay } from './actions'

Navigation.registerComponent('listing', () => Listing)
Navigation.registerComponent('note', () => Note)
Navigation.registerComponent('folderSelect', () => Overlay)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'listing',
            name: 'listing',
          },
        },
        center: {
          stack: {
            children: [
              {
                component: {
                  id: 'listing',
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
