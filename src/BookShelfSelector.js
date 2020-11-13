import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Shelves, ShelvesTitle} from "./constants";

/**
 * Component that displays the shelves selector
 */
class BookShelfSelector extends Component {
	static propTypes = {
		bookShelf: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {shelf: this.props.bookShelf};
	}

	render() {
		const {shelf} = this.state;
		return (
			<div className="book-shelf-changer">
				<select defaultValue={shelf}>
					<option value="move" disabled>Move to...</option>
					{
						Object.keys(Shelves).map(sf => (
							<option key={sf} value={sf}>{ShelvesTitle[sf]}</option>
						))
					}
					<option value="none">None</option>
				</select>
			</div>
		);
	}
}

export default BookShelfSelector;