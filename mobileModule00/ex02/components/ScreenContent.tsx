import { View } from 'react-native';
import AppBar from './AppBar';
import Buttons from './Buttons';
import TextFields from './TextFields';

export const ScreenContent = ({orientation}: {orientation:'PORTRAIT' | 'LANDSCAPE'}) => {
  return (
    <View className='flex-1'>
      <AppBar />
      <TextFields/>
      <Buttons orientation={orientation}/>
    </View>
  );
};