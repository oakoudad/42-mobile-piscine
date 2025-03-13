import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { GeolocationProps } from '@/utils/types';
import {ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import {getWeatherDescription} from '@/utils/weather';
import dayjs from 'dayjs';

interface WeatherProps {
  time: string;
  temperature: string;
  wind_speed: string;
  weather_code: string;
}

export default function TodayTab({geolocation, errorMsg}: GeolocationProps)
{
  const [weatherTimes, setWeatherTimes] = useState<WeatherProps[] | null>(null);

  async function fetchWeather()
  {
    if (!geolocation)
      return

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&hourly=temperature_2m,weather_code,wind_speed_10m&timezone=GMT&forecast_days=1`;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data?.hourly?.time)
      {
        const arr:WeatherProps[] = [];
        for (var i = 0; i < data.hourly.time.length; i++)
        {
          arr.push({
            time: data.hourly.time[i],
            temperature: data.hourly.temperature_2m[i],
            wind_speed: data.hourly.wind_speed_10m[i],
            weather_code: data.hourly.weather_code[i]
          });
        }
        setWeatherTimes([...arr]);
      }
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
        weatherTimes ?
        <ScrollView className='w-full flex-1  px-4' contentContainerStyle={{paddingVertical: 10}}>
          <Text className='text-xl font-bold text-center text-black'>
            {geolocation?.city ?? ''}{'\n'}
            {geolocation?.region ?? ''}{'\n'}
            {geolocation?.country ?? ''}
          </Text>
          <View className='w-full flex-1 mt-4'>
            <View className='border border-gray-400 '>
              {
                weatherTimes.map((weather, index) => (
                  <View key={'w_' + index} className='flex-row flex-5'>
                    <Text className='border border-gray-400 p-1 flex-1 font-bold'>
                      {dayjs(weather.time).format("HH:mm")}
                    </Text>
                    <Text className='border border-gray-400 p-1 flex-1'>
                      {weather.temperature}°C
                    </Text>
                    <Text className='border border-gray-400 p-1 flex-[1.5]'>
                      {weather.wind_speed} km/s
                    </Text>
                    <Text className='border border-gray-400 p-1 flex-[1.5]'>
                      {getWeatherDescription(weather.weather_code, 0)}
                    </Text>
                  </View>
                ))
              }
            </View>
          </View>
          
        </ScrollView>
        : <ActivityIndicator size="large" color="#000000" />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    margin: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
});