import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppBar from '@/components/AppBar';
import { routes, renderScene } from '@/utils/route';
import { geolocationStateProps } from '@/utils/types';
  
const TabsLayout = () => {
  const CustomTabBar = TabBar as any;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [geolocation, setGeolocation] = useState<geolocationStateProps | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searcherActive, setSearcherActive] = useState<boolean>(false);

  return (
    <>
      <AppBar setGeolocation={setGeolocation} setErrorMsg={setErrorMsg} setSearcherActive={setSearcherActive} searcherActive={searcherActive}/>
      {
        (!searcherActive) && <TabView
          commonOptions={{
            icon: ({ route, color }) => (<MaterialCommunityIcons name={route.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={24} color={color} />)
          }}      
          navigationState={{ index, routes }}
          renderScene={({ route }) => renderScene({ route, geolocation, errorMsg })}
          onIndexChange={()=>setIndex(0)}
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
      }
    </>
  );
};

export default TabsLayout;
