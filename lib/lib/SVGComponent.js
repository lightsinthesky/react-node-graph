'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var SVGComponent = (function (_Component) {
  _inherits(SVGComponent, _Component);

  function SVGComponent() {
    _classCallCheck(this, SVGComponent);

    _Component.apply(this, arguments);
  }

  SVGComponent.prototype.render = function render() {
    return _react2['default'].createElement(
      'svg',
      _extends({ style: { position: 'absolute', zIndex: 9000 } }, this.props),
      this.props.children
    );
  };

  return SVGComponent;
})(_react.Component);

exports['default'] = SVGComponent;
module.exports = exports['default'];