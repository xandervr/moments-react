webpackHotUpdate(0,{

/***/ "./src/Views/Profile/ExperienceContent/index.js":
/*!******************************************************!*\
  !*** ./src/Views/Profile/ExperienceContent/index.js ***!
  \******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_svg_world_svg__ = __webpack_require__(/*! ../../../assets/svg/world.svg */ "./src/assets/svg/world.svg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_svg_world_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_svg_world_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_svg_map_localization_svg__ = __webpack_require__(/*! ../../../assets/svg/map-localization.svg */ "./src/assets/svg/map-localization.svg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_svg_map_localization_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__assets_svg_map_localization_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TimelineExperience__ = __webpack_require__(/*! ./TimelineExperience */ "./src/Views/Profile/ExperienceContent/TimelineExperience/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ExperienceCard__ = __webpack_require__(/*! ./ExperienceCard */ "./src/Views/Profile/ExperienceContent/ExperienceCard/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_InfiniteScroll__ = __webpack_require__(/*! ../../../components/InfiniteScroll */ "./src/components/InfiniteScroll/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Map__ = __webpack_require__(/*! ../../../components/Map */ "./src/components/Map/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_js_lib_tap_client__ = __webpack_require__(/*! ../../../assets/js/lib/tap-client */ "./src/assets/js/lib/tap-client.js");
var _jsxFileName = "/Users/cisvercouteren/Documents/moments/src/Views/Profile/ExperienceContent/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var ExperienceContent = function (_Component) {
    _inherits(ExperienceContent, _Component);

    function ExperienceContent(props) {
        _classCallCheck(this, ExperienceContent);

        var _this = _possibleConstructorReturn(this, (ExperienceContent.__proto__ || Object.getPrototypeOf(ExperienceContent)).call(this, props));

        _this.updateWall = function () {
            var profile = _this.props.profile;

            Object(__WEBPACK_IMPORTED_MODULE_7__assets_js_lib_tap_client__["h" /* fetchUserExperiencesOffset */])(profile._id, 0, _this.state.offset + _this.state.limit, function (wall) {
                if (wall) _this.setState({ data: wall });
            });
        };

        _this.loadWall = function (advance, cb) {
            var profile = _this.props.profile;

            Object(__WEBPACK_IMPORTED_MODULE_7__assets_js_lib_tap_client__["h" /* fetchUserExperiencesOffset */])(profile._id, _this.state.offset + (advance ? advance : 0), _this.state.limit, function (wall) {
                if (wall && wall.length > 0) _this.setState({
                    data: _this.state.data.concat(wall),
                    offset: _this.state.offset + (advance ? advance : 0),
                    hasMore: true
                }, cb);else _this.setState({ hasMore: false }, cb);
            });
        };

        _this.loadMore = function (cb) {
            _this.loadWall(6, cb);
        };

        _this.loadMoreTimeline = function (cb) {};

        _this.state = {
            data: [],
            hasMore: true,
            offset: 0,
            limit: 6
        };
        return _this;
    }

    _createClass(ExperienceContent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.loadWall();
            this.mounted = true;
            this.wallUpdater = setInterval(function () {
                if (_this2.mounted) _this2.updateWall();
            }, 5000);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.mounted = false;
            clearInterval(this.wallUpdater);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var profile = this.props.profile;
            var data = this.state.data;

            var experienceList = null;
            var timelineList = null;
            if (profile) {
                experienceList = data.map(function (experience) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ExperienceCard__["a" /* default */], { key: experience._id, experience: experience, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 80
                        },
                        __self: _this3
                    });
                });

                timelineList = data.map(function (experience) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__TimelineExperience__["a" /* default */], {
                        key: experience._id,
                        experience: experience,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 84
                        },
                        __self: _this3
                    });
                });
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                {
                    style: {
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    },
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 92
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "timeline-map-holder", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 100
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "section",
                        { className: "map-section", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 101
                            },
                            __self: this
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "map-title-holder", __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 102
                                },
                                __self: this
                            },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_Map__["a" /* default */], {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 103
                                },
                                __self: this
                            })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { className: "world-map", src: __WEBPACK_IMPORTED_MODULE_1__assets_svg_world_svg___default.a, alt: "", __source: {
                                fileName: _jsxFileName,
                                lineNumber: 105
                            },
                            __self: this
                        })
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "section",
                    { className: "experiences-section", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 108
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_5__components_InfiniteScroll__["a" /* default */],
                        {
                            loadMore: this.loadMore,
                            loadMoreOffset: 300,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 109
                            },
                            __self: this
                        },
                        experienceList
                    )
                )
            );
        }
    }]);

    return ExperienceContent;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (ExperienceContent);

/***/ })

})
//# sourceMappingURL=0.256da62393527a6edd3f.hot-update.js.map