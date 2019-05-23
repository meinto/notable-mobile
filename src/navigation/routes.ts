import { Navigation } from 'react-native-navigation'
import { Listing } from '../views/listing/Listing'
import { Overlay } from '../views/folderSelect/Overlay'
import { Note } from '../views/note/Note'

Navigation.registerComponent('listing', () => Listing)
Navigation.registerComponent('note', () => Note)
Navigation.registerComponent('folderSelect', () => Overlay)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
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
  })

  Navigation.showOverlay({
    component: {
      id: 'folderSelect',
      name: 'folderSelect',
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
      },
    },
  })
})
