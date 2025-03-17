import { Route } from '@/utils/types';
import CurrentlyTab from '@/app/(tabs)/index';
import TodayTab from '@/app/(tabs)/today';
import WeeklyTab from '@/app/(tabs)/weekly';

export const routes:Route[] = [
    { key: 'currently', title: 'Currently', icon: 'clock-time-five-outline' },
    { key: 'today', title: 'Today', icon: 'hours-24' },
    { key: 'weekly', title: 'Weekly', icon: 'calendar-week' }
]
  
export const renderScene = ({ route, geolocation, errorMsg, setErrorMsg }:{ route: Route, geolocation: {latitude: number, longitude: number} | null, errorMsg: string | null, setErrorMsg: (errorMsg: string | null) => void}) => {
    switch (route.key) {
        case 'currently':
        return <CurrentlyTab geolocation={geolocation} title={route.title} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />;
        case 'today':
        return <TodayTab geolocation={geolocation} title={route.title} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />;
        case 'weekly':
        return <WeeklyTab geolocation={geolocation} title={route.title} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />;
        default:
        return null;
    }
}