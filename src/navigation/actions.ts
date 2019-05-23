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
