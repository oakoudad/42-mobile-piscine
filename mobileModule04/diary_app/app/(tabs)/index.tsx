import { View, Text } from 'react-native';

export default function CurrentlyTab({result} : {result: string}) {
  return (
    <View className='flex-1 justify-center items-center px-6'>
      <Text className='text-2xl font-bold'>Currently</Text>
      {(result && result.length > 0) && <Text className='mt-1 text-2xl font-semibold text-center'>{result}</Text>}
    </View>
  );
}