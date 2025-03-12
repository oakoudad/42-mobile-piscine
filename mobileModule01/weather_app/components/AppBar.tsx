import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AppBar() {
    return (
        <View className='flex-row bg-black py-2'>
            <View className='flex-1 justify-center relative'>
                <TextInput placeholderTextColor="white" placeholder='Search' className='text-white pl-10' />
                <AntDesign name="search1" size={20} color="white" className='absolute left-2 z-[1]' />
            </View>
            <View className='border-l border-white/70 border-solid px-2'>
                <TouchableOpacity
                    activeOpacity={.7}
                    className='size-[40] justify-center items-center rounded-full bg-white/20'
                    onPress={() => console.log('Geo location button is here')}
                >
                    <MaterialCommunityIcons name="mapbox" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}