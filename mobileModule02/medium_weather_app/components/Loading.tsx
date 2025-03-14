import { View, Text } from 'react-native';
import {ActivityIndicator} from 'react-native';

export default function Loading() {
    return (
        <View className='flex-1 justify-center items-center gap-2'>
            <ActivityIndicator size='large' color='#000' />
            <Text className='font-semiblack text-xl'>Loading...</Text>
        </View>
    );
}