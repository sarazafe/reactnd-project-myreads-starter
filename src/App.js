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
		books: [],
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
				books: [...currentState.books, {
					shelf,
					books: filteredBooks
				}],
			}));
		});
	};

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

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<MyReads
						books={this.state.books}
					/>
				)}/>
				<Route path='/search' component={SearchBooks}/>
			</div>
		)
	}
}

export default BooksApp;
