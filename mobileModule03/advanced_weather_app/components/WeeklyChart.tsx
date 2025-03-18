import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { Dimensions } from 'react-native';
import dayjs from 'dayjs';

interface WeatherProps {
    time: string;
    temperature_max: string;
    temperature_min: string;
    wind_speed: string;
    weather_code: string;
}

const w = Dimensions.get('window').width - 30;
echarts.use([TitleComponent, SVGRenderer, LineChart, GridComponent, LegendComponent]);

export default function WeeklyChart({weatherData, title}: {weatherData: WeatherProps[] | null, title: string}) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (weatherData ) {
      const min_y_data: string[] = [];
      const max_y_data: string[] = [];
      const x_data: string[] = [];
      for (let i = 0; i < weatherData.length; i++) {
        min_y_data.push(weatherData[i].temperature_min);
        max_y_data.push(weatherData[i].temperature_max);
        x_data.push(dayjs(weatherData[i].time).format("D/MM"));
      }
      if (chartRef.current) {
        // @ts-ignore
        chart = echarts.init(chartRef.current, 'dark', {renderer: 'svg',width: w, height: w * 0.65,});
        chart.setOption({
          legend: {
            bottom: 14,
          },
          title: {
            text: title,
            left: 'center'
          },
          xAxis: {label: 'Time', type: 'category', data: x_data},
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}°'
            }
          },
          series: [
            {
              name: 'Min Temp',
              data: min_y_data,
              type: 'line',
            },
            {
              name: 'Max Temp',
              data: max_y_data,
              type: 'line',
            },
          ],
        });
      }
    }
    return () => chart?.dispose();
  }, [weatherData]);

  return <SvgChart ref={chartRef}/>;
}