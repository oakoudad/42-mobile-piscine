import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import CurrentlyTab from './index';
import TodayTab from './today';
import WeeklyTab from './weekly';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppBar from '@/components/AppBar';

const TabsLayout = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState('');
  
  const routes = [
    { key: 'index', title: 'Currently', icon: 'clock-time-five-outline' },
    { key: 'today', title: 'Today', icon: 'hours-24' },
    { key: 'weekly', title: 'Weekly', icon: 'calendar-week' }
  ];
  const renderScene = ({ route }:any) => {
    switch (route.key) {
      case 'index':
        return <CurrentlyTab result={result} />;
      case 'today':
        return <TodayTab result={result} />;
      case 'weekly':
        return <WeeklyTab result={result} />;
      default:
        return null;
    }
  };

  const CustomTabBar = TabBar as any;

  return (
    <>
      <AppBar setResult={setResult}/>
      <TabView
        commonOptions={{
          icon: ({ route, color }) => {
            const icon:any = route.icon;
            return (
              <MaterialCommunityIcons name={icon} size={24} color={color} />
            )
          },
        }}      
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(_index)=>setIndex(_index)}
        initialLayout={{ width: layout.width }}
        tabBarPosition="bottom"
        renderTabBar={props => {
          return(
            <CustomTabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'white' }}
              style={{
                backgroundColor: 'black',
                borderTopWidth: 1,
                borderTopColor: '#ccc'
              }}
            />
          )
        }}
      />
    </>
  );
};

export default TabsLayout;
