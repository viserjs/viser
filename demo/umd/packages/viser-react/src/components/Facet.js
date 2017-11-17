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
var Facet = (function (_super) {
    __extends(Facet, _super);
    function Facet(props) {
        var _this = _super.call(this, props) || this;
        _this.displayName = 'Facet';
        return _this;
    }
    Facet.prototype.componentDidUpdate = function () {
        this.context.centralizedUpdates(this);
    };
    Facet.prototype.componentDidMount = function () {
        this.context.centralizedUpdates(this);
    };
    Facet.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    Facet.contextTypes = {
        centralizedUpdates: PropTypes.func,
        hasInViews: PropTypes.bool,
        viewId: PropTypes.string,
    };
    return Facet;
}(React.Component));
exports.default = Facet;
//# sourceMappingURL=Facet.js.map