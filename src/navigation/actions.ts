import Icon from 'react-native-vector-icons/MaterialIcons'
import { Navigation } from 'react-native-navigation'

export const dismissOverlay = (componentID: string) => {
  Navigation.dismissOverlay(componentID)
}

export const push = (componentID: string, nextComponentID: string, props?: Object) => {
  Navigation.push(componentID, {
    component: {
      id: nextComponentID,
      name: nextComponentID,
      passProps: props ? props : {},
    },
  })
}

export const showOverlay = (componentName: string, props?: Object) => {
  Navigation.showOverlay({
    component: {
      name: componentName,
      passProps: props ? props : {},
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
      },
    },
  })
}

export const setTopBarIcon = (
  componentID: string,
  buttonLocation: 'left' | 'right',
  buttonID: string,
  iconName: string,
  iconSize: number,
  iconColor: string,
) => {
  Icon.getImageSource(iconName, iconSize, iconColor).then((icon) => {
    Navigation.mergeOptions(componentID, {
      topBar: {
        [`${buttonLocation}Buttons`]: [
          {
            icon,
            id: buttonID,
          },
        ],
      },
    })
  })
}

export const openDrawer = (componentID: string) => {
  Navigation.mergeOptions(componentID, {
    sideMenu: {
      left: {
        visible: true,
      },
    },
  })
}

export const closeDrawer = (componentID: string) => {
  Navigation.mergeOptions(componentID, {
    sideMenu: {
      left: {
        visible: false,
      },
    },
  })
}
