import { Navigation } from 'react-native-navigation'

export const dismissOverlay = (componentID: string) => {
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
  Navigation.showOverlay({
    component: {
      name: componentName,
    },
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
