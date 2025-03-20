// TabLayout.tsx
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Login from '@/components/Login';
import { UserProvider, useUser } from '@/context/UserContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function TabsLayout() {
  const { user } = useUser();

  if (!(user?.jwtToken && user.jwtToken.length > 0))
    return (<Login />)

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="face-man-profile" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="calandar"
          options={{
            title: 'Calandar',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar-week" size={24} color={color} />
          }}
        />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <UserProvider>
      <TabsLayout />
    </UserProvider>
  );
}
