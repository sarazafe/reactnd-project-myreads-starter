import React, {Component} from 'react';
import PropTypes from "prop-types";
import BookShelfSelector from "./BookShelfSelector";

/**
 * Component that displays the info of a book
 */
class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		onSelectedShelf: PropTypes.func.isRequired,
	}

	render() {
		const {book, onSelectedShelf} = this.props;
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${book.imageLinks.thumbnail})`
					}}></div>
					<BookShelfSelector book={book} onSelectedShelf={onSelectedShelf}/>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors.join(', ')}</div>
			</div>
		);
	}
}

export default Book;