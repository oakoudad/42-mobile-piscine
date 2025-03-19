import { View, Text, Button, TouchableOpacity } from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';

export default function CurrentlyTab({result} : {result: string}) {
  const {authorize} = useAuth0();
  
  const onPress = async () => {
    console.log('onPress');
      // try {
          await authorize();
      // } catch (e) {
          // console.log(e);
      // }
  };
  return (
    <Auth0Provider domain={"dev-t7m5hgp7w43o7qm5.us.auth0.com"} clientId={"ysOxY7J97VG23ed2bHF6OMhctKpeBptz"}>
      <View className='flex-1 justify-center items-center'>
        <TouchableOpacity onPress={onPress}>
          <Text>Authorizdffddfeacddfffggggggggggggdadsdad</Text>
        </TouchableOpacity>
      </View>
    </Auth0Provider>
  );
}