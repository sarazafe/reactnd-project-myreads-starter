import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {BookShelf} from "./BookShelf";

/**
 * Component that displays all 'my' read books
 */
export const MyReads = ({bookShelves, onSelectedShelf}) => {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					{
						bookShelves.map(({shelf, books}) => (
							<BookShelf key={shelf} shelf={shelf} books={books} onSelectedShelf={onSelectedShelf}/>
						))
					}
				</div>
			</div>
			<div className="open-search">
				<Link
					to='/search'
				>Open search</Link>
			</div>
		</div>
	);
};

MyReads.propTypes = {
	bookShelves: PropTypes.array.isRequired,
	onSelectedShelf: PropTypes.func.isRequired,
};