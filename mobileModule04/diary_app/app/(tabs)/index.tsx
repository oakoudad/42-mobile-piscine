import { Text, View, ScrollView, TouchableOpacity } from "react-native"
import { useUser } from '@/context/UserContext'
import * as WebBrowser from 'expo-web-browser'
import Constants from 'expo-constants'
import DiaryBox from "@/components/DiaryBox";
import { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import { addDiary, deleteDiary, getDiaries } from "@/lib/asyncData";
import AddModal from "@/components/AddModal";
import type { DiaryProps } from "@/lib/types";

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen() {
  const [selectedDiary, setSelectedDiary] = useState<DiaryProps>();
  const [entries, setEntries] = useState<DiaryProps[] | null>([]);
  const { profile } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    const getEntries = async () => {
      setEntries(await getDiaries(profile.email));
    }
    if (profile && profile?.email !== undefined)
      getEntries()
  }, [refresh, profile]);


  return (
    <View className="flex-1">
      <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} data={selectedDiary} onClosing={() => {setRefresh(!refresh)}}/>
      <View className="bg-primary-500 py-5 w-full" style={{marginTop: Constants.statusBarHeight}}>
        <Text className="text-xl text-center text-white font-semibold uppercase">Your latest diary entites</Text>
      </View>
      <View className="flex-1 items-center">
        <ScrollView className="flex-1 w-full z-[1]" contentContainerClassName="gap-2 px-4 py-3" >
          {
            entries?.sort((a, b) => b.created_at - a.created_at).map((data, i) => (
              <DiaryBox
                i={i}
                key={i}
                data={data}
                onPress={async () => {
                  setSelectedDiary(data)
                  setModalVisible(!modalVisible)
                }}
              />
            ))
          }
        </ScrollView>
        <AddModal
          onClosing={() => {
            setRefresh(!refresh)
          }}
        />
      </View>
    </View>
  )
}

  
// const handleLogout = async () => {
//   if (user?.jwtToken)
//     await revokeToken(user.jwtToken);

//   removeTokenFromStorage();
//   setUser(undefined);
// };
  // return (
  //   <View className="flex-1 justify-center items-center gap-5">
  //     <Text className="text-5xl">Home Screen</Text>
  //     <Text className="text-2xl">
  //       Expire at: <Text className="font-bold">{user?.decoded?.exp ? new Date(user.decoded.exp * 1000).toLocaleString() : ''}</Text>
  //     </Text>
  //     <Button
  //       onPress={async () => {await handleLogout()}}
  //       title="Logout"
  //     />
  //     <Button
  //       onPress={async () => {await addDiary()}}
  //       title="Add data"
  //     />
  //   </View>
  // );