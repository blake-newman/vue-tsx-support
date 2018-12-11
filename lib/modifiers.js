"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function handleEvent(event, filters, handler) {
    for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
        var filter = filters_1[_i];
        if (!filter(event)) {
            return;
        }
    }
    if (handler) {
        handler(event);
    }
}
var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    down: 40,
    del: [8, 46],
    left: 37,
    right: 39
};
function createKeyFilter(keys) {
    var codes = [];
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (typeof key === "number") {
            codes.push(key);
        }
        else {
            var code = keyCodes[key];
            if (typeof code === "number") {
                codes.push(code);
            }
            else {
                codes.push.apply(codes, code);
            }
        }
    }
    switch (codes.length) {
        case 0:
            return function (_) { return false; };
        case 1:
            var code_1 = codes[0];
            return function (e) { return e.keyCode === code_1; };
        default:
            return function (e) { return codes.indexOf(e.keyCode) >= 0; };
    }
}
function defineChildModifier(target, currentFilters, name, filter, children) {
    Object.defineProperty(target, name, {
        get: function () {
            // call this getter at most once.
            // reuse created instance after next time.
            var ret = createModifier(currentFilters.concat([filter]), children);
            Object.defineProperty(target, name, {
                value: ret,
                enumerable: true
            });
            return ret;
        },
        enumerable: true,
        configurable: true
    });
}
function defineKeyCodeModifiers(target, filters, children) {
    var _loop_1 = function (name_1) {
        var keyName = name_1;
        if (keyName === "left" || keyName === "right") {
            return "continue";
        }
        var code = keyCodes[keyName];
        if (typeof code === "number") {
            defineChildModifier(target, filters, keyName, function (e) { return e.keyCode === code; }, children);
        }
        else {
            var c1_1 = code[0], c2_1 = code[1];
            defineChildModifier(target, filters, keyName, function (e) { return e.keyCode === c1_1 || e.keyCode === c2_1; }, children);
        }
    };
    for (var name_1 in keyCodes) {
        _loop_1(name_1);
    }
}
function defineKeys(target, filters, children) {
    Object.defineProperty(target, "keys", {
        get: function () {
            var _this = this;
            var keysFunction = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var propName = "keys:" + args.toString();
                var modifier = _this[propName];
                if (modifier !== undefined) {
                    return modifier;
                }
                var filter = createKeyFilter(args);
                defineChildModifier(_this, filters, propName, filter, children);
                return _this[propName];
            };
            Object.defineProperty(this, "keys", {
                value: keysFunction,
                enumerable: true
            });
            return keysFunction;
        },
        enumerable: true,
        configurable: true
    });
}
function defineExact(target, filters, children) {
    Object.defineProperty(target, "exact", {
        get: function () {
            var _this = this;
            var exactFunction = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var propName = "exact:" + args.toString();
                var modifier = _this[propName];
                if (modifier !== undefined) {
                    return modifier;
                }
                var expected = {
                    ctrl: false,
                    shift: false,
                    alt: false,
                    meta: false
                };
                args.forEach(function (arg) { return (expected[arg] = true); });
                var filter = function (e) {
                    return !!e.ctrlKey === expected.ctrl &&
                        !!e.shiftKey === expected.shift &&
                        !!e.altKey === expected.alt &&
                        !!e.metaKey === expected.meta;
                };
                defineChildModifier(_this, filters, propName, filter, children);
                return _this[propName];
            };
            Object.defineProperty(this, "exact", {
                value: exactFunction,
                enumerable: true
            });
            return exactFunction;
        },
        enumerable: true,
        configurable: true
    });
}
function createModifier(filters, children) {
    function m(arg) {
        if (arg instanceof Function) {
            // EventHandler => EventHandler
            return function (event) { return handleEvent(event, filters, arg); };
        }
        else {
            // Event => void
            handleEvent(arg, filters);
            return;
        }
    }
    if (children.keyboard || children.mouse) {
        var nextChildren = __assign({}, children, { keyboard: false, mouse: false });
        if (children.keyboard) {
            defineKeyCodeModifiers(m, filters, nextChildren);
            defineKeys(m, filters, nextChildren);
        }
        if (children.mouse) {
            defineChildModifier(m, filters, "middle", function (e) { return e.button === 1; }, nextChildren);
        }
        defineChildModifier(m, filters, "left", function (e) { return e.keyCode === 37 || e.button === 0; }, nextChildren);
        defineChildModifier(m, filters, "right", function (e) { return e.keyCode === 39 || e.button === 2; }, nextChildren);
    }
    if (children.exact) {
        var nextChildren = __assign({}, children, { exact: false, modkey: false });
        defineExact(m, filters, nextChildren);
    }
    if (children.modkey) {
        var nextChildren = __assign({}, children, { exact: false });
        defineChildModifier(m, filters, "ctrl", function (e) { return e.ctrlKey; }, nextChildren);
        defineChildModifier(m, filters, "shift", function (e) { return e.shiftKey; }, nextChildren);
        defineChildModifier(m, filters, "alt", function (e) { return e.altKey; }, nextChildren);
        defineChildModifier(m, filters, "meta", function (e) { return e.metaKey; }, nextChildren);
        defineChildModifier(m, filters, "noctrl", function (e) { return !e.ctrlKey; }, nextChildren);
        defineChildModifier(m, filters, "noshift", function (e) { return !e.shiftKey; }, nextChildren);
        defineChildModifier(m, filters, "noalt", function (e) { return !e.altKey; }, nextChildren);
        defineChildModifier(m, filters, "nometa", function (e) { return !e.metaKey; }, nextChildren);
    }
    defineChildModifier(m, filters, "stop", function (e) { return e.stopPropagation() || true; }, children);
    defineChildModifier(m, filters, "prevent", function (e) { return e.preventDefault() || true; }, children);
    defineChildModifier(m, filters, "self", function (e) { return e.target === e.currentTarget; }, children);
    return m;
}
exports.modifiers = createModifier([], {
    keyboard: true,
    mouse: true,
    modkey: true,
    exact: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZGlmaWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBb0RBLHFCQUNFLEtBQVksRUFDWixPQUFzQixFQUN0QixPQUE2QjtJQUU3QixLQUFtQixVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87UUFBckIsSUFBSSxNQUFNLGdCQUFBO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQixPQUFPO1NBQ1I7S0FDRjtJQUNELElBQUksT0FBTyxFQUFFO1FBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQUVELElBQU0sUUFBUSxHQUEwRDtJQUN0RSxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxDQUFDO0lBQ04sS0FBSyxFQUFFLEVBQUU7SUFDVCxLQUFLLEVBQUUsRUFBRTtJQUNULEVBQUUsRUFBRSxFQUFFO0lBQ04sSUFBSSxFQUFFLEVBQUU7SUFDUixHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1osSUFBSSxFQUFFLEVBQUU7SUFDUixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFFRix5QkFBeUIsSUFBa0M7SUFDekQsSUFBTSxLQUFLLEdBQUcsRUFBYyxDQUFDO0lBQzdCLEtBQWtCLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJO1FBQWpCLElBQU0sR0FBRyxhQUFBO1FBQ1osSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQjthQUFNO1lBQ0wsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixLQUFLLENBQUMsSUFBSSxDQUFD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