import { Text, View, TouchableOpacity } from "react-native"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import feelings from '@/lib/feelings';
import { DiaryProps } from "@/lib/types";
import dayjs from 'dayjs';

export default function DiaryBox({i, onPress, data}:{i: number, onPress: Function, data: DiaryProps}) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                key={i}
                className="px-4 py-4 bg-white w-full flex-row justify-center items-center rounded-2xl gap-4"
                >
                <View className="size-11 justify-center items-center rounded-full" style={{backgroundColor: feelings[data.feeling].color + '1c'}}>
                    <FontAwesome6 name={feelings[data.feeling].name} size={24} color={feelings[data.feeling].color} />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-lg">{data.title}</Text>
                    <Text className="text-sm text-black">
                        {dayjs.unix(data.created_at / 1000).format('D MMMM YYYY')}
                    </Text>
                </View>
                <FontAwesome6 name="chevron-right" size={18} color="#cec07b" />
            </TouchableOpacity>
        </View>
    )
}