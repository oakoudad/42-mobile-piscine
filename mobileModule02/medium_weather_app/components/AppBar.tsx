import { View, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import Searcher from './Searcher';
import { geolocationStateProps } from '@/utils/types';

interface AppBarProps {
    setGeolocation: (geolocation: geolocationStateProps | null) => void;
    setErrorMsg: (msg: string | null) => void;
    setSearcherActive: (active: boolean) => void;
    searcherActive: boolean;
}


export default function AppBar({ setGeolocation, setErrorMsg, searcherActive, setSearcherActive }:AppBarProps) {
    const [search, setSearch] = useState<string>('');

    async function getLocationDetails(location: Location.LocationObject) {
        const { latitude, longitude } = location.coords;
        let { city, country, region } = { city: '', country: '', region: '' };

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=en`, {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'}})
        .then(response => response.json())
        .then(data => {
            city = data.address.city
            country = data.address.country
            region = data.address.region
        })
        .catch(err => console.error(err))
        .finally(() => {
            setGeolocation({latitude, longitude, city, region, country});
        });
    }

    async function getCoordinates() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('GeoLocationis not available, please enable it in your App settings');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log({location});
        await getLocationDetails(location);
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setSearcherActive(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (search && search.length === 0)
            {
                console.log('keyboardDidHide', search);
                setSearcherActive(false);
            }
        });
    
        getCoordinates();
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
    },[]);

    return (
        <View className={`${searcherActive && 'flex-1'}`}>
            <View className='flex-row bg-black py-2'>
                <View className='flex-1 justify-center relative'>
                    <TextInput
                        value={search}
                        placeholderTextColor="white"
                        placeholder='Search'
                        className='text-white pl-10'
                        onChangeText={setSearch}
                        onSubmitEditing={() => {console.log('clicked');setGeolocation(null);setSearch('')}}
                    />
                    <AntDesign name="search1" size={20} color="white" className='absolute left-2 z-[1]' />
                    {
                        (search.length > 0) && <TouchableOpacity
                            className='absolute right-2 z-[1]'
                            onPress={() => {setSearch(''); setSearcherActive(false)}}
                        >
                            <MaterialCommunityIcons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    }
                </View>
                <View className='border-l border-white/70 border-solid px-2'>
                    <TouchableOpacity
                        activeOpacity={.7}
                        className='size-[40] justify-center items-center rounded-full bg-white/20'
                        onPress={() => getCoordinates()}
                    >
                        <MaterialCommunityIcons name="mapbox" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {searcherActive && <Searcher setGeolocation={setGeolocation} searchPrompt={search} setSearcherActive={setSearcherActive}/>}
        </View>
    )
}