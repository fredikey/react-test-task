import { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "stores";
import './SearchInput.scss';

export const SearchInput = observer(() => {
    const { appStore } = useStore();
    const [query, setQuery] = useState('');
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            appStore.setQuery(query);
        }, 1000);
    }, [appStore, query]);

    return (
        <form className="search-form">
            <input type="search" placeholder="Search" onChange={event => setQuery(event.target.value)} />
        </form>
    )
});
