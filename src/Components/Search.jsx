import { useRef, useState } from 'react';
import './search.css';

function Search({ setLocationId }) {
	const [error, setError] = useState('');
	const inputRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		const id = parseInt(inputRef.current.value);

		if (isNaN(id)) {
			setError('Invalid number');
			setTimeout(() => {
				setError('');
			}, 3000);
			return;
		}

		if (id < 1 || id > 126) {
			setError('Hey! You must provide an id from 1 to 126 😥');
			setTimeout(() => {
				setError('');
			}, 3000);
			return;
		}

		setLocationId(id);
		e.target.reset();
	};

	return (
		<form className="search" onSubmit={onSubmit}>
			<input
				className="search__input"
				ref={inputRef}
				type="number"
				placeholder="ID"
			/>
			<button className="search__btn">Search</button>
			<p className="search__error">{error && error}</p>
		</form>
	);
}

export default Search;
