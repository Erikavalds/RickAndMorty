import { useEffect, useState } from 'react';
import './search.css';
import useFetch from '../hooks/useFetch';

function SearchName({ setLocationName }) {
	const [input, setInput] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [data, dataFetch, loading, error] = useFetch();

	const fetchSuggestions = (query) => {
		if (!query) {
			setSuggestions([]);
			return;
		}

		dataFetch(`https://rickandmortyapi.com/api/location/?name=${query}`);
	};

	useEffect(() => {
		if (data && data.results) {
			setSuggestions(data.results);
		}
	}, [data]);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInput(value);
		fetchSuggestions(value);
	};

	const handleSuggestionClick = (name) => {
		setLocationName(name);
		setInput('');
		setSuggestions([]);
	};

	return (
		<form className="search">
			<input
				className="search__input"
				value={input}
				onChange={handleInputChange}
				type="text"
				placeholder="Location name"
				list="locations"
				id="locations-choice"
				name="locations-choice"
			/>
			{loading && <p>Searching suggestions...</p>}
			{suggestions.length > 0 && (
				<datalist className="search__list" id="locations">
					{suggestions.map((suggestions) => (
						<option
							key={suggestions.id}
							className="search__suggestions-item"
							onChange={() => handleSuggestionClick(suggestions.name)}
							value={suggestions.name}
						></option>
					))}
				</datalist>
			)}

			<button className="search__btn" type="submit">
				Search
			</button>
		</form>
	);
}

export default SearchName;
