import React from 'react';

export default class NodeOutputListItem extends React.Component {
	
	onMouseDown(e) {
		e.stopPropagation();
  		e.preventDefault();

		this.props.onMouseDown(this.props.index);
	}

	noop(e) {
		e.stopPropagation();
  		e.preventDefault();
	}

	render() {
		return (
			<li onMouseDown={(e)=>this.onMouseDown(e)}>
				<a href="#" onClick={(e)=>this.noop(e)}>{this.props.item.name} <i className="fa fa-circle-o"></i></a>
			</li>
		);
	}
}
