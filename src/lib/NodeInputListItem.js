import React from 'react';

export default class NodeInputListItem extends React.Component {

	onMouseUp(e) {
		e.stopPropagation();
  		e.preventDefault();

		this.props.onMouseUp(this.props.index);
	}

	noop(e) {
		e.stopPropagation();
  		e.preventDefault();
	}

	render() {
		let {name} = this.props.item;

		return (
			<li>
				<a onClick={(e)=>this.noop(e)} onMouseUp={(e)=>this.onMouseUp(e)} href="#"><i className="fa fa-circle-o"></i>{name}</a>
			</li>
		);			
	}
}
