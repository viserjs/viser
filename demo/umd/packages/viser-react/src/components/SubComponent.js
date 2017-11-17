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
var Props = (function () {
    function Props() {
    }
    return Props;
}());
var SubComponent = (function (_super) {
    __extends(SubComponent, _super);
    function SubComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.displayName = 'SubComponent';
        return _this;
    }
    SubComponent.prototype.componentDidUpdate = function () {
        this.context.centralizedUpdates(this);
    };
    SubComponent.prototype.componentDidMount = function () {
        this.context.centralizedUpdates(this);
    };
    SubComponent.prototype.render = function () {
        return null;
    };
    SubComponent.contextTypes = {
        centralizedUpdates: PropTypes.func,
        hasInViews: PropTypes.bool,
        viewId: PropTypes.string,
        viewType: PropTypes.string,
    };
    return SubComponent;
}(React.Component));
exports.default = SubComponent;
//# sourceMappingURL=SubComponent.js.map