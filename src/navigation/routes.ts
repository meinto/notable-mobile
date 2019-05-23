import Icon from 'react-native-vector-icons/MaterialIcons'
import { Navigation } from 'react-native-navigation'
import { Listing } from '../views/listing/Listing'
import { Overlay } from '../views/folderSelect/Overlay'

Navigation.registerComponent('Listing', () => Listing)
Navigation.registerComponent('folderSelect', () => Overlay)

Navigation.events().registerAppLaunchedListener(async () => {
  const addIcon = await Icon.getImageSource('add', 30, 'black')

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Listing',
              options: {
                topBar: {
                  title: {
                    text: 'Notizen',
                  },
                  rightButtons: [
                    {
                      id: 'buttonOne',
                      icon: addIcon,
                    },
                  ],
                },
              },
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
