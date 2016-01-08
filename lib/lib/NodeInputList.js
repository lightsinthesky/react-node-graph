'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NodeInputListItem = require('./NodeInputListItem');

var _NodeInputListItem2 = _interopRequireDefault(_NodeInputListItem);

var NodeInputList = (function (_React$Component) {
	_inherits(NodeInputList, _React$Component);

	function NodeInputList() {
		_classCallCheck(this, NodeInputList);

		_React$Component.apply(this, arguments);
	}

	NodeInputList.prototype.onMouseUp = function onMouseUp(i) {
		this.props.onCompleteConnector(i);
	};

	NodeInputList.prototype.render = function render() {
		var _this = this;

		var i = 0;

		return _react2['default'].createElement(
			'div',
			{ className: 'nodeInputWrapper' },
			_react2['default'].createElement(
				'ul',
				{ className: 'nodeInputList' },
				this.props.items.map(function (item) {
					return _react2['default'].createElement(_NodeInputListItem2['default'], { onMouseUp: function (i) {
							return _this.onMouseUp(i);
						}, index: i++, item: item });
				})
			)
		);
	};

	return NodeInputList;
})(_react2['default'].Component);

exports['default'] = NodeInputList;
module.exports = exports['default'];