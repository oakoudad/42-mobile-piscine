import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { Dimensions } from 'react-native';

const w = Dimensions.get('window').width - 60;
echarts.use([SVGRenderer, LineChart, GridComponent]);

export default function LineChart2({data}: any) {
    const option = {
        xAxis: {
            label: 'Day',
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}°'
            }
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'line',
            },
        ],
    }
  const chartRef = useRef<any>(null);
  useEffect(() => {
    let chart: any;
    if (chartRef.current) {
      // @ts-ignore
      chart = echarts.init(chartRef.current, 'dark', {
        renderer: 'svg',
        width: w,
        height: w * 0.65,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SvgChart ref={chartRef}/>;
}