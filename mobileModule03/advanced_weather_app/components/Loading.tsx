import { View, Text } from 'react-native';
import {ActivityIndicator} from 'react-native';

export default function Loading({color = '#ffffff'}: {color?: string}) {
    return (
        <View className='flex-1 justify-center items-center gap-2'>
            <ActivityIndicator size='large' color={color} />
            <Text className='font-semiblack text-xl' style={{color}}>Loading...</Text>
        </View>
    );
}