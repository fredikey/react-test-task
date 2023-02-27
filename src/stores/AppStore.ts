import { makeAutoObservable } from "mobx";
import { CityWithUTCOffset } from 'types';

const now = new Date();
const baseTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // no utc offset

export const appStore = makeAutoObservable({
    cities: [] as CityWithUTCOffset[],
    setCities: (cities: CityWithUTCOffset[]) => {
        appStore.cities = cities;
    },
    query: '',
    setQuery: (query: string) => {
        appStore.query = query;
    },
    timer: baseTime,
    increaseTimer(val: number) {
        appStore.timer += val;
    }
});

const updateClock = () => {
    const date = new Date(appStore.timer);
    const ms = date.getMilliseconds();
    const s = date.getSeconds();
    const tillNextMin = (60 - s) * 1000 - ms;

    setTimeout(() => {
        appStore.increaseTimer(tillNextMin);
        updateClock();
    }, tillNextMin);
}

updateClock();
