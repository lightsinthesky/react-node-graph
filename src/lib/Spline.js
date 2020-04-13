import React from 'react';
import onClickOutside from 'react-onclickoutside';

import TrashIcon from './TrashIcon';


class Spline extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selected: false,
        position: { x: 0, y: 0 }
      }
    }

    handleClick(e) {
      this.setState({
        selected: !this.state.selected,
        position: this.props.mousePos
      });

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }

    handleClickOutside(e) {
      this.setState({selected: false});

      if (this.props.onClickOutside) {
        this.props.onClickOutside(e);
      }
    }

    handleRemove(e) {
      this.setState({selected: false});

      if (this.props.onRemove) {
        this.props.onRemove(e);
      }
    }

    render() {
        let {selected, position} = this.state;

        let {start, end} = this.props;

        let dist = this.distance([start.x,start.y],[end.x, end.y]);

        let pathString = this.bezierCurve(start.x,                  // start x
                                          start.y,                  // start y
                                          start.x + dist * 0.25,    // cp1 x
                                          start.y,                  // cp1 y
                                          end.x - dist * 0.75 ,     // cp2 x
                                          end.y,                    // cp2 y
                                          end.x ,                   // end x
                                          end.y);                   // end y

        let className = 'connector' + (selected ? ' selected' : '');

        return (
                <g>
                <circle cx={start.x} cy={start.y} r="3"  fill="#337ab7" />
                <circle cx={end.x} cy={end.y} r="3"  fill="#9191A8" />
                <path className="connector-click-area" d={pathString} onClick={(e) => {this.handleClick(e)}} />
                <path className={className} d={pathString} onClick={(e) => {this.handleClick(e)}} />
                { selected ?
                    <TrashIcon position={position}
                               onClick={(e) => {this.handleRemove(e)}}
                    />
                : null }
                </g>


        );
    }

    bezierCurve(a,b,cp1x,cp1y,cp2x,cp2y,x,y) {
        return `M${a},${b} C${cp1x},${cp1y} ${cp2x},${cp2y}  ${x},${y}`;
    }

    distance(a,b) {
        return Math.sqrt( (b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]) );
    }
}

export default onClickOutside(Spline)