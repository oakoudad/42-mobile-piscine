import { Text, View, Pressable, ScrollView } from "react-native"
import { useUser } from '@/context/UserContext'
import * as WebBrowser from 'expo-web-browser'
import DiaryBox from "@/components/DiaryBox";
import Summary from "@/components/Summary";
import { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import { getDiaries } from "@/lib/asyncData";
import AddModal from "@/components/AddModal";
import type { DiaryProps } from "@/lib/types";
import { revokeToken, removeTokenFromStorage } from "@/lib/utils";
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen() {
  const [selectedDiary, setSelectedDiary] = useState<DiaryProps>();
  const [ entries, setEntries ] = useState<DiaryProps[] | null>([]);
  const { profile, user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  const handleLogout = async () => {
    if (user?.jwtToken)
      await revokeToken(user.jwtToken);

    removeTokenFromStorage();
    setUser(undefined);
  };

  useEffect(() => {
    const getEntries = async () => {
      if (!profile || !profile?.email) {
        return;
      }
      try {
        const diaries = await getDiaries(profile.email);
        setEntries(diaries);
      } catch (error) {
        console.error('Error fetching diaries:', error);
        setEntries([]);
      }
    }
    getEntries()
  }, [refresh, profile]);

  return (
    <SafeAreaView className="flex-1">
      <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} data={selectedDiary} onClosing={() => {setRefresh(!refresh)}}/>
      <View className="bg-primary-500 flex flex-row justify-between items-center gap-3 px-4 py-6 w-full">
        <Text className="text-lg text-white font-semibold uppercase line-clamp-1 max-w-[90%]">{profile?.name}</Text>
        <View>
          <Pressable
            onPress={async () => {await handleLogout()}}
          >
            <MaterialIcons name="logout" size={18} color="white" />
          </Pressable>
        </View>
      </View>
      <ScrollView>
        <View className="flex-1 items-center">
          {
            (!entries || entries?.length === 0) ?
            <View>
              <Text className="text-lg text-gray-500 mt-10 text-center">No diary entries found. Start by adding a new entry!</Text>
            </View>
            :
            <>
              <Text className="text-lg text-gray-500 mt-2 text-center pb-2">Your latest diary entries</Text>
              <View className="w-full z-[1] px-4 gap-4">
                {
                  entries?.sort((a, b) => b.created_at - a.created_at).slice(0, 2).map((data, i) => (
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
                <Text className="text-lg text-gray-500 mt-2 text-center">Your feel for your {entries.length} entries</Text>
                <Summary entries={entries}/>
              </View>
            </>
          }
        </View>
      </ScrollView>
      <AddModal
        onClosing={() => {
          setRefresh(!refresh)
        }}
      />
    </SafeAreaView>
  )
}