import { View, Text, Image } from 'react-native';
import type { GeolocationProps } from '@/utils/types';
import { useState, useEffect } from 'react';
import { getWeatherDescription, AxiosOptions } from '@/utils/utils';
import Loading from '@/components/Loading';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface WeatherProps {
  temperature: string;
  wind_speed: string;
  weather_code: string;
  is_day: number;
}

export default function CurrentlyTab({geolocation, errorMsg, setErrorMsg}: GeolocationProps)
{
  const [weather, setWeather] = useState<WeatherProps | null>(null);

  async function fetchWeather()
  {
    if (!geolocation)
      return
  
    setErrorMsg(null);
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&current=temperature_2m,is_day,wind_speed_10m,weather_code&timezone=GMT`, AxiosOptions)
    .then(res => res.data)
    .then(data => {
      if (typeof data?.current?.weather_code === 'number')
        setWeather({
          temperature: data.current.temperature_2m,
          wind_speed: data.current.wind_speed_10m,
          weather_code: data.current.weather_code,
          is_day: data.current.is_day
        });
      else
        setErrorMsg('Could not find any result for the supplied address or coordinates.');
    })
    .catch((err) => {
      if (err?.response?.data?.reason?.length > 0){
        setErrorMsg(err.response.data.reason);
      }else
        setErrorMsg('The service connection is lost, please check your internet connection or try again later');
    });
  }

  useEffect(() => {
    if (geolocation?.latitude == -100){
      setErrorMsg('Could not find any result for the supplied address or coordinates.');
      return;
    }
    if (!geolocation){
      setWeather(null);
      return;
    }
    fetchWeather()
  }, [geolocation]);

  if (errorMsg)
    return (
      <View className='flex-1 justify-center items-center px-8'>
        <View className=' bg-red-200 rounded-lg px-4 pt-6 pb-4'>
          <Text className='absolute -top-4 left-4 bg-red-200 font-bold text-xl text-red-500 px-2 rounded-full border border-red-500'>
            Error
          </Text>
          <Text className='text-center text-xl text-red-500'>
            {errorMsg}
          </Text>
        </View>
      </View>
    );

  return (
    <ScrollView className='flex-1' contentContainerStyle={{flex:1, justifyContent: 'center', alignItems: 'center' }}>
      {
        weather ?
        <View className='flex-1 p-6 w-full justify-center items-center'>
          <View className='gap-1'>
            <Text className='font-normal text-center text-[#ffe564] text-5xl'>{geolocation?.city ?? ''}</Text>
            <Text className='text-xl font-bold text-center text-white'>
              {geolocation?.region ?? ''}, {geolocation?.country ?? ''}
            </Text>
            <Text
              className='text-[5rem] font-normal text-center text-white mb-4 mt-3'
              style={{textShadowColor: 'rgba(0,92,144, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 20}}
            >
              {weather.temperature}°C
            </Text>
          </View>
          <View className='bg-[#ffffff]/60 py-3 px-4 gap-2 rounded-2xl justify-center items-center relative'>
            <View className='flex-row justify-center items-center gap-1'>
              <Image source={{uri: getWeatherDescription(weather.weather_code, weather.is_day, 'image')}} className='size-[40px] rounded-full'/>
              <Text className='font-bold tex
              t-black'>{getWeatherDescription(weather.weather_code, weather.is_day)}</Text>
            </View>
            <View className='-mt-1 mb-1 flex-row gap-[2px] opacity-50 justify-center items-center'>
              {[.5, 1, 2, 3, 4, 4.5, 5, 4.5, 4, 3, 2, 1, .5].map((size, index) => <View key={'dot_' + index} style={{width: size, height: size}} className='bg-black rounded-full'/>)}
            </View>
            <View className='flex-row justify-center items-center gap-1'>
              <MaterialCommunityIcons name="weather-windy" size={18} color="black" />
              <Text className='font-semibold text-black'>{weather.wind_speed} km/h</Text>
            </View>
          </View>
        </View>
        : <Loading />
      }
    </ScrollView>
  );
}