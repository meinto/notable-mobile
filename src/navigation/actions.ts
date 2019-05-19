import { Navigation } from "react-native-navigation";

export const dismissOverlay = (name: string) => {
  Navigation.dismissOverlay(name)
}