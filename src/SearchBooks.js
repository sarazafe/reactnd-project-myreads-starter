import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import {Book} from "./Book";
import PropTypes from "prop-types";

/**
 * Component that allows the user to search books and add it the his/her reads
 */
class SearchBooks extends Component {
	static propTypes = {
		bookShelves: PropTypes.array.isRequired,
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
			.then(res => {
				// Check if there is an error
				if (res.error) {
					this.handleError();
				} else {
					// Extract books on shelves into an array
					const booksOnShelves = this.props.bookShelves.map(bS => (bS.books))
						.reduce((acc, val) => acc.concat(val), []);

					// Process the books of the search to set shelf property in case that the book is on a shelf
					const books = [...res];
					books.forEach(book => {
						const bookOnShelf = booksOnShelves.find(b => (b.id === book.id));
						if (bookOnShelf) {
							book.shelf = bookOnShelf.shelf;
						}
					});

					this.setState(() => ({
						books,
					}));
				}
			})
			.catch(() => { // On error
				this.handleError();
			});
	};

	/**
	 * When there is an error, the list of books will be empty
	 */
	handleError = ()=>{
		this.setState(() => ({
			books: [],
		}));
	};

	render() {
		const {onSelectedShelf} = this.props;
		const {books} = this.state;
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