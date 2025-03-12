import { Text, View } from 'react-native';

export default function AppBar() {
  return (
    <View className='py-4 bg-[#F5F5F5] border-b border-[#dadada] w-full'>
      <Text className='text-center text-xl font-semibold'>Calculator</Text>
    </View>
  );
};