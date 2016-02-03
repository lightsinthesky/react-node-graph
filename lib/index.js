'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libNode = require('./lib/Node');

var _libNode2 = _interopRequireDefault(_libNode);

var _libSpline = require('./lib/Spline');

var _libSpline2 = _interopRequireDefault(_libSpline);

var _libSVGComponent = require('./lib/SVGComponent');

var _libSVGComponent2 = _interopRequireDefault(_libSVGComponent);

var _libUtil = require('./lib/util');

var index = (function (_React$Component) {
	_inherits(index, _React$Component);

	function index(props) {
		_classCallCheck(this, index);

		_get(Object.getPrototypeOf(index.prototype), 'constructor', this).call(this, props);

		this.state = {
			data: this.props.data,
			source: [],
			dragging: false
		};

		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
	}

	_createClass(index, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('mousemove', this.onMouseMove);
			document.addEventListener('mouseup', this.onMouseUp);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('mousemove', this.onMouseMove);
			document.removeEventListener('mouseup', this.onMouseUp);
		}
	}, {
		key: 'onMouseUp',
		value: function onMouseUp(e) {
			this.setState({ dragging: false });
		}
	}, {
		key: 'onMouseMove',
		value: function onMouseMove(e) {
			e.stopPropagation();
			e.preventDefault();

			var svg = this.refs.svgComponent.refs.svg;

			//Get svg element position to substract offset top and left
			var svgRect = svg.getBoundingClientRect();

			this.setState({
				mousePos: {
					x: e.pageX - svgRect.left,
					y: e.pageY - svgRect.top
				}
			});
		}
	}, {
		key: 'handleNodeStart',
		value: function handleNodeStart(nid) {
			this.props.onNodeStartMove(nid);
		}
	}, {
		key: 'handleNodeStop',
		value: function handleNodeStop(nid, pos) {
			this.props.onNodeMove(nid, pos);
		}
	}, {
		key: 'handleNodeMove',
		value: function handleNodeMove(index, pos) {
			var d = this.state.data;

			d.nodes[index].x = pos.left;
			d.nodes[index].y = pos.top;

			this.setState({ data: d });
		}
	}, {
		key: 'handleStartConnector',
		value: function handleStartConnector(nid, outputIndex) {
			this.setState({ dragging: true, source: [nid, outputIndex] });
		}
	}, {
		key: 'handleCompleteConnector',
		value: function handleCompleteConnector(nid, inputIndex) {
			if (this.state.dragging) {

				var nodes = this.state.data.nodes;
				var fromNode = this.getNodebyId(nodes, this.state.source[0]);
				var fromPinName = fromNode.fields.out[this.state.source[1]].name;
				var toNode = this.getNodebyId(nodes, nid);
				var toPinName = toNode.fields['in'][inputIndex].name;

				this.props.onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
			}
			this.setState({ dragging: false });
		}
	}, {
		key: 'computePinIndexfromLabel',
		value: function computePinIndexfromLabel(pins, pinLabel) {
			var reval = 0;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = pins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var pin = _step.value;

					if (pin.name === pinLabel) {
						return reval;
					} else {
						reval++;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'getNodebyId',
		value: function getNodebyId(nodes, nid) {
			var reval = 0;

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var node = _step2.value;

					if (node.nid === nid) {
						return nodes[reval];
					} else {
						reval++;
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			var nodes = this.state.data.nodes;
			var connectors = this.state.data.connections;

			var i = 0;
			var newConnector = null;

			if (this.state.dragging) {

				var sourceNode = this.getNodebyId(nodes, this.state.source[0]);
				var connectorStart = (0, _libUtil.computeOutOffsetByIndex)(sourceNode.x, sourceNode.y, this.state.source[1]);
				var connectorEnd = { x: this.state.mousePos.x, y: this.state.mousePos.y };

				newConnector = _react2['default'].createElement(_libSpline2['default'], {
					start: connectorStart,
					end: connectorEnd
				});
			}

			var splineIndex = 0;

			return _react2['default'].createElement(
				'div',
				null,
				nodes.map(function (node) {
					return _react2['default'].createElement(_libNode2['default'], {
						index: i++,
						nid: node.nid,
						color: '#000000',
						title: node.type,
						inputs: node.fields['in'],
						outputs: node.fields.out,
						pos: { x: node.x, y: node.y },
						key: node.nid,

						onNodeStart: function (nid) {
							return _this.handleNodeStart(nid);
						},
						onNodeStop: function (nid, pos) {
							return _this.handleNodeStop(nid, pos);
						},
						onNodeMove: function (index, pos) {
							return _this.handleNodeMove(index, pos);
						},

						onStartConnector: function (nid, outputIndex) {
							return _this.handleStartConnector(nid, outputIndex);
						},
						onCompleteConnector: function (nid, inputIndex) {
							return _this.handleCompleteConnector(nid, inputIndex);
						}
					});
				}),
				_react2['default'].createElement(
					_libSVGComponent2['default'],
					{ height: '100%', width: '100%', ref: 'svgComponent' },
					connectors.map(function (connector) {
						var fromNode = _this.getNodebyId(nodes, connector.from_node);
						var toNode = _this.getNodebyId(nodes, connector.to_node);

						var splinestart = (0, _libUtil.computeOutOffsetByIndex)(fromNode.x, fromNode.y, _this.computePinIndexfromLabel(fromNode.fields.out, connector.from));
						var splineend = (0, _libUtil.computeInOffsetByIndex)(toNode.x, toNode.y, _this.computePinIndexfromLabel(toNode.fields['in'], connector.to));

						return _react2['default'].createElement(_libSpline2['default'], {
							start: splinestart,
							end: splineend,
							key: splineIndex++
						});
					}),
					newConnector
				)
			);
		}
	}]);

	return index;
})(_react2['default'].Component);

exports['default'] = index;
module.exports = exports['default'];
/* render our connectors */ /* this is our new connector that only appears on dragging */