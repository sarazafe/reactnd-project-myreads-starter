import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from "./Book";
import PropTypes from "prop-types";

/**
 * Component that allows the user to search books and add it the his/her reads
 */
class SearchBooks extends Component {
	static propTypes = {
		onSelectedShelf: PropTypes.func.isRequired,
	};

	state = {
		books: [],
	};

	/**
	 * Handler for searching books when something is written on search input
	 * @param event - the event with the new query
	 */
	handleChange = event => {
		BooksAPI.search(event.target.value)
			.then(books => {
				this.setState(() => ({
					books,
				}));
			});
	};

	render() {
		const {onSelectedShelf} = this.props;
		const {books} = this.state;
		console.log(books.length);
		console.log(books);
		return (<div className="search-books">
			<div className="search-books-bar">
				<Link
					to='/'
					className='close-search'
				>Close</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						name="query"
						onChange={this.handleChange}
						placeholder="Search by title or author"/>
				</div>
			</div>
			<div className="search-books-results">
				{
					(books && books.length > 0) && (
						<ol className="books-grid">
							{books.map(book => (
								<li key={book.id}><Book book={book} onSelectedShelf={onSelectedShelf}/></li>
							))}
						</ol>
					)
				}
			</div>
		</div>);
	}
}

export default SearchBooks;