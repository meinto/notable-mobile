import { Navigation } from "react-native-navigation";
import { Listing } from '../views/listing/Listing';
import { Overlay } from '../views/folderSelect/Overlay'

Navigation.registerComponent(`Start`, () => Listing);
Navigation.registerComponent('folderSelect', () => Overlay)

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "Start"
            }
          }
        ]
      }
    }
  }); 

  Navigation.showOverlay({
    component: {
      id: 'folderSelect',
      name: 'folderSelect',
      options: {
        overlay: {
          interceptTouchOutside: true
        }
      }
    }
  })
});
