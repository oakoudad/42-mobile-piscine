import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import "../global.css"
import AppBar from '../components/AppBar';
import { StatusBar } from 'react-native';

const Layout = () => {
  return (
    <GestureHandlerRootView className="flex-1">
        <StatusBar barStyle="light-content" backgroundColor={'black'} />
        <AppBar />
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