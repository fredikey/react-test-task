interface City {
    city: string;
    city_ascii: string;
    lat: number;
    lng: number;
    pop: number;
    country: string;
    iso2: string;
    iso3: string;
    province: string;
    timezone: string | null;
}

export interface CityWithUTCOffset extends City {
    utcOffset: number;
}