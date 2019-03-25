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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tsxattrs = undefined;
        _this.$scopedSlots = undefined;
        return _this;
    }
    return Component;
}(vue_1.default));
exports.Component = Component;
/**
 * Create component from component options (Compatible with Vue.extend)
 */
function createComponent(opts) {
    return vue_1.default.extend(opts);
}
exports.createComponent = createComponent;
var factoryImpl = {
    convert: function (c) { return c; },
    extendFrom: function (c) { return c; }
};
/**
 * Specify Props and Event types of component
 *
 * Usage:
 *  // Get TSX-supported component with props(`name`, `value`) and event(`onInput`)
 *  const NewComponent = tsx.ofType<{ name: string, value: string }, { onInput: string }>.convert(Component);
 */
function ofType() {
    return factoryImpl;
}
exports.ofType = ofType;
function withNativeOn(componentType) {
    return componentType;
}
exports.withNativeOn = withNativeOn;
function withHtmlAttrs(componentType) {
    return componentType;
}
exports.withHtmlAttrs = withHtmlAttrs;
function withUnknownProps(componentType) {
    return componentType;
}
exports.withUnknownProps = withUnknownProps;
function createComponentFactory(base, mixins) {
    return {
        create: function (options) {
            var mergedMixins = options.mixins
                ? options.mixins.concat(mixins) : mixins;
            return base.extend(__assign({}, options, { mixins: mergedMixins }));
        },
        mixin: function (mixinObject) {
            return createComponentFactory(base, mixins.concat([mixinObject]));
        }
    };
}
function createExtendableComponentFactory() {
    return {
        create: function (options) {
            return vue_1.default.extend(options);
        },
        extendFrom: function (base) {
            return createComponentFactory(base, []);
        },
        mixin: function (mixinObject) {
            return createComponentFactory(vue_1.default, [mixinObject]);
        }
    };
}
exports.componentFactory = createExtendableComponentFactory();
function componentFactoryOf() {
    return exports.componentFactory;
}
exports.componentFactoryOf = componentFactoryOf;
/**
 * Shorthand of `componentFactory.create`
 */
exports.component = exports.componentFactory.create;
exports.extendFrom = exports.componentFactory.extendFrom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUlhO0FBZ0NiO0lBSVUsNkJBQUc7SUFKYjtRQUFBLHFFQVdDO1FBTkMsZUFBUyxHQUlMLFNBQWdCLENBQUM7UUFDckIsa0JBQVksR0FBMEMsU0FBZ0IsQ0FBQzs7SUFDekUsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQVhELENBSVUsYUFBRyxHQU9aO0FBWFksOEJBQVM7QUFhdEI7O0dBRUc7QUFDSCx5QkFDRSxJQUF3RDtJQUV4RCxPQUFPLGFBQUcsQ0FBQyxNQUFNLENBQUMsSUFBVyxDQUFRLENBQUM7QUFDeEMsQ0FBQztBQUpELDBDQUlDO0FBV0QsSUFBTSxXQUFXLEdBQUc7SUFDbEIsT0FBTyxFQUFFLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxFQUFELENBQUM7SUFDdEIsVUFBVSxFQUFFLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxFQUFELENBQUM7Q0FDMUIsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNIO0lBS0UsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQU5ELHdCQU1DO0FBRUQsc0JBQ0UsYUFBaUI7SUFFakIsT0FBTyxhQUFvQixDQUFDO0FBQzlCLENBQUM7QUFKRCxvQ0FJQztBQUVELHVCQUNFLGFBQWlCO0lBRWpCLE9BQU8sYUFBb0IsQ0FBQztBQUM5QixDQUFDO0FBSkQsc0NBSUM7QUFFRCwwQkFDRSxhQUFpQjtJQUVqQixPQUFPLGFBQW9CLENBQUM7QUFDOUIsQ0FBQztBQUpELDRDQUlDO0FBeUhELGdDQUNFLElBQWdCLEVBQ2hCLE1BQWE7SUFFYixPQUFPO1FBQ0wsTUFBTSxFQUFOLFVBQU8sT0FBWTtZQUNqQixJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTTtnQkFDakMsQ0FBQyxDQUFLLE9BQU8sQ0FBQyxNQUFNLFFBQUssTUFBTSxFQUMvQixDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxjQUFNLE9BQU8sSUFBRSxNQUFNLEVBQUUsWUFBWSxJQUFHLENBQUM7UUFDM0QsQ0FBQztRQUNELEtBQUssRUFBTCxVQUFNLFdBQWdCO1lBQ3BCLE9BQU8sc0JBQXNCLENBQUMsSUFBSSxFQUFNLE1BQU0sU0FBRSxXQUFXLEdBQUUsQ0FBQztRQUNoRSxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRDtJQU9FLE9BQU87UUFDTCxNQUFNLEVBQU4sVUFBTyxPQUFZO1lBQ2pCLE9BQU8sYUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsVUFBVSxFQUFWLFVBQVcsSUFBZ0I7WUFDekIsT0FBTyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELEtBQUssRUFBTCxVQUFNLFdBQWdCO1lBQ3BCLE9BQU8sc0JBQXNCLENBQUMsYUFBRyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFWSxRQUFBLGdCQUFnQixHQU16QixnQ0FBZ0MsRUFBRSxDQUFDO0FBRXZDO0lBVUUsT0FBTyx3QkFBdUIsQ0FBQztBQUNqQyxDQUFDO0FBWEQsZ0RBV0M7QUFFRDs7R0FFRztBQUNVLFFBQUEsU0FBUyxHQUFHLHdCQUFnQixDQUFDLE1BQU0sQ0FBQztBQUNwQyxRQUFBLFVBQVUsR0FBRyx3QkFBZ0IsQ0FBQyxVQUFVLENBQUMifQ==