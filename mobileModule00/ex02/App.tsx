import { View } from 'react-native';
import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'

import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import './global.css';

export default function App() {
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
    <View className='flex-1 bg-white' style={{marginTop: Constants.statusBarHeight}}>
      <ScreenContent orientation={orientation}/>
      <StatusBar style="light" backgroundColor='#d1d1d1'/>
    </View>
  );
}
