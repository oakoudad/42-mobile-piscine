import { Text, View, ScrollView, TouchableOpacity, Modal } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import feelings from "@/lib/feelings";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DiaryProps } from "@/lib/types";
import dayjs from 'dayjs';
import { deleteDiary } from '@/lib/asyncData'

export default function CustomModal({modalVisible, setModalVisible, data, onClosing}: {modalVisible: boolean, setModalVisible: Function, data: DiaryProps | undefined, onClosing: Function}) {
  if (!data) return null;

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
    >
        <View className="flex-1 justify-center items-center w-full bg-black/50">
            <View className="bg-white size-[90%] items-center overflow-hidden rounded-2xl relative pb-2">
                <View className="py-4 flex-row px-4 bg-gray-100">
                    <View className="flex-1">
                        <Text className="font-bold">{data.title}</Text>
                    </View>
                    <TouchableOpacity onPress={async () => setModalVisible(!modalVisible)}>
                        <AntDesign name="closecircle" size={24} color="#ff0000" />
                    </TouchableOpacity>
                </View>
                <ScrollView className="flex-1">
                    <View className="flex-row gap-2 justify-between items-center pt-2 px-3 w-full">
                        <View className="flex-row gap-2 items-center ">
                            <View className="size-14 justify-center items-center rounded-full" style={{backgroundColor: feelings[data.feeling].color + '1c'}}>
                                <FontAwesome6 name={feelings[data.feeling].name} size={28} color={feelings[data.feeling].color} />
                            </View>
                            <View className="">
                                <Text className="font-semibold text-sm" style={{color: feelings[5].color}}>{feelings[data.feeling].label}</Text>
                                <Text className="text-sm text-gray-500">{dayjs.unix(data.created_at / 1000).format('D MMMM YYYY')}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={async () => {
                                if (data.id)
                                {
                                    await deleteDiary(data.id);
                                    onClosing();
                                    setModalVisible(false);
                                }
                            }}
                            className="flex-row items-center gap-1 bg-red-50 px-4 py-2 rounded-xl"
                        >
                            <FontAwesome6 name="trash-alt" size={16} color="#ff0000" />
                            <Text className="text-sm text-[#ff0000] font-semibold">Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-1 bg-white w-full !pt-2 p-4 gap-4">
                        <View className="gap-2">
                            <Text className="font-bold">Content:</Text>
                            <View className="bg-primary-50 border border-primary-200 px-3 py-2 rounded-xl">
                                <Text className="font-semibold text-primary-600 leading-6">
                                    {data.content}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    </Modal>
    )
}