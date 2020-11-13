import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Shelves, ShelvesTitle, None} from "./constants";

/**
 * Component that displays the shelves selector
 */
class BookShelfSelector extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		onSelectedShelf: PropTypes.func.isRequired,
	}

	/**
	 * Handler for on change event on selector. Calls to the function that reclassify the
	 * book to assign to selected shelf
	 * @param event - the event
	 */
	handleChange = event =>{
		const {book, onSelectedShelf} = this.props;
		onSelectedShelf({book, shelf: event.target.value});
	};

	render() {
		const {shelf} = this.props.book;
		return (
			<div className="book-shelf-changer">
				<select value={shelf} defaultValue={None} onChange={this.handleChange}>
					<option value="move" disabled>Move to...</option>
					{
						Object.keys(Shelves).map(sf => (
							<option key={sf} value={sf}>{ShelvesTitle[sf]}</option>
						))
					}
					<option value={None}>{None.replace(/^\w/, (c) => c.toUpperCase())}</option>
				</select>
			</div>
		);
	}
}

export default BookShelfSelector;