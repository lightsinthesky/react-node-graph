"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var NodeOutputListItem = (function (_React$Component) {
	_inherits(NodeOutputListItem, _React$Component);

	function NodeOutputListItem() {
		_classCallCheck(this, NodeOutputListItem);

		_React$Component.apply(this, arguments);
	}

	NodeOutputListItem.prototype.onMouseDown = function onMouseDown(e) {
		e.stopPropagation();
		e.preventDefault();

		this.props.onMouseDown(this.props.index);
	};

	NodeOutputListItem.prototype.noop = function noop(e) {
		e.stopPropagation();
		e.preventDefault();
	};

	NodeOutputListItem.prototype.render = function render() {
		var _this = this;

		return _react2["default"].createElement(
			"li",
			{ onMouseDown: function (e) {
					return _this.onMouseDown(e);
				} },
			_react2["default"].createElement(
				"a",
				{ href: "#", onClick: function (e) {
						return _this.noop(e);
					} },
				this.props.item.name,
				" ",
				_react2["default"].createElement("i", { className: "fa fa-circle-o" })
			)
		);
	};

	return NodeOutputListItem;
})(_react2["default"].Component);

exports["default"] = NodeOutputListItem;
module.exports = exports["default"];