import { Drawer } from 'expo-router/drawer';
import "@/global.css"
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { View } from 'react-native';
const Layout = () => {
  return (
    <View className="flex-1" style={{marginTop: Constants.statusBarHeight}}>
        <StatusBar backgroundColor={'black'} />
        <Drawer screenOptions={{headerShown: false,swipeEnabled: false,}}/>
    </View>
  )
}

export default Layout;