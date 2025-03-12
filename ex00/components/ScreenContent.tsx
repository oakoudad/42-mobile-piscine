import { Text, View, TouchableOpacity } from 'react-native';

export const ScreenContent = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="px-4 py-1 text-2xl font-bold bg-orange-500 text-white rounded-full">A simple text</Text>
      <TouchableOpacity
        className="px-4 py-2 mt-4 bg-white rounded-full shadow shadow-black"
        activeOpacity={0.6}
        onPress={() => console.log('Button pressed')}
      >
        <Text className="font-bold text-black">Click me</Text>
      </TouchableOpacity>
    </View>
  );
};