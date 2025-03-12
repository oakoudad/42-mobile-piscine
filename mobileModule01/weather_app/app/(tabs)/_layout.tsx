import React, { useState } from 'react';
import { useWindowDimensions, Text, View } from 'react-native';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import CurrentlyTab from './index';
import TodayTab from './today';
import WeeklyTab from './weekly';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabsLayout = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'index', title: 'Currently', icon: 'clock-time-five-outline' },
    { key: 'today', title: 'Today', icon: 'hours-24' },
    { key: 'weekly', title: 'Weekly', icon: 'calendar-week' }
  ];
  const CustomTabBar = TabBar as any;

  return (
    <TabView
      commonOptions={{
        icon: ({ route, focused, color }) => {
          const icon:any = route.icon;
          return (
            <MaterialCommunityIcons name={icon} size={24} color={color} />
          )
        },
      }}      
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        index: CurrentlyTab,
        today: TodayTab,
        weekly: WeeklyTab
      })}
      onIndexChange={setIndex}
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
  );
};

export default TabsLayout;
