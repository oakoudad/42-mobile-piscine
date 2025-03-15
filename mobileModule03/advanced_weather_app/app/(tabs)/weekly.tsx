import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { GeolocationProps } from '@/utils/types';
import { useState, useEffect } from 'react';
import { getWeatherDescription, AxiosOptions } from '@/utils/utils';
import Loading from '@/components/Loading';
import axios from 'axios';

interface WeatherProps {
  time: string;
  temperature_max: string;
  temperature_min: string;
  wind_speed: string;
  weather_code: string;
}

export default function WeeklyTab({geolocation, errorMsg, setErrorMsg}: GeolocationProps)
{
  const [weatherDays, setWeatherDays] = useState<WeatherProps[] | null>(null);

  async function fetchWeather()
  {
    if (!geolocation)
      return

    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=GMT`, AxiosOptions)
      .then(res => res.data)
      .then(data => {
        if (data?.daily?.time && data.daily.time.length > 0)
        {
          const arr:WeatherProps[] = [];
          for (var i = 0; i < data.daily.time.length; i++)
          {
            arr.push({
              time: data.daily.time[i],
              temperature_min: data.daily.temperature_2m_min[i],
              temperature_max: data.daily.temperature_2m_max[i],
              wind_speed: data.daily.wind_speed_10m_max[i],
              weather_code: data.daily.weather_code[i]
            });
          }
          setWeatherDays([...arr]);
        } else
          setErrorMsg('Could not find any result for the supplied address or coordinates.');
      })
      .catch((err) => {
        if (err?.response?.data?.reason?.length > 0)
          setErrorMsg(err.response.data.reason);
        else
          setErrorMsg('The service connection is lost, please check your internet connection or try again later');
      })
  }

  useEffect(() => {
    if (geolocation?.latitude == -100){
      setErrorMsg('Could not find any result for the supplied address or coordinates.');
      return;
    }
    if (!geolocation){
      setWeatherDays(null);
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
        weatherDays ?
        <ScrollView className='w-full flex-1  px-4' contentContainerStyle={{paddingVertical: 10}}>
          <Text className='text-xl font-bold text-center text-black'>
            {geolocation?.city ?? ''}{'\n'}
            {geolocation?.region ?? ''}{'\n'}
            {geolocation?.country ?? ''}
          </Text>
          <View className='h-[2px] bg-black mt-3 mb-1 w-[50%] mx-auto'/>
          <View className='w-full flex-1 mt-4'>
            <View className='border border-gray-400 '>
              {
                weatherDays.map((weather, index) => (
                  <View key={'w_' + index} className='flex-row flex-5'>
                    <Text className='text-center border py-2 border-gray-400 flex-[1.5] font-bold'>
                      {(weather.time)}
                    </Text>
                    <Text className='text-center border py-2 border-gray-400 flex-[.8]'>
                      {weather.temperature_min} °C
                    </Text>
                    <Text className='text-center border py-2 border-gray-400 flex-[.8]'>
                      {weather.temperature_max} °C
                    </Text>
                    <Text className='text-center border py-2 border-gray-400 flex-[1.5]'>
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