import { Navigation } from 'react-native-navigation'

export const dismissOverlay = (name: string) => {
  Navigation.dismissOverlay(name)
}

export const push = (componentID: string, nextComponentID: string) => {
  Navigation.push(componentID, {
    component: {
      id: nextComponentID,
      name: nextComponentID,
    },
  })
}

export const showOverlay = (componentID: string) => {
  Navigation.showOverlay({
    component: {
      id: componentID,
      name: componentID,
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
      },
    },
  })
}
