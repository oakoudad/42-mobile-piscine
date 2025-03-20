import { Text, View, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import feelings from "@/lib/feelings";
import { useEffect, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import { addDiary } from '@/lib/asyncData'
import { useUser } from '@/context/UserContext'

export default function AddModal({ onClosing }: { onClosing: () => void }) {
    const { profile } = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [feeling, setFeeling] = useState<number>(0);

    useEffect(() => {
        if (modalVisible) {
            setIsLoading(false);
            setTitle('');
            setContent('');
            setFeeling(0);
        }
    }, [modalVisible]);

    const submit = async () => {
        setIsLoading(true)
        const id = await addDiary({
            title: title,
            email: profile.email,
            feeling: feeling,
            created_at: Date.now(),
            content: content
        });
        if (id === null)
        {
            Alert.alert('Error', 'An error occured while saving the diary entry')
            return;
        }
        setModalVisible(false);
        onClosing();
    }

    if ((!modalVisible))
        return (
            <TouchableOpacity onPress={async () => setModalVisible(true)} className="absolute bottom-6 z-[2] bg-primary-500 rounded-full">
                <Text className="py-2 px-4 font-semibold text-xl text-white">
                    New diary entry
                </Text>
            </TouchableOpacity>
        )

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
                            <Text className="font-bold">Add an entry</Text>
                        </View>
                        <TouchableOpacity onPress={async () => setModalVisible(!modalVisible)}>
                            <AntDesign name="closecircle" size={24} color="#ff0000aa" />
                        </TouchableOpacity>
                    </View>
                    <View className="p-4 w-full gap-2 flex-1">
                        <View className="w-full gap-1">
                            <Text className="font-bold">Title</Text>
                            <TextInput
                                editable={!isLoading}
                                placeholder="Please enter a title"
                                value={title}
                                onChangeText={setTitle}
                                className={`${isLoading && 'opacity-60'} border-b border-gray-300 w-full px-3 py-4 border rounded-xl`}
                            />
                        </View>
                        <View className="w-full gap-1">
                            <Text className="font-bold">Feeling</Text>
                            <View className="border-gray-300 border rounded-xl">
                                <Picker
                                    enabled={!isLoading}
                                    selectedValue={feeling}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setFeeling(itemValue)
                                    }
                                >
                                    {
                                        feelings.map((f:any, i:number) => (
                                            <Picker.Item key={i} label={f.label} value={i} />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View className="w-full gap-1 flex-1 ">
                            <Text className="font-bold">Content</Text>
                            <TextInput
                                editable={!isLoading}
                                multiline
                                placeholder="Please enter the content"
                                value={content}
                                onChangeText={setContent}
                                className={`${isLoading && 'opacity-60'} flex-1 border-b border-gray-300 w-full px-3 py-4 border rounded-xl`}
                                numberOfLines={5}
                            />
                        </View>
                        <View className="w-full mt-2">
                            <TouchableOpacity
                                onPress={submit}
                                className={`${isLoading && 'opacity-60'} bg-primary-500 rounded-xl py-4 px-4`}
                                disabled={isLoading}
                            >
                                <Text className="text-white font-bold text-center">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}