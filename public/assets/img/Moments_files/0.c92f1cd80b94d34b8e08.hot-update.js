webpackHotUpdate(0,{

/***/ "./src/components/Map/index.js":
/*!*************************************!*\
  !*** ./src/components/Map/index.js ***!
  \*************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_google_maps_react__ = __webpack_require__(/*! google-maps-react */ "./node_modules/google-maps-react/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_google_maps_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_google_maps_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_google_maps_react_dist_GoogleApiComponent__ = __webpack_require__(/*! google-maps-react/dist/GoogleApiComponent */ "./node_modules/google-maps-react/dist/GoogleApiComponent.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_google_maps_react_dist_GoogleApiComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_google_maps_react_dist_GoogleApiComponent__);
var _jsxFileName = "/Users/cisvercouteren/Documents/moments/src/components/Map/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var MapContainer = function (_Component) {
    _inherits(MapContainer, _Component);

    function MapContainer() {
        _classCallCheck(this, MapContainer);

        return _possibleConstructorReturn(this, (MapContainer.__proto__ || Object.getPrototypeOf(MapContainer)).apply(this, arguments));
    }

    _createClass(MapContainer, [{
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_0_react__["Fragment"],
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 8
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_google_maps_react__["Map"], {
                    style: {
                        width: "80%",
                        height: "20rem",
                        display: "flex",
                        justifyContent: "center"
                    },
                    google: this.props.google,
                    zoom: 14,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 9
                    },
                    __self: this
                })
            );
        }
    }]);

    return MapContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_google_maps_react_dist_GoogleApiComponent___default()({
    apiKey: "AIzaSyBC6n1__0F3_jE5V4K__WfcvcMKL9iJetI"
})(MapContainer));

/***/ })

})
//# sourceMappingURL=0.c92f1cd80b94d34b8e08.hot-update.js.map