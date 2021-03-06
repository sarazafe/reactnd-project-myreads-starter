import React from 'react';
import PropTypes from "prop-types";
import {ShelvesTitle} from "./constants";
import {Book} from "./Book";

/**
 * Component that displays the books of a shelf
 */
export const BookShelf = ({shelf, books, onSelectedShelf}) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{ShelvesTitle[shelf]}</h2>
			<div className="bookshelf-books">
				{
					books.length > 0 ? (
							<ol className="books-grid">
								{
									books.map(book => (
										<li key={book.id}><Book book={book} onSelectedShelf={onSelectedShelf}/></li>
									))
								}
							</ol>
						) :
						<div className="noBooks-container">There is not any book on <span
							className="important">{ShelvesTitle[shelf]}</span> shelf</div>
				}
			</div>
		</div>
	);
};

BookShelf.propTypes = {
	shelf: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onSelectedShelf: PropTypes.func.isRequired,
};