import React from 'react';
import Node from './lib/Node';
import Spline from './lib/Spline';
import SVGComponent from './lib/SVGComponent';

import {computeOutOffsetByIndex, computeInOffsetByIndex} from './lib/util';

export default class index extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data : this.props.data,
			source : [],
			dragging: false
		}

		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mouseup', this.onMouseUp);
	}

	componentWillUnmount() {
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);
	}

	onMouseUp(e) {
		this.setState({dragging:false, });
	}

	onMouseMove(e) {
		e.stopPropagation();
  		e.preventDefault();

  		const {svgComponent: {refs: {svg}}} = this.refs;

  		//Get svg element position to substract offset top and left 
  		const svgRect = svg.getBoundingClientRect();

		this.setState({
	      mousePos: {
	        x: e.pageX - svgRect.left,
	        y: e.pageY - svgRect.top
	      }
	    });
	}

	handleNodeStart(nid) {
		this.props.onNodeStartMove(nid);
	}

	handleNodeStop(nid, pos) {
		this.props.onNodeMove(nid, pos);
	}

	handleNodeMove(index, pos) {
		let d = this.state.data;

		d.nodes[index].x = pos.left;
		d.nodes[index].y = pos.top;

		this.setState({data : d});
	}

	handleStartConnector(nid, outputIndex) {
		this.setState({dragging:true, source:[nid,outputIndex] });
	}

	handleCompleteConnector(nid, inputIndex) {
		if (this.state.dragging) {

			let nodes = this.state.data.nodes;
			let fromNode = this.getNodebyId(nodes, this.state.source[0]);
			let fromPinName = fromNode.fields.out[this.state.source[1]].name;
			let toNode = this.getNodebyId(nodes, nid);
			let toPinName = toNode.fields.in[inputIndex].name;

			this.props.onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
		}
		this.setState({dragging:false});
	}

	handleRemoveConnector(connector) {
		if (this.props.onRemoveConnector) {
			this.props.onRemoveConnector(connector);
		}
	}

	computePinIndexfromLabel(pins, pinLabel) {
		let reval = 0;

		for (let pin of pins) {
			if (pin.name === pinLabel) {
				return reval;
			} else {
				reval++;
			}

		}
	}

	getNodebyId(nodes, nid) {
		let reval = 0;

		for (let node of nodes) {
			if (node.nid === nid) {
				return nodes[reval];
			} else {
				reval++;
			}
		}
	}


	render() {
		let nodes = this.state.data.nodes;
		let connectors = this.state.data.connections;
    let { mousePos } = this.state;

		let i = 0;
		let newConnector = null;

		if (this.state.dragging) {

			let sourceNode = this.getNodebyId(nodes, this.state.source[0]);
			let connectorStart = computeOutOffsetByIndex(sourceNode.x, sourceNode.y, this.state.source[1]);
			let connectorEnd = {x:this.state.mousePos.x, y:this.state.mousePos.y};
					
			newConnector = <Spline 
              				 start={connectorStart}
              				 end={connectorEnd}
              			 />
		}

		let splineIndex = 0;

		return (
			<div>
				{nodes.map((node)=> {
					return <Node 
    								index={i++} 
    								nid={node.nid}
    								color="#000000"
    								title={node.type}
    								inputs={node.fields.in}
    								outputs={node.fields.out}
    								pos={{x : node.x, y: node.y}}
    								key={node.nid} 

    								onNodeStart={(nid)=>this.handleNodeStart(nid)}
    								onNodeStop={(nid, pos)=>this.handleNodeStop(nid, pos)}
    								onNodeMove={(index,pos)=>this.handleNodeMove(index,pos)}
    								
    								onStartConnector={(nid, outputIndex)=>this.handleStartConnector(nid, outputIndex)}
    								onCompleteConnector={(nid, inputIndex)=>this.handleCompleteConnector(nid, inputIndex)}
    								/>
				})}
				
				{/* render our connectors */} 

				<SVGComponent height="100%" width="100%" ref="svgComponent">

					{connectors.map((connector)=> {
						let fromNode = this.getNodebyId(nodes,connector.from_node);
						let toNode = this.getNodebyId(nodes,connector.to_node);

						let splinestart = computeOutOffsetByIndex(fromNode.x, fromNode.y, this.computePinIndexfromLabel(fromNode.fields.out, connector.from));
						let splineend = computeInOffsetByIndex(toNode.x, toNode.y, this.computePinIndexfromLabel(toNode.fields.in, connector.to));

						return <Spline 
							start={splinestart}
							end={splineend}
							key={splineIndex++}
							mousePos={mousePos}
							onRemove={() => {this.handleRemoveConnector(connector)}}
						/>

					})}

					{/* this is our new connector that only appears on dragging */}
					{newConnector}

				</SVGComponent>
			</div>
		);
	}
}
