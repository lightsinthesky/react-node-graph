"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var NodeInputListItem = (function (_React$Component) {
	_inherits(NodeInputListItem, _React$Component);

	function NodeInputListItem() {
		_classCallCheck(this, NodeInputListItem);

		_React$Component.apply(this, arguments);
	}

	NodeInputListItem.prototype.onMouseUp = function onMouseUp(e) {
		e.stopPropagation();
		e.preventDefault();

		this.props.onMouseUp(this.props.index);
	};

	NodeInputListItem.prototype.noop = function noop(e) {
		e.stopPropagation();
		e.preventDefault();
	};

	NodeInputListItem.prototype.render = function render() {
		var _this = this;

		var name = this.props.item.name;

		return _react2["default"].createElement(
			"li",
			null,
			_react2["default"].createElement(
				"a",
				{ onClick: function (e) {
						return _this.noop(e);
					}, onMouseUp: function (e) {
						return _this.onMouseUp(e);
					}, href: "#" },
				_react2["default"].createElement("i", { className: "fa fa-circle-o" }),
				name
			)
		);
	};

	return NodeInputListItem;
})(_react2["default"].Component);

exports["default"] = NodeInputListItem;
module.exports = exports["default"];