import { View } from 'react-native';
import AppBar from './AppBar';
import Buttons from './Buttons';
import TextFields from './TextFields';
import { useState } from 'react';

export const ScreenContent = ({orientation}: {orientation:'PORTRAIT' | 'LANDSCAPE'}) => {
  const [expression, setExpression] = useState<string[]>(['0']);
  const [result, setResult] = useState<string>('0');
  return (
    <View className='flex-1'>
      <AppBar />
      <TextFields result={result} expression={expression} setExpression={setExpression} orientation={orientation}/>
      <Buttons setResult={setResult} expression={expression} setExpression={setExpression} orientation={orientation}/>
    </View>
  );
};