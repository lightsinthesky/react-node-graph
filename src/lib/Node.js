import React, { PropTypes } from "react";
import onClickOutside from "react-onclickoutside";

var Draggable = require("react-draggable");

import NodeInputList from "./NodeInputList";
import NodeOuputList from "./NodeOutputList";

import nodestyle from "./styles/node";
import nodeContentstyle from "./styles/nodeContent";
import nodeHeaderstyle from "./styles/nodeHeader";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  handleDragStart(event, ui) {
    this.props.onNodeStart(this.props.nid, ui);
  }

  handleDragStop(event, ui) {
    this.props.onNodeStop(this.props.nid, { x: ui.x, y: ui.y });
  }

  handleDrag(event, ui) {
    this.props.onNodeMove(this.props.index, { x: ui.x, y: ui.y });
  }

  onStartConnector(index) {
    this.props.onStartConnector(this.props.nid, index);
  }

  onCompleteConnector(index) {
    this.props.onCompleteConnector(this.props.nid, index);
  }

  handleClick(e) {
    this.setState({ selected: true });
    if (this.props.onNodeSelect) {
      this.props.onNodeSelect(this.props.nid);
    }
  }

  handleClickOutside() {
    let { selected } = this.state;
    if (this.props.onNodeDeselect && selected) {
      this.props.onNodeDeselect(this.props.nid);
    }
    this.setState({ selected: false });
  }

  render() {
    let { grid } = this.props;
    let { selected } = this.state;

    let nodeClass = "node" + (selected ? " selected" : "");

    return (
      <div
        onDoubleClick={e => {
          this.handleClick(e);
        }}
      >
        <Draggable
          position={{ x: this.props.pos.x, y: this.props.pos.y }}
          handle=".node-header"
          grid={grid}
          onStart={(event, ui) => this.handleDragStart(event, ui)}
          onStop={(event, ui) => this.handleDragStop(event, ui)}
          onDrag={(event, ui) => this.handleDrag(event, ui)}
        >
          <section style={nodestyle}>
            <header className="node-header" style={nodeHeaderstyle}>
              <span className="node-title">{this.props.title}</span>
            </header>
            <div style={nodeContentstyle}>
              <NodeInputList
                items={this.props.inputs}
                onCompleteConnector={index => this.onCompleteConnector(index)}
              />
              <NodeOuputList
                items={this.props.outputs}
                onStartConnector={index => this.onStartConnector(index)}
              />
            </div>
          </section>
        </Draggable>
      </div>
    );
  }
}

export default onClickOutside(Node);
