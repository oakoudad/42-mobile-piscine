import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Calendar} from 'react-native-calendars';
import { DiaryProps } from "@/lib/types";
import DiaryBox from "@/components/DiaryBox";
import { useUser } from "@/context/UserContext";
import { getDiaries } from "@/lib/asyncData";
import dayjs from "dayjs";
import CustomModal from "@/components/CustomModal";

export default function CalandarScreen() {
  const [selectedDiary, setSelectedDiary] = useState<DiaryProps>();
  const [modalVisible, setModalVisible] = useState(false);
  const [ entries, setEntries ] = useState<DiaryProps[] | null>([]);
  const [selected, setSelected] = useState(new Date().toISOString().split('T')[0]);
  const { profile } = useUser();
  const [refresh, setRefresh] = useState(false);
  const [dayEntries, setDayEntries] = useState<DiaryProps[] | null>([]);

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

  useEffect(() => {
    if (entries && selected) {
      const filteredEntries = entries.filter((entry) => dayjs.unix(entry.created_at / 1000).format('YYYY-MM-DD') === selected)?.sort((a, b) => b.created_at - a.created_at);
      setDayEntries(filteredEntries);
    }
  }, [entries, selected]);

  return (
    <SafeAreaView className="px-4 flex-1">
      <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} data={selectedDiary} onClosing={() => {setRefresh(!refresh)}}/>
      
      <View className="flex flex-col flex-1">
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {selected: true, disableTouchEvent: true}
            }}
          />
          {
            selected &&
            <View className="flex-1 items-center">
              <Text className="my-4">Selected Date: {selected}</Text>
              {dayEntries && dayEntries.length > 0 ?
                <ScrollView className="w-full" contentContainerStyle={{ gap: 10 }}>
                  {
                    dayEntries.map((data, i) => (
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
              : <Text className="text-gray-500">No entries for this date.</Text>}
            </View>
          }
      </View>
    </SafeAreaView>
  );
}
