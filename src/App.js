import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {MyReads} from "./MyReads";
import {SearchBooks} from "./SearchBooks";
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
	state = {
		books: [],
	}

	/**
	 * Retrieves all books whe component did mount
	 */
	componentDidMount() {
		BooksAPI.getAll()
			.then((books) => {
				this.setState(() => ({
					books
				}));
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

export default BooksApp
