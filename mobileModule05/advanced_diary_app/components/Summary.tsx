import { Text, View } from "react-native"
import { DiaryProps } from "@/lib/types";
import feelings from '@/lib/feelings';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Summary({entries}:{entries: DiaryProps[] | null}) {
    if (!entries || entries.length === 0)
        return <></>;
    return (
        <View className="bg-white rounded-2xl overflow-hidden gap-2">
            {
                feelings.map((feeling: any, i: number) => {
                    const persontage = (entries.filter((entry) => entry.feeling === i).length / entries.length) * 100;
                    return (
                        <View key={feeling.label} className="relative w-full ">
                            <View
                                className="absolute top-0 left-0 h-full border-r rounded-r-lg"
                                style={{ width: `${persontage}%`, backgroundColor: feeling.color + '22', borderColor: feeling.color }}
                            />
                            <View className="flex flex-row justify-between items-center py-2 px-3">
                                <View className="flex flex-row items-center gap-2">
                                    <View className="size-8 justify-center items-center rounded-full" style={{backgroundColor: feeling.color}}>
                                        <FontAwesome6 name={feeling.name} size={16} color={feeling.bgcolor}/>
                                    </View>
                                    <Text className="text-md font-semibold" style={{color: feeling.bgcolor}}>
                                        {feeling.label}
                                    </Text>
                                </View>
                                <Text className="text-md text-black font-semibold">{persontage.toFixed(1)}%</Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}