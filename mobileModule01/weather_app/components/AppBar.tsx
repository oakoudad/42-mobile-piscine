import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

interface AppBarProps {
    setResult: (search: string) => void;
}

export default function AppBar({ setResult }:AppBarProps) {
    const [search, setSearch] = useState('');
    return (
        <View className='flex-row bg-black py-2'>
            <View className='flex-1 justify-center relative'>
                <TextInput
                    value={search}
                    placeholderTextColor="white"
                    placeholder='Search'
                    className='text-white pl-10'
                    onChangeText={setSearch}
                    onSubmitEditing={() => {setResult(search);setSearch('')}}
                />
                <AntDesign name="search1" size={20} color="white" className='absolute left-2 z-[1]' />
            </View>
            <View className='border-l border-white/70 border-solid px-2'>
                <TouchableOpacity
                    activeOpacity={.7}
                    className='size-[40] justify-center items-center rounded-full bg-white/20'
                    onPress={() => setResult('Geolocation')}
                >
                    <MaterialCommunityIcons name="mapbox" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}