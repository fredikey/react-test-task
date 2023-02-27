
import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "stores";
import { getCities } from "api";
import { CityCard } from 'components/CityCard';
import {
    AutoSizer as _AutoSizer,
    List as _List,
    ListProps,
    AutoSizerProps,
} from "react-virtualized";

const List = _List as unknown as FC<ListProps>;
const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>;


export const CitiesList = observer(() => {
    const { appStore } = useStore();

    useEffect(() => {
        getCities(appStore.query).then(cities => {
            appStore.setCities(cities);
        });
    }, [appStore, appStore.cities, appStore.query]);

    return (
        <div>
            <AutoSizer disableHeight>
                {({ width }) => (
                    <List
                        height={500}
                        rowCount={appStore.cities.length}
                        rowHeight={140}
                        overscanRowCount={10}
                        rowRenderer={({ index, key, style }) => {
                            const item = appStore.cities[index];

                            return (
                                <div key={key} style={style}>
                                    <CityCard city={item} />
                                </div>
                            );
                        }}
                        width={width}
                    />
                )}
            </AutoSizer>
        </div>
    );
});
