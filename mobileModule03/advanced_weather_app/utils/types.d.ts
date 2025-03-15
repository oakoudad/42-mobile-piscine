import * as Location from 'expo-location';

export interface GeolocationProps {
    title?: string;
    geolocation: geolocationStateProps | null;
    errorMsg: string | null;
    setErrorMsg: (msg: string | null) => void;
}

export interface Route {
    key: string;
    title: string;
    icon: string;
}

export interface geolocationStateProps {
    latitude: number,
    longitude: number,
    city?: string,
    region?: string,
    country?: string
}

export interface SearchResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin3_id: number;
    timezone: string;
    population: number;
    country_id: number;
    country: string;
    admin1: string;
    admin3: string;
}

export interface AppBarProps {
    setGeolocation: (geolocation: geolocationStateProps | null) => void;
    setErrorMsg: (msg: string | null) => void;
    setSearcherActive: (active: boolean) => void;
    searcherActive: boolean;
}

export interface SearcherProps {
    setSearch: (search: string) => void;
    setSearcherActive: (active: boolean) => void;
    searchPrompt: string;
    setGeolocation: (geolocation: geolocationStateProps|null) => void;
    forceSearch: boolean;
    setForceSearch: (force: boolean) => void;
}