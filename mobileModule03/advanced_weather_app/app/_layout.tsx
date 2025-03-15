import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import "@/global.css"
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const Layout = () => {
  return (
    <GestureHandlerRootView style={{marginTop: Constants.statusBarHeight, flex: 1}}>
        <StatusBar backgroundColor={'black'} />
        <Drawer screenOptions={{headerShown: false,swipeEnabled: false,}}/>
    </GestureHandlerRootView>
  )
}

export default Layout;