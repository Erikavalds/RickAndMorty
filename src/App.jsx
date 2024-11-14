import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import CardInfo from './Components/CardInfo';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import SearchName from './Components/SearchName';
import './App.css';

function App() {
	const [location, setLocation] = useFetch();
	const [locationId, setLocationId] = useState(1);
	const [locationName, setLocationName] = useState('Earth (C-137)');

	useEffect(() => {
		setLocation(`https://rickandmortyapi.com/api/location/${locationId}`);
	}, [locationId]);

	return (
		<div>
			<div className="hero"></div>
			<div className="container">
				<Search setLocationId={setLocationId} />
				<SearchName setLocationName={setLocationName} />
				<CardInfo location={location} />
				<ResidentsList residents={location?.residents} />
			</div>
		</div>
	);
}

export default App;
