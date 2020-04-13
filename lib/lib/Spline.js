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

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _TrashIcon = require('./TrashIcon');

var _TrashIcon2 = _interopRequireDefault(_TrashIcon);

var Spline = (function (_React$Component) {
  _inherits(Spline, _React$Component);

  function Spline(props) {
    _classCallCheck(this, Spline);

    _get(Object.getPrototypeOf(Spline.prototype), 'constructor', this).call(this, props);
    this.state = {
      selected: false,
      position: { x: 0, y: 0 }
    };
  }

  _createClass(Spline, [{
    key: 'handleClick',
    value: function handleClick(e) {
      this.setState({
        selected: !this.state.selected,
        position: this.props.mousePos
      });

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(e) {
      this.setState({ selected: false });

      if (this.props.onClickOutside) {
        this.props.onClickOutside(e);
      }
    }
  }, {
    key: 'handleRemove',
    value: function handleRemove(e) {
      this.setState({ selected: false });

      if (this.props.onRemove) {
        this.props.onRemove(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _state = this.state;
      var selected = _state.selected;
      var position = _state.position;
      var _props = this.props;
      var start = _props.start;
      var end = _props.end;

      var dist = this.distance([start.x, start.y], [end.x, end.y]);

      var pathString = this.bezierCurve(start.x, // start x
      start.y, // start y
      start.x + dist * 0.25, // cp1 x
      start.y, // cp1 y
      end.x - dist * 0.75, // cp2 x
      end.y, // cp2 y
      end.x, // end x
      end.y); // end y

      var className = 'connector' + (selected ? ' selected' : '');

      return _react2['default'].createElement(
        'g',
        null,
        _react2['default'].createElement('circle', { cx: start.x, cy: start.y, r: '3', fill: '#337ab7' }),
        _react2['default'].createElement('circle', { cx: end.x, cy: end.y, r: '3', fill: '#9191A8' }),
        _react2['default'].createElement('path', { className: 'connector-click-area', d: pathString, onClick: function (e) {
            _this.handleClick(e);
          } }),
        _react2['default'].createElement('path', { className: className, d: pathString, onClick: function (e) {
            _this.handleClick(e);
          } }),
        selected ? _react2['default'].createElement(_TrashIcon2['default'], { position: position,
          onClick: function (e) {
            _this.handleRemove(e);
          }
        }) : null
      );
    }
  }, {
    key: 'bezierCurve',
    value: function bezierCurve(a, b, cp1x, cp1y, cp2x, cp2y, x, y) {
      return 'M' + a + ',' + b + ' C' + cp1x + ',' + cp1y + ' ' + cp2x + ',' + cp2y + '  ' + x + ',' + y;
    }
  }, {
    key: 'distance',
    value: function distance(a, b) {
      return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
    }
  }]);

  return Spline;
})(_react2['default'].Component);

exports['default'] = (0, _reactOnclickoutside2['default'])(Spline);
module.exports = exports['default'];