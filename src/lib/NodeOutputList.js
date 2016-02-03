import React from 'react';

import NodeOutputListItem from './NodeOutputListItem';

export default class NodeOutputList extends React.Component {

	onMouseDown(i) {
		this.props.onStartConnector(i);
	}

	render() {
		let i = 0;

		return (
			<div className="nodeOutputWrapper">
			    <ul className="nodeOutputList">
					{this.props.items.map((item) => {
						return (
							<NodeOutputListItem onMouseDown={(i)=>this.onMouseDown(i)} key={i} index={i++} item={item} />
						)
					})}
				</ul>
			</div>
		);
	}
}
