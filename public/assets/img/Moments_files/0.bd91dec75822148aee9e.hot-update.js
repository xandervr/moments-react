webpackHotUpdate(0,{

/***/ "./src/Views/Profile/index.js":
/*!************************************!*\
  !*** ./src/Views/Profile/index.js ***!
  \************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css__ = __webpack_require__(/*! ./index.css */ "./src/Views/Profile/index.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_lib_tap_client__ = __webpack_require__(/*! ../../assets/js/lib/tap-client */ "./src/assets/js/lib/tap-client.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ProfileHeader__ = __webpack_require__(/*! ./ProfileHeader */ "./src/Views/Profile/ProfileHeader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ExperienceContent__ = __webpack_require__(/*! ./ExperienceContent */ "./src/Views/Profile/ExperienceContent/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FollowingContent__ = __webpack_require__(/*! ./FollowingContent */ "./src/Views/Profile/FollowingContent/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Routes__ = __webpack_require__(/*! ../../Routes */ "./src/Routes/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__FollowersContent__ = __webpack_require__(/*! ./FollowersContent */ "./src/Views/Profile/FollowersContent/index.js");
var _jsxFileName = "/Users/cisvercouteren/Documents/moments/src/Views/Profile/index.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var Profile = function (_Component) {
    _inherits(Profile, _Component);

    function Profile(props) {
        _classCallCheck(this, Profile);

        var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

        _this.fetchProfile = function () {
            var username = _this.props.match.params.username;
            console.log(username);
            Object(__WEBPACK_IMPORTED_MODULE_2__assets_js_lib_tap_client__["g" /* fetchUserByUsername */])(username, function (profile) {
                if (profile) {
                    _this.setState({ profile: profile, profileNotFound: false });
                } else {
                    _this.setState({ profile: profile, profileNotFound: true });
                }
            });
        };

        _this.onFollow = function () {
            var user = _this.props.user;
            var profile = _this.state.profile;

            var followList = profile.followers.map(function (follower) {
                return follower._id;
            });
            Object(__WEBPACK_IMPORTED_MODULE_2__assets_js_lib_tap_client__["j" /* followUser */])(profile._id, function (followed) {
                if (!followList.includes(user._id) && followed) {
                    _this.setState(function (prevState, props) {
                        return {
                            profile: Object.assign({}, prevState.profile, {
                                followers: [].concat(_toConsumableArray(prevState.profile.followers), [user])
                            })
                        };
                    });
                } else {
                    alert("you are allready following this person!");
                    return;
                }
            });
        };

        _this.onUnfollow = function () {
            var user = _this.props.user;
            var profile = _this.state.profile;

            var followList = profile.followers.map(function (follower) {
                return follower._id;
            });
            Object(__WEBPACK_IMPORTED_MODULE_2__assets_js_lib_tap_client__["p" /* unfollowUser */])(profile._id, function (unfollowed) {
                if (followList.includes(user._id) && unfollowed) {
                    _this.setState(function (prevState, props) {
                        return {
                            profile: Object.assign({}, prevState.profile, {
                                followers: prevState.profile.followers.filter(function (follower) {
                                    return follower._id !== user._id;
                                })
                            })
                        };
                    });
                } else {
                    alert("you are not allready following this person!");
                    return;
                }
            });
        };

        _this.state = {
            profile: null,
            profileNotFound: false
        };
        return _this;
    }

    _createClass(Profile, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.fetchProfile();
            this.mounted = true;
            this.unlisten = this.props.history.listen(function (location, action) {
                if (_this2.mounted) {
                    _this2.forceUpdate(function () {
                        _this2.fetchProfile();
                    });
                }
            });
            this.updateProfile = setInterval(function () {
                if (_this2.mounted) _this2.fetchProfile();
            }, 5000);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.mounted = false;
            this.unlisten();
            clearInterval(this.updateProfile);
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                authentication = _props.authentication,
                user = _props.user,
                match = _props.match;
            var _state = this.state,
                profile = _state.profile,
                profileNotFound = _state.profileNotFound;
            // let profileContent = null;

            if (profile) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "profile-holder", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 112
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ProfileHeader__["a" /* default */], {
                        user: user,
                        profile: profile,
                        profileNotFound: profileNotFound,
                        onFollow: this.onFollow,
                        onUnfollow: this.onUnfollow, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 113
                        },
                        __self: this
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Routes__["a" /* AuthenticatedRoute */], {
                        exact: true,
                        path: "" + match.url,
                        user: user,
                        profile: profile,
                        authentication: authentication,
                        component: __WEBPACK_IMPORTED_MODULE_5__ExperienceContent__["a" /* default */], __source: {
                            fileName: _jsxFileName,
                            lineNumber: 119
                        },
                        __self: this
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Routes__["a" /* AuthenticatedRoute */], {
                        exact: true,
                        path: match.url + "/following",
                        profile: profile,
                        user: user,
                        authentication: authentication,
                        component: __WEBPACK_IMPORTED_MODULE_6__FollowingContent__["a" /* default */], __source: {
                            fileName: _jsxFileName,
                            lineNumber: 126
                        },
                        __self: this
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Routes__["a" /* AuthenticatedRoute */], {
                        exact: true,
                        path: match.url + "/followers",
                        profile: profile,
                        user: user,
                        authentication: authentication,
                        component: __WEBPACK_IMPORTED_MODULE_8__FollowersContent__["a" /* default */], __source: {
                            fileName: _jsxFileName,
                            lineNumber: 133
                        },
                        __self: this
                    })
                );
            } else {
                return null;
            }
        }
    }]);

    return Profile;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["e" /* withRouter */])(Profile));

/***/ })

})
//# sourceMappingURL=0.bd91dec75822148aee9e.hot-update.js.map