import { CityWithUTCOffset } from 'types';
import Cities from 'assets/citites.json';
import ct from 'countries-and-timezones';

const timezones = ct.getAllTimezones();
const tzs = Object.keys(timezones);
const countryToOffsetMap: { [key: string]: number} = {};

tzs.forEach(tz => {
    const { countries, utcOffset } = timezones[tz as keyof typeof timezones];

    countries.forEach(country => {
        countryToOffsetMap[country] = utcOffset;
    });
});

const CitiesWithTimezoneOffsets: CityWithUTCOffset[] = Cities.map(city => {
    let utcOffset;

    if (city.timezone) {
        const tz = timezones[city.timezone as keyof typeof timezones];

        if (tz) {
            utcOffset = tz.utcOffset;
        }
    }

    if (!utcOffset) {
        utcOffset = countryToOffsetMap[city.iso2];
    }

    return { ...city, utcOffset };
});

export const getCities = (searchQuery?: string): Promise<CityWithUTCOffset[]> => {
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        const result = CitiesWithTimezoneOffsets.filter(item => item.city.toLowerCase().indexOf(lowerQuery) >= 0);
        return Promise.resolve(result);
    }

    return Promise.resolve([...CitiesWithTimezoneOffsets]);
}

