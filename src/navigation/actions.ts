import { Navigation } from 'react-native-navigation'

export const dismissOverlay = (componentID: string) => {
  console.warn('hide ', componentID)
  Navigation.dismissOverlay(componentID)
}

export const push = (componentID: string, nextComponentID: string) => {
  Navigation.push(componentID, {
    component: {
      id: nextComponentID,
      name: nextComponentID,
    },
  })
}

export const showOverlay = (componentName: string) => {
  console.warn('show ', componentName)
  Navigation.showOverlay({
    component: {
      name: componentName,
    },
  })
}
