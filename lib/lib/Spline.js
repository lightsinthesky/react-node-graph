'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SVGComponent = require('./SVGComponent');

var _SVGComponent2 = _interopRequireDefault(_SVGComponent);

var Spline = (function (_React$Component) {
    _inherits(Spline, _React$Component);

    function Spline() {
        _classCallCheck(this, Spline);

        _React$Component.apply(this, arguments);
    }

    Spline.prototype.render = function render() {
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

        return _react2['default'].createElement(
            'g',
            null,
            _react2['default'].createElement('circle', { cx: start.x, cy: start.y, r: '3', fill: '#337ab7' }),
            _react2['default'].createElement('circle', { cx: end.x, cy: end.y, r: '3', fill: '#9191A8' }),
            _react2['default'].createElement('path', { className: 'connector', d: pathString })
        );
    };

    Spline.prototype.bezierCurve = function bezierCurve(a, b, cp1x, cp1y, cp2x, cp2y, x, y) {
        return 'M' + a + ',' + b + ' C' + cp1x + ',' + cp1y + ' ' + cp2x + ',' + cp2y + '  ' + x + ',' + y;
    };

    Spline.prototype.distance = function distance(a, b) {
        return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
    };

    return Spline;
})(_react2['default'].Component);

exports['default'] = Spline;
module.exports = exports['default'];
