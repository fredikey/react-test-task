import { Title } from 'components/Title';
import { SearchInput } from 'components/SearchInput';
import { CitiesList } from 'components/CitiesList';
import './HomePage.scss';

export const HomePage = () => {
    return (
        <section className="home-page">
            <Title text="City List" />
            <SearchInput />
            <CitiesList />
        </section>
    )
}