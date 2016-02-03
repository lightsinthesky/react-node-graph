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

var _NodeInputList = require('./NodeInputList');

var _NodeInputList2 = _interopRequireDefault(_NodeInputList);

var _NodeOutputList = require('./NodeOutputList');

var _NodeOutputList2 = _interopRequireDefault(_NodeOutputList);

var Draggable = require('react-draggable');

var Node = (function (_React$Component) {
  _inherits(Node, _React$Component);

  function Node() {
    _classCallCheck(this, Node);

    _get(Object.getPrototypeOf(Node.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Node, [{
    key: 'handleDragStart',
    value: function handleDragStart(event, ui) {
      this.props.onNodeStart(this.props.nid, ui);
    }
  }, {
    key: 'handleDragStop',
    value: function handleDragStop(event, ui) {
      this.props.onNodeStop(this.props.nid, ui.position);
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(event, ui) {
      this.props.onNodeMove(this.props.index, ui.position);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
  }, {
    key: 'onStartConnector',
    value: function onStartConnector(index) {
      this.props.onStartConnector(this.props.nid, index);
    }
  }, {
    key: 'onCompleteConnector',
    value: function onCompleteConnector(index) {
      this.props.onCompleteConnector(this.props.nid, index);
    }
  }, {
    key: 'render',
    value: function render() {
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
    }
  }]);

  return Node;
})(_react2['default'].Component);

exports['default'] = Node;
module.exports = exports['default'];