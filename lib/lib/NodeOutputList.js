'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NodeOutputListItem = require('./NodeOutputListItem');

var _NodeOutputListItem2 = _interopRequireDefault(_NodeOutputListItem);

var NodeOutputList = (function (_React$Component) {
	_inherits(NodeOutputList, _React$Component);

	function NodeOutputList() {
		_classCallCheck(this, NodeOutputList);

		_React$Component.apply(this, arguments);
	}

	NodeOutputList.prototype.onMouseDown = function onMouseDown(i) {
		this.props.onStartConnector(i);
	};

	NodeOutputList.prototype.render = function render() {
		var _this = this;

		var i = 0;

		return _react2['default'].createElement(
			'div',
			{ className: 'nodeOutputWrapper' },
			_react2['default'].createElement(
				'ul',
				{ className: 'nodeOutputList' },
				this.props.items.map(function (item) {
					return _react2['default'].createElement(_NodeOutputListItem2['default'], { onMouseDown: function (i) {
							return _this.onMouseDown(i);
						}, index: i++, item: item });
				})
			)
		);
	};

	return NodeOutputList;
})(_react2['default'].Component);

exports['default'] = NodeOutputList;
module.exports = exports['default'];