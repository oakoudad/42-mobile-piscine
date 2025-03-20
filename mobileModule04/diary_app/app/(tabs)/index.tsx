import { Text, View, ScrollView, TouchableOpacity, Modal } from "react-native"
import { useUser } from '@/context/UserContext'
import * as WebBrowser from 'expo-web-browser'
import AntDesign from '@expo/vector-icons/AntDesign';
import Constants from 'expo-constants'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/lib/firebaseConfig';
import DiaryBox from "@/components/DiaryBox";
import { useState } from "react";

WebBrowser.maybeCompleteAuthSession();
export default function HomeScreen() {
  const { user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState(false);


  const addDiary = async () => {
    try {
      const docRef = await addDoc(collection(db, "diary"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <View className="flex-1">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View className="flex-1 justify-center items-center w-full bg-black/50">
          <View className="bg-white size-[90%] justify-center items-center rounded-2xl relative">
            <Text>Modal</Text>
            <TouchableOpacity
              onPress={async () => setModalVisible(!modalVisible)}
              className="absolute top-2 right-3"
            >
              <AntDesign name="closecircle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className="bg-primary-500 py-5 w-full" style={{marginTop: Constants.statusBarHeight}}>
        <Text className="text-xl text-center text-white font-semibold uppercase">Your latest diary entites</Text>
      </View>
      <View className="flex-1 items-center">
        <ScrollView className="flex-1 w-full z-[1]" contentContainerClassName="gap-2 px-4 py-3" >
          {
            [1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1].map((_, i) => (
              <DiaryBox
                i={i}
                key={i}
                onPress={async () => {
                  setModalVisible(!modalVisible)
                }}
              />
            ))
          }
        </ScrollView>
        <TouchableOpacity
          onPress={async () => {await addDiary()}}
          className="absolute bottom-6 z-[2] bg-primary-500 rounded-full"
        >
          <Text className="py-2 px-4 font-semibold text-xl text-white">
            New diary entry
          </Text>
        </TouchableOpacity>
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