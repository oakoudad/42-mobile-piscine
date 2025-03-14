import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { GeolocationProps } from '@/utils/types';
import { useState, useEffect } from 'react';
import { getWeatherDescription, AxiosOptions } from '@/utils/utils';
import dayjs from 'dayjs';
import Loading from '@/components/Loading';
import axios from 'axios';

interface WeatherProps {
  time: string;
  temperature: string;
  wind_speed: string;
  weather_code: string;
}

export default function TodayTab({geolocation, errorMsg, setErrorMsg}: GeolocationProps)
{
  const [weatherTimes, setWeatherTimes] = useState<WeatherProps[] | null>(null);

  async function fetchWeather()
  {
    if (!geolocation)
      return

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&hourly=temperature_2m,weather_code,wind_speed_10m&timezone=GMT&forecast_days=1`;
    
    setErrorMsg(null);
    
    axios.get(url, AxiosOptions)
      .then(res => res.data)
      .then(data => {
        if (data?.hourly?.time && data.hourly.time.length > 0)
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
        }else
          setErrorMsg('Could not find any result for the supplied address or coordinates.');
        
      })
      .catch((err) => {
        console.log({err});
        if (err?.response?.data?.reason?.length > 0)
          setErrorMsg(err.response.data.reason);
        else
          setErrorMsg('The service connection is lost, please check your internet connection or try again later');
      });
  }

  useEffect(() => {
    if (geolocation?.latitude == -100){
      setErrorMsg('Could not find any result for the supplied address or coordinates.');
      return;
    }
    if (!geolocation){
      setWeatherTimes(null);
      return;
    }
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
          <View className='h-[2px] bg-black mt-3 mb-1 w-[50%] mx-auto'/>
          <View className='w-full flex-1 mt-4'>
            <View className='border border-gray-400 '>
              <View className='flex-row flex-5'>
                <Text className='text-center border py-2 border-gray-400 flex-1 font-bold text-[12px]'>
                  Time \ Unit
                </Text>
                <Text className='text-center border py-2 border-gray-400 font-bold flex-1'>
                  (°C)
                </Text>
                <Text className='text-center border py-2 border-gray-400 font-bold flex-[1]'>
                  (km/h)
                </Text>
                <Text className='text-center border py-2 border-gray-400 font-bold flex-[1.5]'>
                  -
                </Text>
              </View>
              {
                weatherTimes.map((weather, index) => (
                  <View key={'w_' + index} className='flex-row flex-5'>
                    <Text className='text-center border py-1 border-gray-400 flex-1 font-bold'>
                      {dayjs(weather.time).format("HH:mm")}
                    </Text>
                    <Text className='border border-gray-400 py-1 text-center flex-1'>
                      {weather.temperature}°C
                    </Text>
                    <Text className='border border-gray-400 py-1 text-center flex-[1]'>
                      {weather.wind_speed} km/h
                    </Text>
                    <Text className='border border-gray-400 py-1 text-center flex-[1.5]'>
                      {getWeatherDescription(weather.weather_code, 0)}
                    </Text>
                  </View>
                ))
              }
            </View>
          </View>
          
        </ScrollView>
        : <Loading />
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