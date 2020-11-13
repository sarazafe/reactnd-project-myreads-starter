import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {MyReads} from "./MyReads";
import {SearchBooks} from "./SearchBooks";
import {Route} from 'react-router-dom';
import {Shelves} from "./constants";

class BooksApp extends React.Component {

	/**
	 * The state with the books of each shelf
	 */
	state = {
		bookShelves: [],
	}

	/**
	 * Retrieves all books whe component did mount
	 */
	componentDidMount() {
		BooksAPI.getAll()
			.then((books) => {
				// Classify the books and update the state
				this.classifyBooks(books);
			});
	}

	/**
	 * Classifies the books to fill the state with this information
	 * @param books - the list of books to classify
	 */
	classifyBooks = (books) => {
		Object.keys(Shelves).forEach(shelf => {
			// Filter books for the current shelf
			const filteredBooks = books.filter(book => book.shelf === shelf);

			// Update the state with the books of the current shelf
			this.setState((currentState)=>({
				bookShelves: [...currentState.bookShelves, {
					shelf,
					books: filteredBooks
				}],
			}));
		});
	};

	/**
	 * Assigns the book to a new shelf. If the value of the shelf is not one of these ones:
	 * - currentlyReading
	 * - wantToRead
	 * - read
	 * the shelf of the book will be assigned to an empty string
	 * @param book - the book to be updated
	 * @param shelf - the shelf to be assigned to the book
	 */
	reclassifyBook = ({book, shelf}) => {
		console.log(`${book.title} to ${shelf}`);
	}

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<MyReads
						bookShelves={this.state.bookShelves}
						onSelectedShelf={this.reclassifyBook}
					/>
				)}/>
				<Route path='/search' component={SearchBooks}/>
			</div>
		)
	}
}

export default BooksApp;
