import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import {Image} from 'react-native';
import type { SearchResult, SearcherProps } from "@/utils/types";
import axios from 'axios';
import { AxiosOptions } from '@/utils/utils';

export default function Searcher({searchPrompt, setSearcherActive, setGeolocation, setSearch, forceSearch, setForceSearch}:SearcherProps) {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, SetLoading] = useState<boolean>(false);
    const [warningMsg, setWarningMsg] = useState<{level: number;msg:string}|null>(null); // level 1: warning, level 2: error
    const timerRef = useRef<any>(null);

    async function handleSearch() {
        if (timerRef.current)
            clearTimeout(timerRef.current);

        timerRef.current = await setTimeout(() => {
            if (searchPrompt.trim().length >= 2)
            {
                setWarningMsg(null);
                SetLoading(true);
                axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchPrompt.trim())}&language=en&format=json`, AxiosOptions)
                .then(response => response.data)
                .then(data => {
                    if (data && data?.results && data.results?.length > 0)
                        setResults(data.results);
                    else
                        setResults([]);
                })
                .catch(err => {
                    setWarningMsg({level: 2, msg: 'The service connection is lost, please check your internet connection or try again later'});
                })
                .finally(() => {
                    SetLoading(false);
                });
            }
            else if (searchPrompt.trim().length === 1)
                setWarningMsg({level: 1, msg:'Please type at least 2 characters to search'});
        }, 600);
    }

    useEffect(() => {
        handleSearch();  
    }, [searchPrompt]);

    useEffect(() => {
        setResults([]);  
    }, []);

    useEffect(() => {
        if (!forceSearch)
            return;
        axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchPrompt.trim())}&count=1&language=en&format=json`, AxiosOptions)
        .then(response => response.data)
        .then(data => {
            if (data && data?.results && data.results?.length === 1){
                setGeolocation({
                    latitude: data?.results?.[0]?.latitude ?? -100,
                    longitude: data?.results?.[0]?.longitude ?? 0,
                    city: data?.results?.[0]?.name ?? searchPrompt,
                    region: data?.results?.[0]?.admin1 ??  '--',
                    country: data?.results?.[0]?.country ?? '--'
                });
            }else
                setGeolocation({latitude: -100, longitude: 0});
            setSearcherActive(false);
            setSearch('');
        })
        .catch(err => {
            setWarningMsg({level: 2, msg: 'The service connection is lost, please check your internet connection or try again later'});
        })
        .finally(() => {
            setForceSearch(false);
            SetLoading(false);
        });
    }, [forceSearch]);
    
    if (warningMsg !== null)
        return (<View className="flex-1 h-full p-10 items-center bg-gray-100 gap-4">
            <Text className={`text-lg font-bold text-center ${warningMsg.level === 2 && 'text-red-500'}`}>{warningMsg.msg}</Text>
        </View>)

    if (loading)
        return (<View className="flex-1 h-full justify-center items-center bg-gray-100">
            <ActivityIndicator size="large" color="#000000" />
            <Text className="text-lg font-bold">Loading...</Text>
        </View>)

    if ((searchPrompt.trim().length > 0) && results.length === 0)
        return (<View className="flex-1 h-full p-10 items-center bg-gray-100 gap-4">
                <Image className="w-[96] h-[75] mx-auto" source={require('@/assets/images/not-found.png')}/>
                <Text className="text-md leading-6 uppercase text-center font-semibold">No results found</Text>
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
                                region: (result.admin1 && result.admin1.length > 0) ? result.admin1 : '--',
                                country: result.country
                            });
                            setSearcherActive(false);
                            setSearch('');
                        }}
                    >
                        <Text className="text-lg font-bold">{result.name}</Text>
                        <Text className="text-lg">
                            {(result.admin1 && result.admin1.length > 0) ? result.admin1 : '__'},
                            {result.country}
                        </Text>
                    </TouchableOpacity>
                ))
                :
                <View className="gap-4 p-10">
                    <Image className="w-[96] h-[75] mx-auto" source={require('@/assets/images/search.png')}/>
                    <Text className="text-md leading-6 uppercase text-center font-semibold">
                        Please type a city to search for weather information
                    </Text>
                </View>
            }
        </ScrollView>
    );
}