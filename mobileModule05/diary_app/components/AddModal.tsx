import { Text, View, TouchableOpacity, Modal, TextInput, Alert, Keyboard } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import feelings from "@/lib/feelings";
import { useEffect, useState } from "react";
import { addDiary } from '@/lib/asyncData'
import { useUser } from '@/context/UserContext'

export default function AddModal({ onClosing }: { onClosing: () => void }) {
    const { profile } = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [feeling, setFeeling] = useState<number>(0);
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardVisible(true);
            setKeyboardHeight(e.endCoordinates.height);
        });
        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            setKeyboardHeight(0);
        });
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    useEffect(() => {
        if (modalVisible) {
            setIsLoading(false);
            setTitle('');
            setContent('');
            setFeeling(0);
        }
    }, [modalVisible]);

    const submit = async () => {
        if (title.trim() === '' || content.trim() === '') {
            Alert.alert('Validation Error', 'Title and Content are required fields.');
            return;
        }
        setIsLoading(true)
        try {
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
        }catch(e) {
            setIsLoading(false);
            return;
        }
    }

    if ((!modalVisible))
        return (
            <TouchableOpacity onPress={async () => setModalVisible(true)} className="absolute bottom-4 self-center z-[2] bg-primary-500 rounded-full shadow-lg">
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
                            <AntDesign name="close-circle" size={24} color="#ff0000aa" />
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
                            <View className="flex-row flex-wrap gap-2">
                                {
                                    feelings.map((f:any, i:number) => {
                                        const selected = feeling === i;
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                disabled={isLoading}
                                                onPress={() => setFeeling(i)}
                                                className={`${isLoading && 'opacity-60'} w-[31%] items-center gap-1 px-2 py-3 rounded-xl border`}
                                                style={{
                                                    borderColor: selected ? f.bgcolor : '#e5e7eb',
                                                    backgroundColor: selected ? f.color + '1c' : 'transparent',
                                                }}
                                            >
                                                <FontAwesome6 name={f.name} size={24} color={f.bgcolor} />
                                                <Text className="text-xs font-semibold" style={{ color: f.bgcolor }}>
                                                    {f.label}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
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
                {keyboardVisible && (
                    <TouchableOpacity
                        onPress={() => Keyboard.dismiss()}
                        activeOpacity={0.8}
                        className="absolute right-6 z-10 bg-gray-400 rounded-full size-14 justify-center items-center shadow-lg"
                        style={{ bottom: keyboardHeight + 12 }}
                    >
                        <AntDesign name="down" size={18} color="#ffffff" />
                    </TouchableOpacity>
                )}
            </View>
        </Modal>
    )
}