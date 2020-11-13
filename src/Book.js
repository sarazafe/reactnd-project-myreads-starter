import React from 'react';
import PropTypes from "prop-types";
import BookShelfSelector from "./BookShelfSelector";

/**
 * Component that displays the info of a book
 */
export const Book = ({book, onSelectedShelf}) => {
	return (
		<div className="book">
			<div className="book-top">
				{
					book.imageLinks ? (
						<div className="book-cover" style={{
							backgroundImage: `url(${book.imageLinks.thumbnail})`
						}}>{}</div>
					) : <div className="book-cover book-cover-title">{book.title}</div>
				}

				<BookShelfSelector book={book} onSelectedShelf={onSelectedShelf}/>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors ? book.authors.join(', ') : '-'}</div>
		</div>
	);
};

Book.propTypes = {
	book: PropTypes.object.isRequired,
	onSelectedShelf: PropTypes.func.isRequired,
};