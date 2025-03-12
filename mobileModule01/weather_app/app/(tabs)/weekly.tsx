import { View, Text } from 'react-native';

export default function WeeklyTab({result} : {result: string}) {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-2xl font-bold'>Weekly</Text>
      {(result && result.length > 0) && <Text className='text-2xl font-bold'>{result}</Text>}
    </View>
  );
}