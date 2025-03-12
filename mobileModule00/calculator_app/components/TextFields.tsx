import { Text, ScrollView } from 'react-native';
import type { ButtonsProps } from '../utils/types';

export default function TextFields({expression, result}: ButtonsProps) {
  return (
    <ScrollView className={`flex-1 py-1 px-6`}>
      <Text className='text-right text-2xl font-semibold'>{expression.join('')}</Text>
      <Text className='text-right text-[1.8rem] font-bold'>= {result}</Text>
    </ScrollView>
  );
};