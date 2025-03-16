import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import type { GeolocationProps } from '@/utils/types';
import { useState, useEffect } from 'react';
import { getWeatherDescription, AxiosOptions } from '@/utils/utils';
import dayjs from 'dayjs';
import Loading from '@/components/Loading';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LineChart from '@/components/Chart';

interface WeatherProps {
  time: string;
  temperature: string;
  wind_speed: string;
  weather_code: string;
  is_day: number;
}

export default function TodayTab({geolocation, errorMsg, setErrorMsg}: GeolocationProps)
{
  
  const [weatherTimes, setWeatherTimes] = useState<WeatherProps[] | null>(null);

  async function fetchWeather()
  {
    if (!geolocation)
      return

    setErrorMsg(null);
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${geolocation.latitude}&longitude=${geolocation.longitude}&hourly=temperature_2m,weather_code,wind_speed_10m,is_day&timezone=GMT&forecast_days=1`, AxiosOptions)
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
              weather_code: data.hourly.weather_code[i],
              is_day: data.hourly.is_day[i]
            });
          }
          setWeatherTimes([...arr]);
        }else
          setErrorMsg('Could not find any result for the supplied address or coordinates.');
        
      })
      .catch((err) => {
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
        <ScrollView className='w-full h-fit px-[20px]' contentContainerStyle={{paddingVertical: 10, marginVertical: 'auto'}}>
          <View className='gap-2'>
            <Text className='font-medium text-center text-[#ffe564] text-4xl'>{geolocation?.city ?? ''}</Text>
            <Text className='text-xl font-bold text-center text-white'>
              {geolocation?.region ?? ''}, {geolocation?.country ?? ''}
            </Text>
          </View>
          <View className='justify-center items-center overflow-whidden rounded-3xl mt-6 mb-2'>
            <LineChart  />
          </View>
          <ScrollView horizontal={true} className='w-full flex-1 mt-4' contentContainerClassName='gap-2'>
            {
              weatherTimes.map((weather, index) => (
                <View key={'weather' + index} className='bg-[#005C90] justify-center items-center py-2 gap-2 rounded-lg min-w-[120px]'>
                  <Text className='text-center text-white flex-1 font-semibold'>
                    {dayjs(weather.time).format("HH:mm")}
                  </Text>
                  <Image
                    source={{uri: getWeatherDescription(weather.weather_code, weather.is_day, 'image')}}
                    className={`w-[40px] h-[24px] rounded-full ${!weather.is_day && 'bg-white/20'}`}
                  />
                  <Text className='text-center text-white flex-1 font-semibold'>
                    {weather.temperature} °C
                  </Text>
                  <View className='flex-row justify-center items-center gap-1'>
                    <MaterialCommunityIcons name="weather-windy" size={18} color="white" />
                    <Text className='font-semibold text-white'>{weather.wind_speed} km/h</Text>
                  </View>
                </View>
              ))
            }
          </ScrollView>
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