import { View, Text } from 'react-native';
import type { GeolocationProps } from '@/utils/types';
import {ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import {getWeatherDescription} from '@/utils/weather';

export default function CurrentlyTab({geolocation, errorMsg}: GeolocationProps)
{
  const [weather, setWeather] = useState<{temperature: string;wind_speed: string;weather_code: string;is_day: number} | null>(null);

  async function fetchWeather()
  {
    if (!geolocation)
      return

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&current=temperature_2m,is_day,wind_speed_10m,weather_code&timezone=GMT`;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data?.current)
        setWeather({
          temperature: data.current.temperature_2m,
          wind_speed: data.current.wind_speed_10m,
          weather_code: data.current.weather_code,
          is_day: data.current.is_day
        });
    })
    .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchWeather()
  }, [geolocation]);

  if (errorMsg)
    return (
      <View className='flex-1 justify-center items-center px-6'>
        <Text className='text-center text-xl text-red-500'>
          {errorMsg}
        </Text>
      </View>
    );

  return (
    <View className='flex-1 justify-center items-center'>
      {
        weather ?
        <View className='flex-1 p-6'>
          <Text className='text-xl font-bold text-center text-black'>
            {geolocation?.city ?? ''}{'\n'}
            {geolocation?.region ?? ''}{'\n'}
            {geolocation?.country ?? ''}
          </Text>
          <Text className='text-center text-xl border-t-[2px] pt-3 mt-3'>
            Weather description: <Text className='font-bold'>{getWeatherDescription(weather.weather_code, weather.is_day)}</Text>{'\n'}
            Temperature: <Text className='font-bold'>{weather.temperature} °C</Text>{'\n'}
            Wind speed: <Text className='font-bold'>{weather.wind_speed} km/h</Text>
          </Text>
        </View>
        : <ActivityIndicator size="large" color="#000000" />
      }
    </View>
  );
}