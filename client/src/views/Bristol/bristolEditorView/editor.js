import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default class Editor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: "<h1>introduction à JavaScript</h1><p>JavaScript est un langage dynamique multi-paradigme : il dispose de différents types, opérateurs, objets natifs et méthodes.</p>",
		};
		// You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value) {
		this.setState({ text: value });
	}

	render() {
		return <ReactQuill value={this.state.text} onChange={this.handleChange} />;
	}
}
