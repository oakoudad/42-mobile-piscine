import { Drawer } from 'expo-router/drawer';
import "@/global.css"
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

const Layout = () => {
  const [ orientation, setOrientation ] = useState<'PORTRAIT' | 'LANDSCAPE'>('PORTRAIT');

  useEffect(() => {
    ScreenOrientation.unlockAsync();

    ScreenOrientation.addOrientationChangeListener((event) => {
      if ([2, 3, 4].includes(event.orientationInfo.orientation))
        setOrientation('LANDSCAPE');
      else 
        setOrientation('PORTRAIT');
    });
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  return (
    <View className="flex-1" style={{marginTop: Constants.statusBarHeight}}>
        <StatusBar backgroundColor={'black'} />
        <Drawer screenOptions={{headerShown: false,swipeEnabled: false,}}/>
    </View>
  )
}

export default Layout;