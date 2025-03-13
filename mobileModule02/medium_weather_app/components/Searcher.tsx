import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import {Image} from 'react-native';
import type { SearchResult, geolocationStateProps } from "@/utils/types";

interface SearcherProps {
    setSearcherActive: (active: boolean) => void;
    searchPrompt: string;
    setGeolocation: (geolocation: geolocationStateProps|null) => void;
}

export default function Searcher({searchPrompt, setSearcherActive, setGeolocation}:SearcherProps) {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, SetLoading] = useState<boolean>(false);
    const timerRef = useRef<any>(null);

    async function handleSearch() {
        if (timerRef.current)
            clearTimeout(timerRef.current);

        timerRef.current = await setTimeout(() => {
            if (searchPrompt.trim().length > 0)
            {
                SetLoading(true);
                fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchPrompt}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data?.results && data.results?.length > 0)
                        setResults(data.results);
                })
                .finally(() => {
                    SetLoading(false);
                });
            }
        }, 600);
    }

    useEffect(() => {
        handleSearch();  
    }, [searchPrompt]);

    useEffect(() => {
        setResults([]);  
    }, []);

    if (loading)
        return (<View className="flex-1 h-full justify-center items-center bg-gray-100">
            <ActivityIndicator size="large" color="#000000" />
            <Text className="text-lg font-bold">Loading...</Text>
        </View>)

    return (
        <ScrollView className="flex-1 h-full py-4 px-4 gap-2 bg-gray-100">
            {
                (searchPrompt.trim().length > 0) ? results.map((result, index) => (
                    <TouchableOpacity
                        key={'search_' + index}
                        className="flex flex-row items-center rounded-md border border-black/10 p-4 mb-2 bg-white gap-[5px]"
                        onPress={() => {
                            setGeolocation({
                                latitude: result.latitude,
                                longitude: result.longitude,
                                city: result.name,
                                region: result.admin1,
                                country: result.country
                            });
                            setSearcherActive(false);
                        }}
                    >
                        <Text className="text-lg font-bold">{result.name}</Text>
                        <Text className="text-lg">{result.admin1}, {result.country}</Text>
                    </TouchableOpacity>
                ))
                :
                <View className="gap-4 p-10">
                    <Image
                        className="w-[96] h-[75] mx-auto"
                        source={require('@/assets/images/search.png')}
                    />
                    <Text className="text-md leading-6 uppercase text-center font-semibold">
                        Please type a city to search for weather information
                    </Text>
                </View>
            }
        </ScrollView>
    );
}