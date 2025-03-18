import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent } from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { Dimensions } from 'react-native';
import type { WeatherProps } from '@/utils/types';
import dayjs from 'dayjs';

const w = Dimensions.get('window').width - 60;
echarts.use([TitleComponent, SVGRenderer, LineChart, GridComponent]);

export default function DailyChart({weatherData, title}: {weatherData: WeatherProps[] | null, title: string}) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (weatherData ) {
      const y_data: string[] = [];
      const x_data: string[] = [];
      for (let i = 0; i < weatherData.length; i++) {
        y_data.push(weatherData[i].temperature);
        x_data.push(dayjs(weatherData[i].time).format("HH:mm"));
      }
      if (chartRef.current) {
        // @ts-ignore
        chart = echarts.init(chartRef.current, 'dark', {renderer: 'svg',width: w, height: w * 0.65,});
        chart.setOption({
          title: {
            text: title,
            left: 'center'
          },
          xAxis: {
            label: 'Time',
            type: 'category',
            data: x_data,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} C°'
            }
          },
          series: [
            {
              data: y_data,
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