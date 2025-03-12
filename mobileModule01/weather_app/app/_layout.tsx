import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import "@/global.css"
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const Layout = () => {
  return (
    <GestureHandlerRootView className="flex-1" style={{marginTop: Constants.statusBarHeight}}>
        <StatusBar backgroundColor={'black'} />
        <Drawer
          screenOptions={
            {
              headerShown: false,
              swipeEnabled: false
            }
          }
        />
    </GestureHandlerRootView>
  )
}

export default Layout;