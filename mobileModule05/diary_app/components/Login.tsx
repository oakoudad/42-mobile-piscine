import * as AuthSession from 'expo-auth-session';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as React from 'react'
import { useUser } from '@/context/UserContext'

export default function Login() {
    const { promptAsync } = useUser();

    return (
        <ImageBackground
            source={require('@/assets/images/bg.jpg')} 
            className='flex-1 bg-white w-full'
            resizeMode="stretch"
        >
            <View className='flex-1 justify-center items-center gap-6 px-10'>
                <Text className='text-primary-200 text-4xl font-semibold text-center leading-[3rem] uppercase'>
                    WELCOME TO DIARY BOOK
                </Text>

                <TouchableOpacity onPress={() => promptAsync()} className='bg-primary-200 py-5 w-full rounded-2xl'>
                    <Text className="text-black text-center text-xl font-bold">
                        SIGN IN
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}
