import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import type { GeolocationProps } from '@/utils/types';
import { useState, useEffect } from 'react';
import { getWeatherDescription, AxiosOptions } from '@/utils/utils';
import Loading from '@/components/Loading';
import axios from 'axios';
import LineChart from '@/components/WeeklyChart';
import dayjs from 'dayjs';

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
              weather_code: data.daily.weather_code[i],
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
        <ScrollView className='w-full h-fit px-[20px]' contentContainerStyle={{paddingVertical: 10, marginVertical: 'auto'}}>
          <View className='gap-2'>
            <Text className='font-medium text-center text-[#ffe564] text-4xl'>{geolocation?.city ?? ''}</Text>
            <Text className='text-xl font-bold text-center text-white'>
              {geolocation?.region ?? ''}, {geolocation?.country ?? ''}
            </Text>
          </View>
          <View className='justify-center items-center overflow-hidden bg-[#100c2a] rounded-3xl mt-6 mb-2 pt-4'>
            <LineChart weatherData={weatherDays} title={'Weekly temperature'}/>
          </View>
          <ScrollView horizontal={true} className='w-full flex-1 mt-4' contentContainerClassName='gap-2'>
            {
              weatherDays.map((weather, index) => (
                <View key={'weather' + index} className='bg-[#005C90] justify-center items-center py-2 gap-2 rounded-lg min-w-[120px]'>
                  <Text className='text-center text-white flex-1 font-semibold'>
                    {(dayjs(weather.time).format("D/MM"))}
                  </Text>
                  <Image
                    source={{uri: getWeatherDescription(weather.weather_code, 1, 'image')}}
                    className={`w-[40px] h-[24px] rounded-full}`}
                  />
                  <Text className='text-center text-[#ff4a4a] flex-1 font-semibold flex'>
                    {weather.temperature_max} °C
                    <Text className='text-[12px]'> max</Text>
                  </Text>
                  <Text className='text-center text-[#50b4f7] flex-1 font-semibold'>
                    {weather.temperature_min} °C
                    <Text className='text-[12px]'> min</Text>
                  </Text>
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