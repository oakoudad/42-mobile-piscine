import { Text, View, TouchableOpacity } from "react-native"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import feelings from '@/lib/feelings';

export default function DiaryBox({i, onPress}:any) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                key={i}
                className="px-4 py-4 bg-white w-full flex-row justify-center items-center rounded-2xl gap-4"
                >
                <View className="size-11 justify-center items-center rounded-full" style={{backgroundColor: feelings[i%6].color + '1c'}}>
                    <FontAwesome6 name={feelings[i%6].name} size={24} color={feelings[i%6].color} />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-xl">sss</Text>
                    <Text className="text-sm">
                    1{i} March <Text className="opacity-80">2025</Text>
                    </Text>
                </View>
                <FontAwesome6 name="chevron-right" size={18} color="#cec07b" />
            </TouchableOpacity>
        </View>
    )
}