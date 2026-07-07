import { Text, View, TouchableOpacity } from "react-native"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import feelings from '@/lib/feelings';
import { DiaryProps } from "@/lib/types";
import dayjs from 'dayjs';

export default function DiaryBox({i, onPress, data}:{i: number, onPress: () => void, data: DiaryProps}) {
    // Ensure feeling index is valid (0-5), default to 5 (Normal) if invalid
    const feelingIndex = (data.feeling >= 0 && data.feeling < feelings.length) ? data.feeling : 5;
    const feeling = feelings[feelingIndex];

    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                key={i}
                className={`px-4 py-4 bg-white w-full flex-row justify-center items-center rounded-2xl gap-4`}
                >
                <View className="size-11 justify-center items-center rounded-full" style={{backgroundColor: feeling.color}}>
                    <FontAwesome6 name={feeling.name} size={24} color={feeling.bgcolor}/>
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-lg line-clamp-1">{data.title}</Text>
                    <Text className="text-sm text-black">
                        {dayjs.unix(data.created_at / 1000).format('D MMMM YYYY')}
                    </Text>
                </View>
                <FontAwesome6 name="chevron-right" size={18} color="#cec07b" />
            </TouchableOpacity>
        </View>
    )
}