import { useMemo } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "stores";
import { CityWithUTCOffset } from 'types';
import './CityCard.scss';

function formatAMPM(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const strTime = `${hours}:${minutesStr} ${ampm}`;
    return strTime;
}

interface CityCardProps {
    city?: CityWithUTCOffset;
}

export const CityCard = observer(({ city }: CityCardProps) => {
    const { appStore } = useStore();

    const time = useMemo(() => {
        const date = new Date(appStore.timer + (city ? city.utcOffset * 60 * 1000 : 0));
        const str = formatAMPM(date);
        return str;
    }, [appStore.timer, city]);

    if (!city) return null;

    return (
        <div className="city-card">
            <div className="city-info">
                <img src={process.env.PUBLIC_URL + `/flags/${city.iso2}.svg`} alt="code"/>
                <div className="city-name">{city.country}, {city.city}</div>
            </div>
            <div>Time: {time}</div>
        </div>
    )
});
