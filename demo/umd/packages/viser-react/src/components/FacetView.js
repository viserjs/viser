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
var React = require("react");
var PropTypes = require("prop-types");
function generateRandomNum() {
    return (Math.floor(new Date().getTime() + Math.random() * 10000)).toString();
}
var FacetView = (function (_super) {
    __extends(FacetView, _super);
    function FacetView(props) {
        var _this = _super.call(this, props) || this;
        _this.displayName = 'FacetView';
        _this.state = {
            hasInViews: true,
            viewId: generateRandomNum(),
            viewType: 'facet',
        };
        return _this;
    }
    FacetView.prototype.getChildContext = function () {
        return {
            hasInViews: this.state.hasInViews,
            viewId: this.state.viewId,
            viewType: this.state.viewType,
        };
    };
    FacetView.prototype.componentDidUpdate = function () {
        this.context.centralizedUpdates(this);
    };
    FacetView.prototype.componentDidMount = function () {
        this.context.centralizedUpdates(this);
    };
    FacetView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    FacetView.childContextTypes = {
        hasInViews: PropTypes.bool,
        viewId: PropTypes.string,
        viewType: PropTypes.string,
    };
    FacetView.contextTypes = {
        centralizedUpdates: PropTypes.func,
        hasInViews: PropTypes.bool,
        viewType: PropTypes.string,
    };
    return FacetView;
}(React.Component));
exports.default = FacetView;
//# sourceMappingURL=FacetView.js.map