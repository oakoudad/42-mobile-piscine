import { Text, ScrollView } from 'react-native';
import type { ButtonsProps } from '../utils/types';

export default function TextFields() {
  return (
    <ScrollView className={`flex-1 py-1 px-6`}>
      <Text className='text-right text-2xl font-semibold'>{0}</Text>
      <Text className='text-right text-[1.8rem] font-bold'>= {0}</Text>
    </ScrollView>
  );
};