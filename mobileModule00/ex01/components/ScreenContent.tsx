import { Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const words = [
  'A simple text',
  'Hello World',
]

export const ScreenContent = () => {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const handlePress = () => {
    setWordIndex((wordIndex + 1) % words.length);
  }
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="px-6 py-2 text-2xl font-bold bg-orange-500 text-white rounded-full">{words[wordIndex]}</Text>
      <TouchableOpacity
        className="px-4 py-2 mt-4 bg-white rounded-full shadow shadow-black/20"
        activeOpacity={0.6}
        onPress={() => handlePress()}
      >
        <Text className="font-bold text-black">Click me</Text>
      </TouchableOpacity>
    </View>
  );
};