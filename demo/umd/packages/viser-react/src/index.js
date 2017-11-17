"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SubComponent_1 = require("./components/SubComponent");
var Chart_1 = require("./components/Chart");
exports.Chart = Chart_1.default;
var View_1 = require("./components/View");
exports.View = View_1.default;
var FacetView_1 = require("./components/FacetView");
exports.FacetView = FacetView_1.default;
var Facet_1 = require("./components/Facet");
exports.Facet = Facet_1.default;
var Coord = (function (_super) {
    __extends(Coord, _super);
    function Coord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Coord';
        return _this;
    }
    return Coord;
}(SubComponent_1.default));
exports.Coord = Coord;
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Tooltip';
        return _this;
    }
    return Tooltip;
}(SubComponent_1.default));
exports.Tooltip = Tooltip;
var Legend = (function (_super) {
    __extends(Legend, _super);
    function Legend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Legend';
        return _this;
    }
    return Legend;
}(SubComponent_1.default));
exports.Legend = Legend;
var Guide = (function (_super) {
    __extends(Guide, _super);
    function Guide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Guide';
        return _this;
    }
    return Guide;
}(SubComponent_1.default));
exports.Guide = Guide;
var Axis = (function (_super) {
    __extends(Axis, _super);
    function Axis() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Axis';
        return _this;
    }
    return Axis;
}(SubComponent_1.default));
exports.Axis = Axis;
var Series = (function (_super) {
    __extends(Series, _super);
    function Series() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Series';
        return _this;
    }
    return Series;
}(SubComponent_1.default));
exports.Series = Series;
var Line = (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Line';
        return _this;
    }
    return Line;
}(SubComponent_1.default));
exports.Line = Line;
var Pie = (function (_super) {
    __extends(Pie, _super);
    function Pie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Pie';
        return _this;
    }
    return Pie;
}(SubComponent_1.default));
exports.Pie = Pie;
var Sector = (function (_super) {
    __extends(Sector, _super);
    function Sector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Sector';
        return _this;
    }
    return Sector;
}(SubComponent_1.default));
exports.Sector = Sector;
var SmoothLine = (function (_super) {
    __extends(SmoothLine, _super);
    function SmoothLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'SmoothLine';
        return _this;
    }
    return SmoothLine;
}(SubComponent_1.default));
exports.SmoothLine = SmoothLine;
var DashLine = (function (_super) {
    __extends(DashLine, _super);
    function DashLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'DashLine';
        return _this;
    }
    return DashLine;
}(SubComponent_1.default));
exports.DashLine = DashLine;
var Area = (function (_super) {
    __extends(Area, _super);
    function Area() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Area';
        return _this;
    }
    return Area;
}(SubComponent_1.default));
exports.Area = Area;
var StackArea = (function (_super) {
    __extends(StackArea, _super);
    function StackArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'StackArea';
        return _this;
    }
    return StackArea;
}(SubComponent_1.default));
exports.StackArea = StackArea;
var SmoothArea = (function (_super) {
    __extends(SmoothArea, _super);
    function SmoothArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'SmoothArea';
        return _this;
    }
    return SmoothArea;
}(SubComponent_1.default));
exports.SmoothArea = SmoothArea;
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Bar';
        return _this;
    }
    return Bar;
}(SubComponent_1.default));
exports.Bar = Bar;
var StackBar = (function (_super) {
    __extends(StackBar, _super);
    function StackBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'StackBar';
        return _this;
    }
    return StackBar;
}(SubComponent_1.default));
exports.StackBar = StackBar;
var DodgeBar = (function (_super) {
    __extends(DodgeBar, _super);
    function DodgeBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'DodgeBar';
        return _this;
    }
    return DodgeBar;
}(SubComponent_1.default));
exports.DodgeBar = DodgeBar;
var Point = (function (_super) {
    __extends(Point, _super);
    function Point() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Point';
        return _this;
    }
    return Point;
}(SubComponent_1.default));
exports.Point = Point;
var Waterfall = (function (_super) {
    __extends(Waterfall, _super);
    function Waterfall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Waterfall';
        return _this;
    }
    return Waterfall;
}(SubComponent_1.default));
exports.Waterfall = Waterfall;
var Funnel = (function (_super) {
    __extends(Funnel, _super);
    function Funnel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Funnel';
        return _this;
    }
    return Funnel;
}(SubComponent_1.default));
exports.Funnel = Funnel;
var Pyramid = (function (_super) {
    __extends(Pyramid, _super);
    function Pyramid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Pyramid';
        return _this;
    }
    return Pyramid;
}(SubComponent_1.default));
exports.Pyramid = Pyramid;
var RadialBar = (function (_super) {
    __extends(RadialBar, _super);
    function RadialBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'RadialBar';
        return _this;
    }
    return RadialBar;
}(SubComponent_1.default));
exports.RadialBar = RadialBar;
var Schema = (function (_super) {
    __extends(Schema, _super);
    function Schema() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Schema';
        return _this;
    }
    return Schema;
}(SubComponent_1.default));
exports.Schema = Schema;
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Box';
        return _this;
    }
    return Box;
}(SubComponent_1.default));
exports.Box = Box;
var Candle = (function (_super) {
    __extends(Candle, _super);
    function Candle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Candle';
        return _this;
    }
    return Candle;
}(SubComponent_1.default));
exports.Candle = Candle;
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Polygon';
        return _this;
    }
    return Polygon;
}(SubComponent_1.default));
exports.Polygon = Polygon;
var Contour = (function (_super) {
    __extends(Contour, _super);
    function Contour() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Contour';
        return _this;
    }
    return Contour;
}(SubComponent_1.default));
exports.Contour = Contour;
var Heatmap = (function (_super) {
    __extends(Heatmap, _super);
    function Heatmap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Heatmap';
        return _this;
    }
    return Heatmap;
}(SubComponent_1.default));
exports.Heatmap = Heatmap;
var Edge = (function (_super) {
    __extends(Edge, _super);
    function Edge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = 'Edge';
        return _this;
    }
    return Edge;
}(SubComponent_1.default));
exports.Edge = Edge;
//# sourceMappingURL=index.js.map