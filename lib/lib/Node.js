'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NodeInputList = require('./NodeInputList');

var _NodeInputList2 = _interopRequireDefault(_NodeInputList);

var _NodeOutputList = require('./NodeOutputList');

var _NodeOutputList2 = _interopRequireDefault(_NodeOutputList);

var Draggable = require('react-draggable');

var Node = (function (_React$Component) {
  _inherits(Node, _React$Component);

  function Node() {
    _classCallCheck(this, Node);

    _React$Component.apply(this, arguments);
  }

  Node.prototype.handleDragStart = function handleDragStart(event, ui) {
    this.props.onNodeStart(this.props.nid, ui);
  };

  Node.prototype.handleDragStop = function handleDragStop(event, ui) {
    this.props.onNodeStop(this.props.nid, ui.position);
  };

  Node.prototype.handleDrag = function handleDrag(event, ui) {
    this.props.onNodeMove(this.props.index, ui.position);
  };

  Node.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return false;
  };

  Node.prototype.onStartConnector = function onStartConnector(index) {
    this.props.onStartConnector(this.props.nid, index);
  };

  Node.prototype.onCompleteConnector = function onCompleteConnector(index) {
    this.props.onCompleteConnector(this.props.nid, index);
  };

  Node.prototype.render = function render() {
    var _this = this;

    return _react2['default'].createElement(
      Draggable,
      {
        start: { x: this.props.pos.x, y: this.props.pos.y },
        handle: '.node-header',
        onStart: function (event, ui) {
          return _this.handleDragStart(event, ui);
        },
        onStop: function (event, ui) {
          return _this.handleDragStop(event, ui);
        },
        onDrag: function (event, ui) {
          return _this.handleDrag(event, ui);
        } },
      _react2['default'].createElement(
        'section',
        { className: 'node', style: { zIndex: 10000 } },
        _react2['default'].createElement(
          'header',
          { className: 'node-header', style: { backgroundColor: this.props.color } },
          _react2['default'].createElement(
            'span',
            { className: 'node-title' },
            this.props.title
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'node-content' },
          _react2['default'].createElement(_NodeInputList2['default'], { items: this.props.inputs, onCompleteConnector: function (index) {
              return _this.onCompleteConnector(index);
            } }),
          _react2['default'].createElement(_NodeOutputList2['default'], { items: this.props.outputs, onStartConnector: function (index) {
              return _this.onStartConnector(index);
            } })
        )
      )
    );
  };

  return Node;
})(_react2['default'].Component);

exports['default'] = Node;
module.exports = exports['default'];