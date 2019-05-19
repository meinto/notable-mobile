import { Navigation } from "react-native-navigation";
import App from '../views/App';
import { Overlay } from '../views/folderSelect/Overlay'

Navigation.registerComponent(`Start`, () => App);
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
