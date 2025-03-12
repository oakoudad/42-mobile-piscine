import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import "../global.css"

const Layout = () => {
  return (
    <GestureHandlerRootView className="flex-1">
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