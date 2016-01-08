'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libNode = require('./lib/Node');

var _libNode2 = _interopRequireDefault(_libNode);

var _libSpline = require('./lib/Spline');

var _libSpline2 = _interopRequireDefault(_libSpline);

var _libUtil = require('./lib/util');

var _libSVGComponent = require('./lib/SVGComponent');

var _libSVGComponent2 = _interopRequireDefault(_libSVGComponent);

var index = (function (_React$Component) {
	_inherits(index, _React$Component);

	function index(props) {
		_classCallCheck(this, index);

		_React$Component.call(this, props);

		this.state = {
			data: this.props.data,
			startPos: {},
			source: [],
			dragging: false
		};
	}

	index.prototype.componentDidMount = function componentDidMount() {
		var _this = this;

		document.addEventListener('mousemove', function (e) {
			return _this.onMouseMove(e);
		});
		document.addEventListener('mouseup', function (e) {
			return _this.onMouseUp(e);
		});
	};

	index.prototype.componentWillUnmount = function componentWillUnmount() {
		var _this2 = this;

		document.removeEventListener('mousemove', function (e) {
			return _this2.onMouseMove(e);
		});
		document.removeEventListener('mouseup', function (e) {
			return _this2.onMouseUp(e);
		});
	};

	index.prototype.onMouseUp = function onMouseUp(e) {
		this.setState({ dragging: false });
	};

	index.prototype.onMouseMove = function onMouseMove(e) {
		e.stopPropagation();
		e.preventDefault();

		this.setState({
			mousePos: {
				x: e.pageX,
				y: e.pageY
			}
		});
	};

	index.prototype.handleNodeStart = function handleNodeStart(nid) {
		// let startNode = this.getNodebyId(nid);
		// this.setState({ startPos: {x:startNode.x, y:startNode.y}});
	};

	index.prototype.handleNodeStop = function handleNodeStop(nid, pos) {
		this.props.onNodeMove(nid, pos);
	};

	index.prototype.handleNodeMove = function handleNodeMove(index, pos) {
		var d = this.state.data;

		d.nodes[index].x = pos.left;
		d.nodes[index].y = pos.top;

		this.setState({ data: d });
	};

	// new connector handlers

	index.prototype.handleStartConnector = function handleStartConnector(nid, outputIndex) {
		this.setState({ dragging: true, source: [nid, outputIndex] });
	};

	index.prototype.handleCompleteConnector = function handleCompleteConnector(nid, inputIndex) {

		if (this.state.dragging) {

			var nodes = this.state.data.nodes;

			var fromNode = this.getNodebyId(nodes, this.state.source[0]);
			var fromPinName = fromNode.fields.out[this.state.source[1]].name;

			var toNode = this.getNodebyId(nodes, nid);
			var toPinName = toNode.fields['in'][inputIndex].name;

			this.props.onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
		}
		this.setState({ dragging: false });
	};

	index.prototype.computePinIndexfromLabel = function computePinIndexfromLabel(pins, pinLabel) {
		var reval = 0;

		for (var _iterator = pins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;

			if (_isArray) {
				if (_i >= _iterator.length) break;
				_ref = _iterator[_i++];
			} else {
				_i = _iterator.next();
				if (_i.done) break;
				_ref = _i.value;
			}

			var pin = _ref;

			if (pin.name === pinLabel) {
				return reval;
			} else {
				reval++;
			}
		}
	};

	index.prototype.getNodebyId = function getNodebyId(nodes, nid) {
		var reval = 0;

		for (var _iterator2 = nodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
			var _ref2;

			if (_isArray2) {
				if (_i2 >= _iterator2.length) break;
				_ref2 = _iterator2[_i2++];
			} else {
				_i2 = _iterator2.next();
				if (_i2.done) break;
				_ref2 = _i2.value;
			}

			var node = _ref2;

			if (node.nid === nid) {
				return nodes[reval];
			} else {
				reval++;
			}
		}
	};

	index.prototype.render = function render() {
		var _this3 = this;

		var nodes = this.state.data.nodes;
		var connectors = this.state.data.connections;

		var i = 0;

		var newConnector = null;

		if (this.state.dragging) {

			var sourceNode = this.getNodebyId(nodes, this.state.source[0]);
			var connectorStart = _libUtil.computeOutOffsetByIndex(sourceNode.x, sourceNode.y, this.state.source[1]);
			var connectorEnd = { x: this.state.mousePos.x, y: this.state.mousePos.y };

			newConnector = _react2['default'].createElement(_libSpline2['default'], {
				start: connectorStart,
				end: connectorEnd
			});
		}

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

					onNodeStart: function (nid) {
						return _this3.handleNodeStart(nid);
					},
					onNodeStop: function (nid, pos) {
						return _this3.handleNodeStop(nid, pos);
					},
					onNodeMove: function (index, pos) {
						return _this3.handleNodeMove(index, pos);
					},

					onStartConnector: function (nid, outputIndex) {
						return _this3.handleStartConnector(nid, outputIndex);
					},
					onCompleteConnector: function (nid, inputIndex) {
						return _this3.handleCompleteConnector(nid, inputIndex);
					}
				});
			}),
			_react2['default'].createElement(
				_libSVGComponent2['default'],
				{ height: '100%', width: '100%' },
				connectors.map(function (connector) {
					var fromNode = _this3.getNodebyId(nodes, connector.from_node);
					var toNode = _this3.getNodebyId(nodes, connector.to_node);

					var splinestart = _libUtil.computeOutOffsetByIndex(fromNode.x, fromNode.y, _this3.computePinIndexfromLabel(fromNode.fields.out, connector.from));
					var splineend = _libUtil.computeInOffsetByIndex(toNode.x, toNode.y, _this3.computePinIndexfromLabel(toNode.fields['in'], connector.to));

					return _react2['default'].createElement(_libSpline2['default'], {
						start: splinestart,
						end: splineend
					});
				}),
				newConnector
			)
		);
	};

	return index;
})(_react2['default'].Component);

exports['default'] = index;
module.exports = exports['default'];
/* render our connectors */ /* this is our new connector that only appears on dragging */