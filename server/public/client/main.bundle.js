webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/admin/app-admin.module.ngfactory": [
		"./src/app/admin/app-admin.module.ngfactory.js",
		"app-admin.module",
		"common"
	],
	"app/html-builder/html-builder.module.ngfactory": [
		"./src/app/html-builder/html-builder.module.ngfactory.js",
		"html-builder.module",
		"common"
	],
	"vebto-client/admin/analytics/analytics.module.ngfactory": [
		"./node_modules/vebto-client/admin/analytics/analytics.module.ngfactory.js",
		"analytics.module",
		"common"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("./src/environments/environment.ts");

var appConfig = {
    environment: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].production ? 'production' : 'dev',
    navbar: {
        defaultPosition: 'dashboard',
        dropdownItems: [
            { route: '/dashboard', name: 'Dashboard', icon: 'web-design-custom' },
        ]
    },
    admin: {
        pages: [
            { name: 'templates', icon: 'web-design-custom', route: 'templates', permission: 'templates.view' },
            { name: 'projects', icon: 'dashboard', route: 'projects', permission: 'projects.view' },
        ],
        settingsPages: [
            { name: 'builder', route: 'builder' },
        ],
        analytics: {
            stats: [
                { name: 'users', icon: 'group' },
                { name: 'projects', icon: 'dashboard' },
                { name: 'templates', icon: 'web-design-custom' },
                { name: 'pages', icon: 'description' },
            ]
        },
        ads: [
            { name: 'Slot #1', slot: 'ad_slot_1', description: 'This will appear at the top of user dashboard.' },
            { name: 'Slot #2', slot: 'ad_slot_2', description: 'This will appear at the bottom of user dashboard.' },
        ],
        appearance: {
            defaultRoute: 'dashboard',
            navigationRoutes: [
                'dashboard',
                'dashboard/projects/new',
                'builder',
            ],
            menus: {
                availableRoutes: [
                    'dashboard',
                    'dashboard/projects/new',
                ],
                positions: [
                    'dashboard',
                    'admin'
                ]
            },
        }
    },
};


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vebto_client_auth_login_login_component__ = __webpack_require__("./node_modules/vebto-client/auth/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_guards_guest_guard_service__ = __webpack_require__("./node_modules/vebto-client/guards/guest-guard.service.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0_vebto_client_auth_login_login_component__["a" /* LoginComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1_vebto_client_guards_guest_guard_service__["a" /* GuestGuard */]] },
    { path: 'builder', loadChildren: 'app/html-builder/html-builder.module#HtmlBuilderModule' },
    { path: 'admin', loadChildren: 'app/admin/app-admin.module#AppAdminModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_AppComponent */
/* unused harmony export View_AppComponent_0 */
/* unused harmony export View_AppComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component_scss_ngstyle__ = __webpack_require__("./src/app/app.component.scss.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_ui_context_menu_context_menu_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/context-menu/context-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vebto_client_core_services_custom_homepage_service__ = __webpack_require__("./node_modules/vebto-client/core/services/custom-homepage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_http_app_http_client_service__ = __webpack_require__("./node_modules/vebto-client/core/http/app-http-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vebto_client_core_vebto_config_service__ = __webpack_require__("./node_modules/vebto-client/core/vebto-config.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 









var styles_AppComponent = [__WEBPACK_IMPORTED_MODULE_0__app_component_scss_ngstyle__["a" /* styles */]];
var RenderType_AppComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 2, styles: styles_AppComponent, data: {} });

function View_AppComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](402653184, 1, { contextMenuViewRef: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](402653184, 2, { contextMenuOrigin: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 212992, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_router__["q" /* RouterOutlet */], [__WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ChildrenOutletContexts */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ComponentFactoryResolver"], [8, null], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 16777216, [[1, 3], ["contextMenuViewRef", 1]], null, 1, "div", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, [[2, 0], ["contextMenuOrigin", 1]], null, 0, "div", [["class", "context-menu-origin"]], null, null, null, null, null))], function (_ck, _v) { _ck(_v, 3, 0); }, null); }
function View_AppComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */], [__WEBPACK_IMPORTED_MODULE_4_vebto_client_core_ui_context_menu_context_menu_service__["a" /* ContextMenu */], __WEBPACK_IMPORTED_MODULE_5_vebto_client_core_services_custom_homepage_service__["a" /* CustomHomepage */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */], __WEBPACK_IMPORTED_MODULE_8_vebto_client_core_vebto_config_service__["a" /* VebtoConfig */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["m" /* Router */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AppComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-root", __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */], View_AppComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/app.component.scss.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["app-root {\n  display: block;\n  height: 100%; }\n"];



/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_ui_context_menu_context_menu_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/context-menu/context-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vebto_client_core_http_app_http_client_service__ = __webpack_require__("./node_modules/vebto-client/core/http/app-http-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_custom_homepage_service__ = __webpack_require__("./node_modules/vebto-client/core/services/custom-homepage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vebto_client_core_vebto_config_service__ = __webpack_require__("./node_modules/vebto-client/core/vebto-config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__("./src/app/app-config.ts");








var AppComponent = /** @class */ (function () {
    function AppComponent(contextMenu, customHomepage, settings, httpClient, vebtoConfig, router) {
        this.contextMenu = contextMenu;
        this.customHomepage = customHomepage;
        this.settings = settings;
        this.httpClient = httpClient;
        this.vebtoConfig = vebtoConfig;
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.contextMenu.registerViewContainerRef(this.contextMenuViewRef, this.contextMenuOrigin);
        this.customHomepage.select();
        this.settings.setHttpClient(this.httpClient);
        this.vebtoConfig.merge(__WEBPACK_IMPORTED_MODULE_7__app_config__["a" /* appConfig */]);
        this.setInjectorOnAppearanceEditorIframe();
    };
    AppComponent.prototype.setInjectorOnAppearanceEditorIframe = function () {
        if (window.top === window.self)
            return;
        if (window.top.location.origin !== this.settings.getBaseUrl().replace(/\/$/, ''))
            return;
        window['previewAngular'] = { settings: this.settings, router: this.router };
    };
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModuleNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_ngx_color_picker_dist_lib_color_picker_component_ngfactory__ = __webpack_require__("./node_modules/ngx-color-picker/dist/lib/color-picker.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_snack_bar_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/snack-bar/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_vebto_client_core_files_upload_file_modal_upload_file_modal_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/files/upload-file-modal/upload-file-modal.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_vebto_client_core_ui_confirm_modal_confirm_modal_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/confirm-modal/confirm-modal.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_vebto_client_core_ui_color_picker_colorpicker_panel_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/color-picker/colorpicker-panel.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_auth_login_login_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/auth/login/login.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_vebto_client_auth_register_register_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/auth/register/register.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_vebto_client_auth_forgot_password_forgot_password_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/auth/forgot-password/forgot-password.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_vebto_client_auth_reset_password_reset_password_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/auth/reset-password/reset-password.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_vebto_client_auth_request_extra_credentials_modal_request_extra_credentials_modal_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/auth/request-extra-credentials-modal/request-extra-credentials-modal.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__node_modules_angular_material_tooltip_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/tooltip/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_modules_angular_material_dialog_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/dialog/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dashboard_dashboard_component_ngfactory__ = __webpack_require__("./src/app/dashboard/dashboard.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__dashboard_new_project_page_new_project_page_component_ngfactory__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-page.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_projects_publish_project_modal_publish_project_modal_component_ngfactory__ = __webpack_require__("./src/app/shared/projects/publish-project-modal/publish-project-modal.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__dashboard_new_project_page_new_project_modal_new_project_modal_component_ngfactory__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-modal/new-project-modal.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__node_modules_vebto_client_account_settings_account_settings_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/account-settings/account-settings.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__node_modules_vebto_client_account_settings_connect_social_accounts_panel_connect_social_accounts_panel_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/account-settings/connect-social-accounts-panel/connect-social-accounts-panel.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_component_ngfactory__ = __webpack_require__("./src/app/app.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_material_core__ = __webpack_require__("./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_animations_browser__ = __webpack_require__("./node_modules/@angular/animations/esm5/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_ngx_color_picker_dist_lib_color_picker_service__ = __webpack_require__("./node_modules/ngx-color-picker/dist/lib/color-picker.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_ngx_color_picker_dist_lib_color_picker_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30_ngx_color_picker_dist_lib_color_picker_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__angular_cdk_bidi__ = __webpack_require__("./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__ = __webpack_require__("./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__ = __webpack_require__("./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__ = __webpack_require__("./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__angular_material_snack_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__angular_material_menu__ = __webpack_require__("./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__angular_cdk_observers__ = __webpack_require__("./node_modules/@angular/cdk/esm5/observers.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_vebto_client_translations_translations_service__ = __webpack_require__("./node_modules/vebto-client/translations/translations.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_vebto_client_core_ui_toast_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/toast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_vebto_client_core_ui_modal_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/modal.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_vebto_client_core_ui_color_picker_color_picker_panel_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/color-picker/color-picker-panel.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_vebto_client_core_http_http_error_handler_service__ = __webpack_require__("./node_modules/vebto-client/core/http/http-error-handler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__ = __webpack_require__("./node_modules/vebto-client/auth/current-user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__ = __webpack_require__("./node_modules/vebto-client/core/http/app-http-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_vebto_client_auth_auth_service__ = __webpack_require__("./node_modules/vebto-client/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51_vebto_client_auth_social_auth_service__ = __webpack_require__("./node_modules/vebto-client/auth/social-auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52_vebto_client_guards_guest_guard_service__ = __webpack_require__("./node_modules/vebto-client/guards/guest-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_vebto_client_guards_disable_route_guard_service__ = __webpack_require__("./node_modules/vebto-client/guards/disable-route-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_vebto_client_guards_auth_guard_service__ = __webpack_require__("./node_modules/vebto-client/guards/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_vebto_client_auth_users_service__ = __webpack_require__("./node_modules/vebto-client/auth/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__angular_material_tooltip__ = __webpack_require__("./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__shared_templates_templates_service__ = __webpack_require__("./src/app/shared/templates/templates.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58_vebto_client_core_http_http_cache_client__ = __webpack_require__("./node_modules/vebto-client/core/http/http-cache-client.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__shared_themes_themes_service__ = __webpack_require__("./src/app/shared/themes/themes.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__shared_projects_project_url_service__ = __webpack_require__("./src/app/shared/projects/project-url.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__shared_dom_helpers_service__ = __webpack_require__("./src/app/shared/dom-helpers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__shared_projects_projects_service__ = __webpack_require__("./src/app/shared/projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__dashboard_projects_resolver_service__ = __webpack_require__("./src/app/dashboard/projects-resolver.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__dashboard_new_project_page_templates_resolver_service__ = __webpack_require__("./src/app/dashboard/new-project-page/templates-resolver.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65_vebto_client_core_services_value_lists_service__ = __webpack_require__("./node_modules/vebto-client/core/services/value-lists.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66_vebto_client_account_settings_account_settings_resolve_service__ = __webpack_require__("./node_modules/vebto-client/account-settings/account-settings-resolve.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67_vebto_client_translations_localizations_service__ = __webpack_require__("./node_modules/vebto-client/translations/localizations.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68_vebto_client_core_ui_context_menu_context_menu_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/context-menu/context-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69_vebto_client_core_services_utils__ = __webpack_require__("./node_modules/vebto-client/core/services/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70_vebto_client_core_services_local_storage_service__ = __webpack_require__("./node_modules/vebto-client/core/services/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71_vebto_client_core_services_browser_events_service__ = __webpack_require__("./node_modules/vebto-client/core/services/browser-events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72_vebto_client_core_files_file_validator__ = __webpack_require__("./node_modules/vebto-client/core/files/file-validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73_vebto_client_core_files_uploads_service__ = __webpack_require__("./node_modules/vebto-client/core/files/uploads.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74_vebto_client_core_services_preview_app_service__ = __webpack_require__("./node_modules/vebto-client/core/services/preview-app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75_vebto_client_core_keybinds_keybinds_service__ = __webpack_require__("./node_modules/vebto-client/core/keybinds/keybinds.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76_vebto_client_core_services_title_service__ = __webpack_require__("./node_modules/vebto-client/core/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77_vebto_client_core_services_custom_homepage_service__ = __webpack_require__("./node_modules/vebto-client/core/services/custom-homepage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78_vebto_client_core_vebto_config_service__ = __webpack_require__("./node_modules/vebto-client/core/vebto-config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79_vebto_client_core_raven_error_handler__ = __webpack_require__("./node_modules/vebto-client/core/raven-error-handler.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80_vebto_client_core_bootstrapper_service__ = __webpack_require__("./node_modules/vebto-client/core/bootstrapper.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81_vebto_client_auth_login_login_component__ = __webpack_require__("./node_modules/vebto-client/auth/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82_vebto_client_auth_register_register_component__ = __webpack_require__("./node_modules/vebto-client/auth/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83_vebto_client_auth_forgot_password_forgot_password_component__ = __webpack_require__("./node_modules/vebto-client/auth/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84_vebto_client_auth_reset_password_reset_password_component__ = __webpack_require__("./node_modules/vebto-client/auth/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86__dashboard_new_project_page_new_project_page_component__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87_vebto_client_account_settings_account_settings_component__ = __webpack_require__("./node_modules/vebto-client/account-settings/account-settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88_vebto_client_account_settings_account_settings_routing_module__ = __webpack_require__("./node_modules/vebto-client/account-settings/account-settings-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89_ngx_color_picker_dist_lib_color_picker_module__ = __webpack_require__("./node_modules/ngx-color-picker/dist/lib/color-picker.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89_ngx_color_picker_dist_lib_color_picker_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_89_ngx_color_picker_dist_lib_color_picker_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_90__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_91__angular_cdk_portal__ = __webpack_require__("./node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_92__angular_material_checkbox__ = __webpack_require__("./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_93_vebto_client_core_ui_ui_module__ = __webpack_require__("./node_modules/vebto-client/core/ui/ui.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_94_vebto_client_core_core_module__ = __webpack_require__("./node_modules/vebto-client/core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_95__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_96_vebto_client_auth_auth_routing__ = __webpack_require__("./node_modules/vebto-client/auth/auth.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97_vebto_client_auth_auth_module__ = __webpack_require__("./node_modules/vebto-client/auth/auth.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98__angular_material_divider__ = __webpack_require__("./node_modules/@angular/material/esm5/divider.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99__angular_material_list__ = __webpack_require__("./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_100__angular_material_slide_toggle__ = __webpack_require__("./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_101__angular_material_progress_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_102__material_module__ = __webpack_require__("./src/app/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_103__dashboard_dashboard_routing_module__ = __webpack_require__("./src/app/dashboard/dashboard-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_104__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_105__dashboard_dashboard_module__ = __webpack_require__("./src/app/dashboard/dashboard.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_106_vebto_client_account_settings_account_settings_module__ = __webpack_require__("./node_modules/vebto-client/account-settings/account-settings.module.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 











































































































var AppModuleNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵcmf"](__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]], function (_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmod"]([__WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵCodegenComponentFactoryResolver"], [[8, [__WEBPACK_IMPORTED_MODULE_3__node_modules_ngx_color_picker_dist_lib_color_picker_component_ngfactory__["a" /* ColorPickerComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_snack_bar_typings_index_ngfactory__["a" /* MatSnackBarContainerNgFactory */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_snack_bar_typings_index_ngfactory__["b" /* SimpleSnackBarNgFactory */], __WEBPACK_IMPORTED_MODULE_5__node_modules_vebto_client_core_files_upload_file_modal_upload_file_modal_component_ngfactory__["a" /* UploadFileModalComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_6__node_modules_vebto_client_core_ui_confirm_modal_confirm_modal_component_ngfactory__["a" /* ConfirmModalComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_7__node_modules_vebto_client_core_ui_color_picker_colorpicker_panel_component_ngfactory__["a" /* ColorpickerPanelComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_auth_login_login_component_ngfactory__["a" /* LoginComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_9__node_modules_vebto_client_auth_register_register_component_ngfactory__["a" /* RegisterComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_10__node_modules_vebto_client_auth_forgot_password_forgot_password_component_ngfactory__["a" /* ForgotPasswordComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_11__node_modules_vebto_client_auth_reset_password_reset_password_component_ngfactory__["a" /* ResetPasswordComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_12__node_modules_vebto_client_auth_request_extra_credentials_modal_request_extra_credentials_modal_component_ngfactory__["a" /* RequestExtraCredentialsModalComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_13__node_modules_angular_material_tooltip_typings_index_ngfactory__["a" /* TooltipComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_14__node_modules_angular_material_dialog_typings_index_ngfactory__["a" /* MatDialogContainerNgFactory */], __WEBPACK_IMPORTED_MODULE_15__dashboard_dashboard_component_ngfactory__["a" /* DashboardComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_16__dashboard_new_project_page_new_project_page_component_ngfactory__["a" /* NewProjectPageComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_17__shared_projects_publish_project_modal_publish_project_modal_component_ngfactory__["a" /* PublishProjectModalComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_18__dashboard_new_project_page_new_project_modal_new_project_modal_component_ngfactory__["a" /* NewProjectModalComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_19__node_modules_vebto_client_account_settings_account_settings_component_ngfactory__["a" /* AccountSettingsComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_20__node_modules_vebto_client_account_settings_connect_social_accounts_panel_connect_social_accounts_panel_component_ngfactory__["a" /* ConnectSocialAccountsPanelComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_21__app_component_ngfactory__["a" /* AppComponentNgFactory */]]], [3, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleRef"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵq"], [[3, __WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_22__angular_common__["NgLocalization"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["NgLocaleLocalization"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"], [2, __WEBPACK_IMPORTED_MODULE_22__angular_common__["ɵa"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_ID"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵi"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵn"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵo"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["q" /* ɵe */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Sanitizer"], null, [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["c" /* DomSanitizer */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["f" /* HAMMER_GESTURE_CONFIG */], __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["e" /* GestureConfig */], [[2, __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["j" /* MAT_HAMMER_OPTIONS */]], [2, __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["o" /* MatCommonModule */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["d" /* EVENT_MANAGER_PLUGINS */], function (p0_0, p0_1, p1_0, p2_0, p2_1) { return [new __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["k" /* ɵDomEventsPlugin */](p0_0, p0_1), new __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["o" /* ɵKeyEventsPlugin */](p1_0), new __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["n" /* ɵHammerGesturesPlugin */](p2_0, p2_1)]; }, [__WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["f" /* HAMMER_GESTURE_CONFIG */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["e" /* EventManager */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["e" /* EventManager */], [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["d" /* EVENT_MANAGER_PLUGINS */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](135680, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["m" /* ɵDomSharedStylesHost */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["m" /* ɵDomSharedStylesHost */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["l" /* ɵDomRendererFactory2 */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["l" /* ɵDomRendererFactory2 */], [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["e" /* EventManager */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["m" /* ɵDomSharedStylesHost */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_25__angular_animations_browser__["a" /* AnimationDriver */], __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser_animations__["d" /* ɵc */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_25__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */], __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser_animations__["e" /* ɵd */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_25__angular_animations_browser__["b" /* ɵAnimationEngine */], __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser_animations__["c" /* ɵb */], [__WEBPACK_IMPORTED_MODULE_25__angular_animations_browser__["a" /* AnimationDriver */], __WEBPACK_IMPORTED_MODULE_25__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["RendererFactory2"], __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser_animations__["f" /* ɵe */], [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["l" /* ɵDomRendererFactory2 */], __WEBPACK_IMPORTED_MODULE_25__angular_animations_browser__["b" /* ɵAnimationEngine */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["p" /* ɵSharedStylesHost */], null, [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["m" /* ɵDomSharedStylesHost */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Testability"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Testability"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["h" /* Meta */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["h" /* Meta */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["i" /* Title */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["i" /* Title */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_27__angular_animations__["b" /* AnimationBuilder */], __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser_animations__["b" /* ɵBrowserAnimationBuilder */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["RendererFactory2"], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["b" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_28__angular_forms__["A" /* ɵi */], __WEBPACK_IMPORTED_MODULE_28__angular_forms__["A" /* ɵi */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_28__angular_forms__["e" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_28__angular_forms__["e" /* FormBuilder */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["i" /* HttpXsrfTokenExtractor */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["o" /* ɵh */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["PLATFORM_ID"], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["m" /* ɵf */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["p" /* ɵi */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["p" /* ɵi */], [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["i" /* HttpXsrfTokenExtractor */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["n" /* ɵg */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["a" /* HTTP_INTERCEPTORS */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["p" /* ɵi */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["l" /* ɵe */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["l" /* ɵe */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["j" /* XhrFactory */], null, [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["l" /* ɵe */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["h" /* HttpXhrBackend */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["h" /* HttpXhrBackend */], [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["j" /* XhrFactory */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["b" /* HttpBackend */], null, [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["h" /* HttpXhrBackend */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["f" /* HttpHandler */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["k" /* ɵc */], [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["b" /* HttpBackend */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["c" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["c" /* HttpClient */], [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["f" /* HttpHandler */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_30_ngx_color_picker_dist_lib_color_picker_service__["ColorPickerService"], __WEBPACK_IMPORTED_MODULE_30_ngx_color_picker_dist_lib_color_picker_service__["ColorPickerService"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_bidi__["b" /* DIR_DOCUMENT */], null, [__WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_bidi__["c" /* Directionality */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_bidi__["c" /* Directionality */], [[2, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_bidi__["b" /* DIR_DOCUMENT */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["a" /* Platform */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["l" /* InteractivityChecker */], __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["l" /* InteractivityChecker */], [__WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["a" /* Platform */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["k" /* FocusTrapFactory */], __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["k" /* FocusTrapFactory */], [__WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["l" /* InteractivityChecker */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](136192, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["e" /* AriaDescriber */], __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["c" /* ARIA_DESCRIBER_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["e" /* AriaDescriber */]], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["p" /* LiveAnnouncer */], __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["o" /* LIVE_ANNOUNCER_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["p" /* LiveAnnouncer */]], [2, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["m" /* LIVE_ANNOUNCER_ELEMENT_TOKEN */]], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["h" /* FOCUS_MONITOR_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["j" /* FocusMonitor */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["a" /* Platform */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["d" /* ScrollDispatcher */], __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["b" /* SCROLL_DISPATCHER_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["d" /* ScrollDispatcher */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["a" /* Platform */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["g" /* ViewportRuler */], __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["f" /* VIEWPORT_RULER_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["g" /* ViewportRuler */]], __WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["i" /* ScrollStrategyOptions */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["i" /* ScrollStrategyOptions */], [__WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["d" /* ScrollDispatcher */], __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["g" /* ViewportRuler */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["e" /* OverlayContainer */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["k" /* ɵa */], [[3, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["e" /* OverlayContainer */]], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["h" /* OverlayPositionBuilder */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["h" /* OverlayPositionBuilder */], [__WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["g" /* ViewportRuler */], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["f" /* OverlayKeyboardDispatcher */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["n" /* ɵf */], [[3, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["f" /* OverlayKeyboardDispatcher */]], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */], [__WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["i" /* ScrollStrategyOptions */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["e" /* OverlayContainer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["h" /* OverlayPositionBuilder */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["f" /* OverlayKeyboardDispatcher */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["l" /* ɵc */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["m" /* ɵd */], [__WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__["d" /* MediaMatcher */], __WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__["d" /* MediaMatcher */], [__WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["a" /* Platform */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](135680, __WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__["a" /* BreakpointObserver */], __WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__["a" /* BreakpointObserver */], [__WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__["d" /* MediaMatcher */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_37__angular_material_snack_bar__["b" /* MatSnackBar */], __WEBPACK_IMPORTED_MODULE_37__angular_material_snack_bar__["b" /* MatSnackBar */], [__WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["p" /* LiveAnnouncer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__["a" /* BreakpointObserver */], [3, __WEBPACK_IMPORTED_MODULE_37__angular_material_snack_bar__["b" /* MatSnackBar */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_38__angular_material_menu__["b" /* MAT_MENU_SCROLL_STRATEGY */], __WEBPACK_IMPORTED_MODULE_38__angular_material_menu__["g" /* ɵc22 */], [__WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_39__angular_cdk_observers__["b" /* MutationObserverFactory */], __WEBPACK_IMPORTED_MODULE_39__angular_cdk_observers__["b" /* MutationObserverFactory */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_40_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_40_vebto_client_translations_translations_service__["a" /* Translations */], [__WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_42_vebto_client_core_ui_toast_service__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_42_vebto_client_core_ui_toast_service__["a" /* Toast */], [__WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_40_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_37__angular_material_snack_bar__["b" /* MatSnackBar */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["c" /* MAT_DIALOG_SCROLL_STRATEGY */], __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["d" /* MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY */], [__WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["e" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["e" /* MatDialog */], [__WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], [2, __WEBPACK_IMPORTED_MODULE_22__angular_common__["Location"]], [2, __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["b" /* MAT_DIALOG_DEFAULT_OPTIONS */]], __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["c" /* MAT_DIALOG_SCROLL_STRATEGY */], [3, __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["e" /* MatDialog */]], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["e" /* OverlayContainer */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_44_vebto_client_core_ui_modal_service__["a" /* Modal */], __WEBPACK_IMPORTED_MODULE_44_vebto_client_core_ui_modal_service__["a" /* Modal */], [__WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["e" /* MatDialog */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_45_vebto_client_core_ui_color_picker_color_picker_panel_service__["a" /* ColorPickerPanel */], __WEBPACK_IMPORTED_MODULE_45_vebto_client_core_ui_color_picker_color_picker_panel_service__["a" /* ColorPickerPanel */], [__WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_46__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["z" /* ɵf */], [__WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_46__angular_router__["f" /* NoPreloading */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["f" /* NoPreloading */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_46__angular_router__["h" /* PreloadingStrategy */], null, [__WEBPACK_IMPORTED_MODULE_46__angular_router__["f" /* NoPreloading */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](135680, __WEBPACK_IMPORTED_MODULE_46__angular_router__["r" /* RouterPreloader */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["r" /* RouterPreloader */], [__WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_46__angular_router__["h" /* PreloadingStrategy */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_46__angular_router__["g" /* PreloadAllModules */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["g" /* PreloadAllModules */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_46__angular_router__["j" /* ROUTER_INITIALIZER */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["C" /* ɵi */], [__WEBPACK_IMPORTED_MODULE_46__angular_router__["A" /* ɵg */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_BOOTSTRAP_LISTENER"], function (p0_0, p1_0) { return [p0_0, p1_0]; }, [__WEBPACK_IMPORTED_MODULE_46__angular_router__["j" /* ROUTER_INITIALIZER */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["j" /* ROUTER_INITIALIZER */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_47_vebto_client_core_http_http_error_handler_service__["a" /* HttpErrorHandler */], __WEBPACK_IMPORTED_MODULE_47_vebto_client_core_http_http_error_handler_service__["a" /* HttpErrorHandler */], [__WEBPACK_IMPORTED_MODULE_40_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_42_vebto_client_core_ui_toast_service__["a" /* Toast */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */], __WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */], [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["c" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_47_vebto_client_core_http_http_error_handler_service__["a" /* HttpErrorHandler */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_50_vebto_client_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_50_vebto_client_auth_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */], __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_42_vebto_client_core_ui_toast_service__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_51_vebto_client_auth_social_auth_service__["a" /* SocialAuthService */], __WEBPACK_IMPORTED_MODULE_51_vebto_client_auth_social_auth_service__["a" /* SocialAuthService */], [__WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */], __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_42_vebto_client_core_ui_toast_service__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_50_vebto_client_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_40_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_44_vebto_client_core_ui_modal_service__["a" /* Modal */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_52_vebto_client_guards_guest_guard_service__["a" /* GuestGuard */], __WEBPACK_IMPORTED_MODULE_52_vebto_client_guards_guest_guard_service__["a" /* GuestGuard */], [__WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */], __WEBPACK_IMPORTED_MODULE_50_vebto_client_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_53_vebto_client_guards_disable_route_guard_service__["a" /* DisableRouteGuard */], __WEBPACK_IMPORTED_MODULE_53_vebto_client_guards_disable_route_guard_service__["a" /* DisableRouteGuard */], [__WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_54_vebto_client_guards_auth_guard_service__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_54_vebto_client_guards_auth_guard_service__["a" /* AuthGuard */], [__WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_55_vebto_client_auth_users_service__["a" /* Users */], __WEBPACK_IMPORTED_MODULE_55_vebto_client_auth_users_service__["a" /* Users */], [__WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_56__angular_material_tooltip__["b" /* MAT_TOOLTIP_SCROLL_STRATEGY */], __WEBPACK_IMPORTED_MODULE_56__angular_material_tooltip__["c" /* MAT_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY */], [__WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_57__shared_templates_templates_service__["a" /* Templates */], __WEBPACK_IMPORTED_MODULE_57__shared_templates_templates_service__["a" /* Templates */], [__WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_58_vebto_client_core_http_http_cache_client__["a" /* HttpCacheClient */], __WEBPACK_IMPORTED_MODULE_58_vebto_client_core_http_http_cache_client__["a" /* HttpCacheClient */], [__WEBPACK_IMPORTED_MODULE_29__angular_common_http__["c" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_47_vebto_client_core_http_http_error_handler_service__["a" /* HttpErrorHandler */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_59__shared_themes_themes_service__["a" /* Themes */], __WEBPACK_IMPORTED_MODULE_59__shared_themes_themes_service__["a" /* Themes */], [__WEBPACK_IMPORTED_MODULE_58_vebto_client_core_http_http_cache_client__["a" /* HttpCacheClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_60__shared_projects_project_url_service__["a" /* ProjectUrl */], __WEBPACK_IMPORTED_MODULE_60__shared_projects_project_url_service__["a" /* ProjectUrl */], [__WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_61__shared_dom_helpers_service__["a" /* DomHelpers */], __WEBPACK_IMPORTED_MODULE_61__shared_dom_helpers_service__["a" /* DomHelpers */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_62__shared_projects_projects_service__["a" /* Projects */], __WEBPACK_IMPORTED_MODULE_62__shared_projects_projects_service__["a" /* Projects */], [__WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_63__dashboard_projects_resolver_service__["a" /* ProjectsResolver */], __WEBPACK_IMPORTED_MODULE_63__dashboard_projects_resolver_service__["a" /* ProjectsResolver */], [__WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_62__shared_projects_projects_service__["a" /* Projects */], __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_64__dashboard_new_project_page_templates_resolver_service__["a" /* TemplatesResolver */], __WEBPACK_IMPORTED_MODULE_64__dashboard_new_project_page_templates_resolver_service__["a" /* TemplatesResolver */], [__WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_57__shared_templates_templates_service__["a" /* Templates */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_65_vebto_client_core_services_value_lists_service__["a" /* ValueLists */], __WEBPACK_IMPORTED_MODULE_65_vebto_client_core_services_value_lists_service__["a" /* ValueLists */], [__WEBPACK_IMPORTED_MODULE_58_vebto_client_core_http_http_cache_client__["a" /* HttpCacheClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_66_vebto_client_account_settings_account_settings_resolve_service__["a" /* AccountSettingsResolve */], __WEBPACK_IMPORTED_MODULE_66_vebto_client_account_settings_account_settings_resolve_service__["a" /* AccountSettingsResolve */], [__WEBPACK_IMPORTED_MODULE_55_vebto_client_auth_users_service__["a" /* Users */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */], __WEBPACK_IMPORTED_MODULE_65_vebto_client_core_services_value_lists_service__["a" /* ValueLists */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_67_vebto_client_translations_localizations_service__["a" /* Localizations */], __WEBPACK_IMPORTED_MODULE_67_vebto_client_translations_localizations_service__["a" /* Localizations */], [__WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */], __WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_68_vebto_client_core_ui_context_menu_context_menu_service__["a" /* ContextMenu */], __WEBPACK_IMPORTED_MODULE_68_vebto_client_core_ui_context_menu_context_menu_service__["a" /* ContextMenu */], [__WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["c" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_69_vebto_client_core_services_utils__["a" /* utils */], __WEBPACK_IMPORTED_MODULE_69_vebto_client_core_services_utils__["a" /* utils */], [__WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_70_vebto_client_core_services_local_storage_service__["a" /* LocalStorage */], __WEBPACK_IMPORTED_MODULE_70_vebto_client_core_services_local_storage_service__["a" /* LocalStorage */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_71_vebto_client_core_services_browser_events_service__["a" /* BrowserEvents */], __WEBPACK_IMPORTED_MODULE_71_vebto_client_core_services_browser_events_service__["a" /* BrowserEvents */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_72_vebto_client_core_files_file_validator__["a" /* FileValidator */], __WEBPACK_IMPORTED_MODULE_72_vebto_client_core_files_file_validator__["a" /* FileValidator */], [__WEBPACK_IMPORTED_MODULE_37__angular_material_snack_bar__["b" /* MatSnackBar */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_73_vebto_client_core_files_uploads_service__["a" /* Uploads */], __WEBPACK_IMPORTED_MODULE_73_vebto_client_core_files_uploads_service__["a" /* Uploads */], [__WEBPACK_IMPORTED_MODULE_49_vebto_client_core_http_app_http_client_service__["a" /* AppHttpClient */], __WEBPACK_IMPORTED_MODULE_72_vebto_client_core_files_file_validator__["a" /* FileValidator */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_74_vebto_client_core_services_preview_app_service__["a" /* PreviewApp */], __WEBPACK_IMPORTED_MODULE_74_vebto_client_core_services_preview_app_service__["a" /* PreviewApp */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_75_vebto_client_core_keybinds_keybinds_service__["a" /* Keybinds */], __WEBPACK_IMPORTED_MODULE_75_vebto_client_core_keybinds_keybinds_service__["a" /* Keybinds */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["DOCUMENT"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_76_vebto_client_core_services_title_service__["a" /* TitleService */], __WEBPACK_IMPORTED_MODULE_76_vebto_client_core_services_title_service__["a" /* TitleService */], [__WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["i" /* Title */], __WEBPACK_IMPORTED_MODULE_40_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_77_vebto_client_core_services_custom_homepage_service__["a" /* CustomHomepage */], __WEBPACK_IMPORTED_MODULE_77_vebto_client_core_services_custom_homepage_service__["a" /* CustomHomepage */], [__WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_22__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["CommonModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_78_vebto_client_core_vebto_config_service__["a" /* VebtoConfig */], __WEBPACK_IMPORTED_MODULE_78_vebto_client_core_vebto_config_service__["a" /* VebtoConfig */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */], [__WEBPACK_IMPORTED_MODULE_78_vebto_client_core_vebto_config_service__["a" /* VebtoConfig */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */], __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], __WEBPACK_IMPORTED_MODULE_79_vebto_client_core_raven_error_handler__["a" /* errorHandlerFactory */], [__WEBPACK_IMPORTED_MODULE_41_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_48_vebto_client_auth_current_user__["a" /* CurrentUser */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgProbeToken"], function () { return [__WEBPACK_IMPORTED_MODULE_46__angular_router__["v" /* ɵb */](), __WEBPACK_IMPORTED_MODULE_46__angular_router__["v" /* ɵb */]()]; }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_46__angular_router__["A" /* ɵg */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["A" /* ɵg */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_80_vebto_client_core_bootstrapper_service__["a" /* Bootstrapper */], __WEBPACK_IMPORTED_MODULE_80_vebto_client_core_bootstrapper_service__["a" /* Bootstrapper */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_INITIALIZER"], function (p0_0, p1_0, p2_0, p3_0) { return [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["s" /* ɵh */](p0_0), __WEBPACK_IMPORTED_MODULE_46__angular_router__["B" /* ɵh */](p1_0), __WEBPACK_IMPORTED_MODULE_46__angular_router__["B" /* ɵh */](p2_0), __WEBPACK_IMPORTED_MODULE_80_vebto_client_core_bootstrapper_service__["b" /* init_app */](p3_0)]; }, [[2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgProbeToken"]], __WEBPACK_IMPORTED_MODULE_46__angular_router__["A" /* ɵg */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["A" /* ɵg */], __WEBPACK_IMPORTED_MODULE_80_vebto_client_core_bootstrapper_service__["a" /* Bootstrapper */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"], [[2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_INITIALIZER"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](131584, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵConsole"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationModule"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationModule"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["a" /* BrowserModule */], [[3, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["a" /* BrowserModule */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_28__angular_forms__["x" /* ɵba */], __WEBPACK_IMPORTED_MODULE_28__angular_forms__["x" /* ɵba */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_28__angular_forms__["k" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_28__angular_forms__["k" /* FormsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_28__angular_forms__["t" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_28__angular_forms__["t" /* ReactiveFormsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_46__angular_router__["u" /* ɵa */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["x" /* ɵd */], [[3, __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_46__angular_router__["t" /* UrlSerializer */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["c" /* DefaultUrlSerializer */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_46__angular_router__["b" /* ChildrenOutletContexts */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["b" /* ChildrenOutletContexts */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_46__angular_router__["i" /* ROUTER_CONFIGURATION */], {}, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_22__angular_common__["LocationStrategy"], __WEBPACK_IMPORTED_MODULE_46__angular_router__["w" /* ɵc */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["PlatformLocation"], [2, __WEBPACK_IMPORTED_MODULE_22__angular_common__["APP_BASE_HREF"]], __WEBPACK_IMPORTED_MODULE_46__angular_router__["i" /* ROUTER_CONFIGURATION */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_22__angular_common__["Location"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["Location"], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["LocationStrategy"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["SystemJsNgModuleLoader"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], [2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["SystemJsNgModuleLoaderConfig"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_46__angular_router__["k" /* ROUTES */], function () { return [[{ path: "", component: __WEBPACK_IMPORTED_MODULE_81_vebto_client_auth_login_login_component__["a" /* LoginComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_52_vebto_client_guards_guest_guard_service__["a" /* GuestGuard */]] }, { path: "builder", loadChildren: "app/html-builder/html-builder.module#HtmlBuilderModule" }, { path: "admin", loadChildren: "app/admin/app-admin.module#AppAdminModule" }], [{ path: "login", component: __WEBPACK_IMPORTED_MODULE_81_vebto_client_auth_login_login_component__["a" /* LoginComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_52_vebto_client_guards_guest_guard_service__["a" /* GuestGuard */]] }, { path: "register", component: __WEBPACK_IMPORTED_MODULE_82_vebto_client_auth_register_register_component__["a" /* RegisterComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_52_vebto_client_guards_guest_guard_service__["a" /* GuestGuard */], __WEBPACK_IMPORTED_MODULE_53_vebto_client_guards_disable_route_guard_service__["a" /* DisableRouteGuard */]] }, { path: "forgot-password", component: __WEBPACK_IMPORTED_MODULE_83_vebto_client_auth_forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_52_vebto_client_guards_guest_guard_service__["a" /* GuestGuard */]] }, { path: "password/reset/:token", component: __WEBPACK_IMPORTED_MODULE_84_vebto_client_auth_reset_password_reset_password_component__["a" /* ResetPasswordComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_52_vebto_client_guards_guest_guard_service__["a" /* GuestGuard */]] }], [{ path: "dashboard", component: __WEBPACK_IMPORTED_MODULE_85__dashboard_dashboard_component__["a" /* DashboardComponent */], resolve: { projects: __WEBPACK_IMPORTED_MODULE_63__dashboard_projects_resolver_service__["a" /* ProjectsResolver */] } }, { path: "dashboard/projects", redirectTo: "dashboard", pathMatch: "full" }, { path: "dashboard/projects/new", component: __WEBPACK_IMPORTED_MODULE_86__dashboard_new_project_page_new_project_page_component__["a" /* NewProjectPageComponent */], resolve: { templates: __WEBPACK_IMPORTED_MODULE_64__dashboard_new_project_page_templates_resolver_service__["a" /* TemplatesResolver */] } }], [{ path: "account/settings", component: __WEBPACK_IMPORTED_MODULE_87_vebto_client_account_settings_account_settings_component__["a" /* AccountSettingsComponent */], resolve: { resolves: __WEBPACK_IMPORTED_MODULE_66_vebto_client_account_settings_account_settings_resolve_service__["a" /* AccountSettingsResolve */] }, canActivate: [__WEBPACK_IMPORTED_MODULE_54_vebto_client_guards_auth_guard_service__["a" /* AuthGuard */]], data: __WEBPACK_IMPORTED_MODULE_88_vebto_client_account_settings_account_settings_routing_module__["b" /* ɵ0 */] }]]; }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["y" /* ɵe */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_46__angular_router__["t" /* UrlSerializer */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["b" /* ChildrenOutletContexts */], __WEBPACK_IMPORTED_MODULE_22__angular_common__["Location"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_46__angular_router__["k" /* ROUTES */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["i" /* ROUTER_CONFIGURATION */], [2, __WEBPACK_IMPORTED_MODULE_46__angular_router__["s" /* UrlHandlingStrategy */]], [2, __WEBPACK_IMPORTED_MODULE_46__angular_router__["l" /* RouteReuseStrategy */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_46__angular_router__["p" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_46__angular_router__["p" /* RouterModule */], [[2, __WEBPACK_IMPORTED_MODULE_46__angular_router__["u" /* ɵa */]], [2, __WEBPACK_IMPORTED_MODULE_46__angular_router__["m" /* Router */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["e" /* HttpClientXsrfModule */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["e" /* HttpClientXsrfModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["d" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["d" /* HttpClientModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_89_ngx_color_picker_dist_lib_color_picker_module__["ColorPickerModule"], __WEBPACK_IMPORTED_MODULE_89_ngx_color_picker_dist_lib_color_picker_module__["ColorPickerModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_bidi__["a" /* BidiModule */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_bidi__["a" /* BidiModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["f" /* MATERIAL_SANITY_CHECKS */], true, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["o" /* MatCommonModule */], __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["o" /* MatCommonModule */], [[2, __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["f" /* MATERIAL_SANITY_CHECKS */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["b" /* PlatformModule */], __WEBPACK_IMPORTED_MODULE_32__angular_cdk_platform__["b" /* PlatformModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["z" /* MatRippleModule */], __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["z" /* MatRippleModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["a" /* A11yModule */], __WEBPACK_IMPORTED_MODULE_33__angular_cdk_a11y__["a" /* A11yModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_90__angular_material_button__["c" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_90__angular_material_button__["c" /* MatButtonModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_91__angular_cdk_portal__["g" /* PortalModule */], __WEBPACK_IMPORTED_MODULE_91__angular_cdk_portal__["g" /* PortalModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["c" /* ScrollDispatchModule */], __WEBPACK_IMPORTED_MODULE_34__angular_cdk_scrolling__["c" /* ScrollDispatchModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["g" /* OverlayModule */], __WEBPACK_IMPORTED_MODULE_35__angular_cdk_overlay__["g" /* OverlayModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__["c" /* LayoutModule */], __WEBPACK_IMPORTED_MODULE_36__angular_cdk_layout__["c" /* LayoutModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_37__angular_material_snack_bar__["d" /* MatSnackBarModule */], __WEBPACK_IMPORTED_MODULE_37__angular_material_snack_bar__["d" /* MatSnackBarModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_38__angular_material_menu__["e" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_38__angular_material_menu__["e" /* MatMenuModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_39__angular_cdk_observers__["c" /* ObserversModule */], __WEBPACK_IMPORTED_MODULE_39__angular_cdk_observers__["c" /* ObserversModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_92__angular_material_checkbox__["c" /* MatCheckboxModule */], __WEBPACK_IMPORTED_MODULE_92__angular_material_checkbox__["c" /* MatCheckboxModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_93_vebto_client_core_ui_ui_module__["a" /* UiModule */], __WEBPACK_IMPORTED_MODULE_93_vebto_client_core_ui_ui_module__["a" /* UiModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_94_vebto_client_core_core_module__["a" /* CoreModule */], __WEBPACK_IMPORTED_MODULE_94_vebto_client_core_core_module__["a" /* CoreModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_95__app_routing_module__["a" /* AppRoutingModule */], __WEBPACK_IMPORTED_MODULE_95__app_routing_module__["a" /* AppRoutingModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_96_vebto_client_auth_auth_routing__["a" /* AuthRoutingModule */], __WEBPACK_IMPORTED_MODULE_96_vebto_client_auth_auth_routing__["a" /* AuthRoutingModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_97_vebto_client_auth_auth_module__["a" /* AuthModule */], __WEBPACK_IMPORTED_MODULE_97_vebto_client_auth_auth_module__["a" /* AuthModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_56__angular_material_tooltip__["e" /* MatTooltipModule */], __WEBPACK_IMPORTED_MODULE_56__angular_material_tooltip__["e" /* MatTooltipModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["i" /* MatDialogModule */], __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["i" /* MatDialogModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["q" /* MatLineModule */], __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["q" /* MatLineModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["x" /* MatPseudoCheckboxModule */], __WEBPACK_IMPORTED_MODULE_24__angular_material_core__["x" /* MatPseudoCheckboxModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_98__angular_material_divider__["a" /* MatDividerModule */], __WEBPACK_IMPORTED_MODULE_98__angular_material_divider__["a" /* MatDividerModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_99__angular_material_list__["d" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_99__angular_material_list__["d" /* MatListModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_100__angular_material_slide_toggle__["b" /* MatSlideToggleModule */], __WEBPACK_IMPORTED_MODULE_100__angular_material_slide_toggle__["b" /* MatSlideToggleModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_101__angular_material_progress_bar__["b" /* MatProgressBarModule */], __WEBPACK_IMPORTED_MODULE_101__angular_material_progress_bar__["b" /* MatProgressBarModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_102__material_module__["a" /* MaterialModule */], __WEBPACK_IMPORTED_MODULE_102__material_module__["a" /* MaterialModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_103__dashboard_dashboard_routing_module__["a" /* DashboardRoutingModule */], __WEBPACK_IMPORTED_MODULE_103__dashboard_dashboard_routing_module__["a" /* DashboardRoutingModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_104__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_104__shared_shared_module__["a" /* SharedModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_105__dashboard_dashboard_module__["a" /* DashboardModule */], __WEBPACK_IMPORTED_MODULE_105__dashboard_dashboard_module__["a" /* DashboardModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_88_vebto_client_account_settings_account_settings_routing_module__["a" /* AccountSettingsRoutingModule */], __WEBPACK_IMPORTED_MODULE_88_vebto_client_account_settings_account_settings_routing_module__["a" /* AccountSettingsRoutingModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_106_vebto_client_account_settings_account_settings_module__["a" /* AccountSettingsModule */], __WEBPACK_IMPORTED_MODULE_106_vebto_client_account_settings_account_settings_module__["a" /* AccountSettingsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], __WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["m" /* ɵf */], "XSRF-TOKEN", []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_29__angular_common_http__["n" /* ɵg */], "X-XSRF-TOKEN", []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_38__angular_material_menu__["a" /* MAT_MENU_DEFAULT_OPTIONS */], { overlapTrigger: true, xPosition: "after", yPosition: "below" }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_56__angular_material_tooltip__["a" /* MAT_TOOLTIP_DEFAULT_OPTIONS */], { showDelay: 0, hideDelay: 0, touchendHideDelay: 1500 }, [])]); });



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    return AppModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__projects_resolver_service__ = __webpack_require__("./src/app/dashboard/projects-resolver.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_project_page_new_project_page_component__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__new_project_page_templates_resolver_service__ = __webpack_require__("./src/app/dashboard/new-project-page/templates-resolver.service.ts");




var routes = [
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_0__dashboard_component__["a" /* DashboardComponent */], resolve: { projects: __WEBPACK_IMPORTED_MODULE_1__projects_resolver_service__["a" /* ProjectsResolver */] } },
    { path: 'dashboard/projects', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard/projects/new', component: __WEBPACK_IMPORTED_MODULE_2__new_project_page_new_project_page_component__["a" /* NewProjectPageComponent */], resolve: { templates: __WEBPACK_IMPORTED_MODULE_3__new_project_page_templates_resolver_service__["a" /* TemplatesResolver */] } },
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_DashboardComponent */
/* unused harmony export View_DashboardComponent_0 */
/* unused harmony export View_DashboardComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_component_scss_ngstyle__ = __webpack_require__("./src/app/dashboard/dashboard.component.scss.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/svg-icon/svg-icon.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/svg-icon/svg-icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__ = __webpack_require__("./node_modules/vebto-client/translations/translate.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__ = __webpack_require__("./node_modules/vebto-client/translations/translations.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__ = __webpack_require__("./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_cdk_overlay__ = __webpack_require__("./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_cdk_scrolling__ = __webpack_require__("./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_cdk_bidi__ = __webpack_require__("./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__node_modules_vebto_client_core_ui_no_results_message_no_results_message_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/no-results-message/no-results-message.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_vebto_client_core_ui_no_results_message_no_results_message_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/no-results-message/no-results-message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_vebto_client_core_ui_formatted_date_pipe__ = __webpack_require__("./node_modules/vebto-client/core/ui/formatted-date.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__node_modules_vebto_client_core_ui_material_navbar_material_navbar_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/material-navbar/material-navbar.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_vebto_client_core_ui_material_navbar_material_navbar_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/material-navbar/material-navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_vebto_client_core_vebto_config_service__ = __webpack_require__("./node_modules/vebto-client/core/vebto-config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/ad-host/ad-host.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_vebto_client_core_ui_ad_host_ad_host_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/ad-host/ad-host.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_vebto_client_core_services_utils__ = __webpack_require__("./node_modules/vebto-client/core/services/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_vebto_client_admin_pagination_url_aware_paginator_service__ = __webpack_require__("./node_modules/vebto-client/admin/pagination/url-aware-paginator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_vebto_client_auth_current_user__ = __webpack_require__("./node_modules/vebto-client/auth/current-user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__shared_projects_projects_service__ = __webpack_require__("./src/app/shared/projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_vebto_client_core_ui_toast_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/toast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_vebto_client_core_ui_modal_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/modal.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__shared_projects_project_url_service__ = __webpack_require__("./src/app/shared/projects/project-url.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


































var styles_DashboardComponent = [__WEBPACK_IMPORTED_MODULE_0__dashboard_component_scss_ngstyle__["a" /* styles */]];
var RenderType_DashboardComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 2, styles: styles_DashboardComponent, data: {} });

function View_DashboardComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "a", [["class", "upgrade-button"], ["color", "accent"], ["mat-raised-button", ""], ["routerLink", "/account/settings/subscription"]], [[1, "tabindex", 0], [1, "disabled", 0], [1, "aria-disabled", 0], [1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._haltDisabledEvents($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["c" /* View_MatAnchor_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatAnchor */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["a" /* MatAnchor */], [__WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_router__["o" /* RouterLinkWithHref */], [__WEBPACK_IMPORTED_MODULE_6__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_7__angular_common__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, 0, 1, "svg-icon", [["name", "flash-on"]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["b" /* View_SvgIconComponent_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["a" /* RenderType_SvgIconComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__["a" /* SvgIconComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, 0, 2, "span", [["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Manage Subscription"]))], function (_ck, _v) { var currVal_5 = "accent"; _ck(_v, 1, 0, currVal_5); var currVal_6 = "/account/settings/subscription"; _ck(_v, 2, 0, currVal_6); var currVal_7 = "flash-on"; _ck(_v, 4, 0, currVal_7); }, function (_ck, _v) { var currVal_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled ? (0 - 1) : 0); var currVal_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled || null); var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled.toString(); var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).target; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).href; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); }); }
function View_DashboardComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "a", [["class", "upgrade-button"], ["color", "accent"], ["mat-raised-button", ""], ["routerLink", "/billing/upgrade"]], [[1, "tabindex", 0], [1, "disabled", 0], [1, "aria-disabled", 0], [1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._haltDisabledEvents($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["c" /* View_MatAnchor_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatAnchor */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["a" /* MatAnchor */], [__WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_router__["o" /* RouterLinkWithHref */], [__WEBPACK_IMPORTED_MODULE_6__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_7__angular_common__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, 0, 1, "svg-icon", [["name", "flash-on"]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["b" /* View_SvgIconComponent_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["a" /* RenderType_SvgIconComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__["a" /* SvgIconComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, 0, 2, "span", [["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Upgrade to Premium"]))], function (_ck, _v) { var currVal_5 = "accent"; _ck(_v, 1, 0, currVal_5); var currVal_6 = "/billing/upgrade"; _ck(_v, 2, 0, currVal_6); var currVal_7 = "flash-on"; _ck(_v, 4, 0, currVal_7); }, function (_ck, _v) { var currVal_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled ? (0 - 1) : 0); var currVal_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled || null); var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled.toString(); var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).target; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).href; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); }); }
function View_DashboardComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_DashboardComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_DashboardComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.currentUser.isSubscribed(); _ck(_v, 2, 0, currVal_0); var currVal_1 = !_co.currentUser.isSubscribed(); _ck(_v, 4, 0, currVal_1); }, null); }
function View_DashboardComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 28, "div", [["class", "project"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 3, "div", [["class", "header"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 2, "a", [["target", "_blank"], ["trans", ""]], [[8, "href", 4]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["View Site"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 0, "img", [], [[8, "src", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openBuilder(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 22, "div", [["class", "footer"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 5, "div", [["class", "title"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](8, 0, null, null, 1, "div", [["class", "name"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](9, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](10, 0, null, null, 2, "div", [["class", "updated"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](11, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵppd"](12, 1), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](13, 0, null, null, 15, "div", [["class", "actions"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 16777216, null, null, 4, "button", [["color", "accent"], ["mat-icon-button", ""], ["matTooltip", "Open in builder"]], [[8, "disabled", 0]], [[null, "click"], [null, "longpress"], [null, "keydown"], [null, "touchend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("longpress" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 16).show() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 16)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("touchend" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 16)._handleTouchend() !== false);
        ad = (pd_2 && ad);
    } if (("click" === en)) {
        var pd_3 = (_co.openBuilder(_v.context.$implicit) !== false);
        ad = (pd_3 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["d" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](15, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](16, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["d" /* MatTooltip */], [__WEBPACK_IMPORTED_MODULE_14__angular_cdk_overlay__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_15__angular_cdk_scrolling__["d" /* ScrollDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["e" /* AriaDescriber */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["b" /* MAT_TOOLTIP_SCROLL_STRATEGY */], [2, __WEBPACK_IMPORTED_MODULE_16__angular_cdk_bidi__["c" /* Directionality */]], [2, __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["a" /* MAT_TOOLTIP_DEFAULT_OPTIONS */]]], { message: [0, "message"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](17, 0, null, 0, 1, "svg-icon", [["name", "brush"]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["b" /* View_SvgIconComponent_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["a" /* RenderType_SvgIconComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](18, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__["a" /* SvgIconComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 16777216, null, null, 4, "button", [["color", "accent"], ["mat-icon-button", ""], ["matTooltip", "Publish"]], [[8, "disabled", 0]], [[null, "click"], [null, "longpress"], [null, "keydown"], [null, "touchend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("longpress" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 21).show() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 21)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("touchend" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 21)._handleTouchend() !== false);
        ad = (pd_2 && ad);
    } if (("click" === en)) {
        var pd_3 = (_co.openPublishProjectModal(_v.context.$implicit) !== false);
        ad = (pd_3 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["d" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](20, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { disabled: [0, "disabled"], color: [1, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](21, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["d" /* MatTooltip */], [__WEBPACK_IMPORTED_MODULE_14__angular_cdk_overlay__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_15__angular_cdk_scrolling__["d" /* ScrollDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["e" /* AriaDescriber */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["b" /* MAT_TOOLTIP_SCROLL_STRATEGY */], [2, __WEBPACK_IMPORTED_MODULE_16__angular_cdk_bidi__["c" /* Directionality */]], [2, __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["a" /* MAT_TOOLTIP_DEFAULT_OPTIONS */]]], { message: [0, "message"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, 0, 1, "svg-icon", [["name", "publish"]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["b" /* View_SvgIconComponent_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["a" /* RenderType_SvgIconComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__["a" /* SvgIconComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](24, 16777216, null, null, 4, "button", [["color", "accent"], ["mat-icon-button", ""], ["matTooltip", "Delete"]], [[8, "disabled", 0]], [[null, "click"], [null, "longpress"], [null, "keydown"], [null, "touchend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("longpress" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26).show() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("touchend" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26)._handleTouchend() !== false);
        ad = (pd_2 && ad);
    } if (("click" === en)) {
        var pd_3 = (_co.deleteProjectWithConfirmation(_v.context.$implicit) !== false);
        ad = (pd_3 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["d" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](25, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](26, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["d" /* MatTooltip */], [__WEBPACK_IMPORTED_MODULE_14__angular_cdk_overlay__["c" /* Overlay */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_15__angular_cdk_scrolling__["d" /* ScrollDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["e" /* AriaDescriber */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["b" /* MAT_TOOLTIP_SCROLL_STRATEGY */], [2, __WEBPACK_IMPORTED_MODULE_16__angular_cdk_bidi__["c" /* Directionality */]], [2, __WEBPACK_IMPORTED_MODULE_13__angular_material_tooltip__["a" /* MAT_TOOLTIP_DEFAULT_OPTIONS */]]], { message: [0, "message"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](27, 0, null, 0, 1, "svg-icon", [["name", "delete"]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["b" /* View_SvgIconComponent_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["a" /* RenderType_SvgIconComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](28, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__["a" /* SvgIconComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], { name: [0, "name"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_5 = "accent"; _ck(_v, 15, 0, currVal_5); var currVal_6 = "Open in builder"; _ck(_v, 16, 0, currVal_6); var currVal_7 = "brush"; _ck(_v, 18, 0, currVal_7); var currVal_9 = !_co.currentUser.hasPermission("projects.publish"); var currVal_10 = "accent"; _ck(_v, 20, 0, currVal_9, currVal_10); var currVal_11 = "Publish"; _ck(_v, 21, 0, currVal_11); var currVal_12 = "publish"; _ck(_v, 23, 0, currVal_12); var currVal_14 = "accent"; _ck(_v, 25, 0, currVal_14); var currVal_15 = "Delete"; _ck(_v, 26, 0, currVal_15); var currVal_16 = "delete"; _ck(_v, 28, 0, currVal_16); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.getProjectUrl(_v.context.$implicit); _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.getProjectImage(_v.context.$implicit); _ck(_v, 5, 0, currVal_1); var currVal_2 = _v.context.$implicit.name; _ck(_v, 9, 0, currVal_2); var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 11, 0, _ck(_v, 12, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v.parent, 0), _v.context.$implicit.created_at)); _ck(_v, 11, 0, currVal_3); var currVal_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15).disabled || null); _ck(_v, 14, 0, currVal_4); var currVal_8 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).disabled || null); _ck(_v, 19, 0, currVal_8); var currVal_13 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).disabled || null); _ck(_v, 24, 0, currVal_13); }); }
function View_DashboardComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 10, "no-results-message", [], null, null, null, __WEBPACK_IMPORTED_MODULE_17__node_modules_vebto_client_core_ui_no_results_message_no_results_message_component_ngfactory__["b" /* View_NoResultsMessageComponent_0 */], __WEBPACK_IMPORTED_MODULE_17__node_modules_vebto_client_core_ui_no_results_message_no_results_message_component_ngfactory__["a" /* RenderType_NoResultsMessageComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_18_vebto_client_core_ui_no_results_message_no_results_message_component__["a" /* NoResultsMessageComponent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, 0, 2, "span", [["primary-text", ""], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["You have not created any projects yet."])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, 1, 5, "span", [["secondary-text", ""], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Nothing to show. "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](8, 0, null, null, 2, "a", [["routerLink", "/dashboard/projects/new"]], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_router__["o" /* RouterLinkWithHref */], [__WEBPACK_IMPORTED_MODULE_6__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_7__angular_common__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Create a project?"]))], function (_ck, _v) { var currVal_2 = "/dashboard/projects/new"; _ck(_v, 9, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).target; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).href; _ck(_v, 8, 0, currVal_0, currVal_1); }); }
function View_DashboardComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](0, __WEBPACK_IMPORTED_MODULE_19_vebto_client_core_ui_formatted_date_pipe__["a" /* FormattedDatePipe */], [__WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 81, "div", [["class", "header"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 1, "material-navbar", [["menuPosition", "dashboard"]], null, null, null, __WEBPACK_IMPORTED_MODULE_20__node_modules_vebto_client_core_ui_material_navbar_material_navbar_component_ngfactory__["b" /* View_MaterialNavbar_0 */], __WEBPACK_IMPORTED_MODULE_20__node_modules_vebto_client_core_ui_material_navbar_material_navbar_component_ngfactory__["a" /* RenderType_MaterialNavbar */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_21_vebto_client_core_ui_material_navbar_material_navbar_component__["a" /* MaterialNavbar */], [__WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_22_vebto_client_core_vebto_config_service__["a" /* VebtoConfig */]], { menuPosition: [0, "menuPosition"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 78, "div", [["class", "header-body container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 69, "form", [["class", "inputs"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 7).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 7).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["z" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["j" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["j" /* FormGroupDirective */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["p" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](10, 0, null, null, 9, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, null, 2, "label", [["for", "search-query"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](12, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Search"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 5, "input", [["formControlName", "query"], ["id", "search-query"], ["type", "search"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](15, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](17, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["h" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["h" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](19, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](20, 0, null, null, 24, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](21, 0, null, null, 2, "label", [["for", "project-status"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](22, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Status"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](24, 0, null, null, 20, "select", [["formControlName", "published"], ["id", "project-status"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "change"], [null, "blur"]], function (_v, en, $event) { var ad = true; if (("change" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).onChange($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).onTouched() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](25, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](27, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["h" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["h" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](29, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](30, 0, null, null, 4, "option", [["trans", ""], ["value", "all"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](31, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["s" /* NgSelectOption */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](32, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["B" /* ɵq */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [8, null]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](33, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["All"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](35, 0, null, null, 4, "option", [["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](36, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["s" /* NgSelectOption */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](37, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["B" /* ɵq */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [8, null]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](38, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Published"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](40, 0, null, null, 4, "option", [["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](41, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["s" /* NgSelectOption */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](42, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["B" /* ɵq */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [8, null]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](43, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Unpublished"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](45, 0, null, null, 29, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](46, 0, null, null, 2, "label", [["for", "project-order"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](47, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Sort"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](49, 0, null, null, 25, "select", [["formControlName", "order"], ["id", "project-order"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "change"], [null, "blur"]], function (_v, en, $event) { var ad = true; if (("change" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).onChange($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).onTouched() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](50, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](52, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["h" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["h" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](54, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_23__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](55, 0, null, null, 4, "option", [["trans", ""], ["value", "created_at|desc"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](56, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["s" /* NgSelectOption */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](57, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["B" /* ɵq */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [8, null]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](58, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Newest"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](60, 0, null, null, 4, "option", [["trans", ""], ["value", "created_at|asc"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](61, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["s" /* NgSelectOption */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](62, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["B" /* ɵq */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [8, null]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](63, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Oldest"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](65, 0, null, null, 4, "option", [["trans", ""], ["value", "name|desc"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](66, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["s" /* NgSelectOption */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](67, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["B" /* ɵq */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [8, null]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](68, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["A-Z"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](70, 0, null, null, 4, "option", [["trans", ""], ["value", "name|asc"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](71, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["s" /* NgSelectOption */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [2, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["v" /* SelectControlValueAccessor */]]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](72, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_23__angular_forms__["B" /* ɵq */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], [8, null]], { value: [0, "value"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](73, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Z-A"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](75, 0, null, null, 7, "div", [["class", "actions"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_DashboardComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](77, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](78, 0, null, null, 4, "a", [["class", "new-project-button"], ["color", "accent"], ["mat-raised-button", ""], ["routerLink", "/dashboard/projects/new"], ["trans", ""]], [[1, "tabindex", 0], [1, "disabled", 0], [1, "aria-disabled", 0], [1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79)._haltDisabledEvents($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 81).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["c" /* View_MatAnchor_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatAnchor */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](79, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["a" /* MatAnchor */], [__WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](80, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_11_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](81, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_router__["o" /* RouterLinkWithHref */], [__WEBPACK_IMPORTED_MODULE_6__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_7__angular_common__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["New Project"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](83, 0, null, null, 9, "div", [["class", "scroll-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](84, 0, null, null, 1, "ad-host", [["class", "ad-host-top"]], [[8, "id", 0]], null, null, __WEBPACK_IMPORTED_MODULE_24__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__["b" /* View_AdHostComponent_0 */], __WEBPACK_IMPORTED_MODULE_24__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__["a" /* RenderType_AdHostComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](85, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_25_vebto_client_core_ui_ad_host_ad_host_component__["a" /* AdHostComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_26_vebto_client_core_services_utils__["a" /* utils */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], { slot: [0, "slot"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](86, 0, null, null, 2, "div", [["class", "projects container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_DashboardComponent_4)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](88, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["NgForOf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_DashboardComponent_5)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](90, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](91, 0, null, null, 1, "ad-host", [["class", "ad-host-bottom"]], [[8, "id", 0]], null, null, __WEBPACK_IMPORTED_MODULE_24__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__["b" /* View_AdHostComponent_0 */], __WEBPACK_IMPORTED_MODULE_24__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__["a" /* RenderType_AdHostComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](92, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_25_vebto_client_core_ui_ad_host_ad_host_component__["a" /* AdHostComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_26_vebto_client_core_services_utils__["a" /* utils */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */]], { slot: [0, "slot"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "dashboard"; _ck(_v, 3, 0, currVal_0); var currVal_8 = _co.models; _ck(_v, 7, 0, currVal_8); var currVal_16 = "query"; _ck(_v, 17, 0, currVal_16); var currVal_24 = "published"; _ck(_v, 27, 0, currVal_24); var currVal_25 = "all"; _ck(_v, 31, 0, currVal_25); var currVal_26 = "all"; _ck(_v, 32, 0, currVal_26); var currVal_27 = 1; _ck(_v, 36, 0, currVal_27); var currVal_28 = 1; _ck(_v, 37, 0, currVal_28); var currVal_29 = 0; _ck(_v, 41, 0, currVal_29); var currVal_30 = 0; _ck(_v, 42, 0, currVal_30); var currVal_38 = "order"; _ck(_v, 52, 0, currVal_38); var currVal_39 = "created_at|desc"; _ck(_v, 56, 0, currVal_39); var currVal_40 = "created_at|desc"; _ck(_v, 57, 0, currVal_40); var currVal_41 = "created_at|asc"; _ck(_v, 61, 0, currVal_41); var currVal_42 = "created_at|asc"; _ck(_v, 62, 0, currVal_42); var currVal_43 = "name|desc"; _ck(_v, 66, 0, currVal_43); var currVal_44 = "name|desc"; _ck(_v, 67, 0, currVal_44); var currVal_45 = "name|asc"; _ck(_v, 71, 0, currVal_45); var currVal_46 = "name|asc"; _ck(_v, 72, 0, currVal_46); var currVal_47 = _co.settings.get("billing.enable"); _ck(_v, 77, 0, currVal_47); var currVal_53 = "accent"; _ck(_v, 79, 0, currVal_53); var currVal_54 = "/dashboard/projects/new"; _ck(_v, 81, 0, currVal_54); var currVal_56 = _co.siteConfig.get().admin.ads[0].slot; _ck(_v, 85, 0, currVal_56); var currVal_57 = _co.projects; _ck(_v, 88, 0, currVal_57); var currVal_58 = !_co.projects.length; _ck(_v, 90, 0, currVal_58); var currVal_60 = _co.siteConfig.get().admin.ads[1].slot; _ck(_v, 92, 0, currVal_60); }, function (_ck, _v) { var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassUntouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassTouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassPristine; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassDirty; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassValid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassInvalid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassPending; _ck(_v, 5, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19).ngClassUntouched; var currVal_10 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19).ngClassTouched; var currVal_11 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19).ngClassPristine; var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19).ngClassDirty; var currVal_13 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19).ngClassValid; var currVal_14 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19).ngClassInvalid; var currVal_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19).ngClassPending; _ck(_v, 14, 0, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_17 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassUntouched; var currVal_18 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassTouched; var currVal_19 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassPristine; var currVal_20 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassDirty; var currVal_21 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassValid; var currVal_22 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassInvalid; var currVal_23 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassPending; _ck(_v, 24, 0, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23); var currVal_31 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54).ngClassUntouched; var currVal_32 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54).ngClassTouched; var currVal_33 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54).ngClassPristine; var currVal_34 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54).ngClassDirty; var currVal_35 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54).ngClassValid; var currVal_36 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54).ngClassInvalid; var currVal_37 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54).ngClassPending; _ck(_v, 49, 0, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37); var currVal_48 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79).disabled ? (0 - 1) : 0); var currVal_49 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79).disabled || null); var currVal_50 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79).disabled.toString(); var currVal_51 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 81).target; var currVal_52 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 81).href; _ck(_v, 78, 0, currVal_48, currVal_49, currVal_50, currVal_51, currVal_52); var currVal_55 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 85).randomId; _ck(_v, 84, 0, currVal_55); var currVal_59 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92).randomId; _ck(_v, 91, 0, currVal_59); }); }
function View_DashboardComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "dashboard", [], null, null, null, View_DashboardComponent_0, RenderType_DashboardComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_27_vebto_client_admin_pagination_url_aware_paginator_service__["a" /* UrlAwarePaginator */], __WEBPACK_IMPORTED_MODULE_27_vebto_client_admin_pagination_url_aware_paginator_service__["a" /* UrlAwarePaginator */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injector"]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_28__dashboard_component__["a" /* DashboardComponent */], [__WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_6__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_10_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_29_vebto_client_auth_current_user__["a" /* CurrentUser */], __WEBPACK_IMPORTED_MODULE_30__shared_projects_projects_service__["a" /* Projects */], __WEBPACK_IMPORTED_MODULE_31_vebto_client_core_ui_toast_service__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_32_vebto_client_core_ui_modal_service__["a" /* Modal */], __WEBPACK_IMPORTED_MODULE_33__shared_projects_project_url_service__["a" /* ProjectUrl */], __WEBPACK_IMPORTED_MODULE_22_vebto_client_core_vebto_config_service__["a" /* VebtoConfig */], __WEBPACK_IMPORTED_MODULE_27_vebto_client_admin_pagination_url_aware_paginator_service__["a" /* UrlAwarePaginator */]], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var DashboardComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("dashboard", __WEBPACK_IMPORTED_MODULE_28__dashboard_component__["a" /* DashboardComponent */], View_DashboardComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.scss.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n\n\n\ndashboard {\n  display: block;\n  height: 100%;\n  background-color: #FAFAFA; }\ndashboard > .header {\n    background-color: #1565c0;\n    color: #fff; }\ndashboard .header-body {\n    padding-top: 50px;\n    padding-bottom: 50px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\ndashboard .header-body > .inputs {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\ndashboard .header-body > .inputs > .input-container {\n        margin-right: 20px; }\ndashboard .header-body > .inputs > .input-container > input, dashboard .header-body > .inputs > .input-container > select {\n          background-color: #fff;\n          color: rgba(0, 0, 0, 0.87);\n          border-radius: 2px; }\ndashboard .header-body > .actions {\n      margin-left: auto; }\ndashboard .header-body > .actions > .upgrade-button {\n        margin-right: 20px; }\n@media only screen and (max-width: 768px) {\n      dashboard .header-body {\n        padding: 25px 0; }\n        dashboard .header-body > .inputs {\n          display: none; }\n        dashboard .header-body > .new-project-button {\n          width: 100%;\n          line-height: 45px;\n          margin: 0 20px; } }\ndashboard .scroll-container {\n    height: calc(100% - 233px); }\ndashboard .ad-host-top {\n    margin-top: 35px; }\ndashboard .ad-host-bottom {\n    margin-bottom: 35px; }\ndashboard .projects {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 1fr;\n        grid-template-columns: 1fr;\n    grid-auto-rows: -webkit-min-content;\n    grid-auto-rows: min-content;\n    grid-column-gap: 15px;\n    grid-row-gap: 15px;\n    padding-top: 35px;\n    padding-bottom: 35px; }\n@media only screen and (min-width: 768px) {\n      dashboard .projects {\n        -ms-grid-columns: (1fr)[3];\n            grid-template-columns: repeat(3, 1fr); } }\n@media only screen and (min-width: 1200px) {\n      dashboard .projects {\n        -ms-grid-columns: (1fr)[4];\n            grid-template-columns: repeat(4, 1fr); } }\ndashboard .projects > .project {\n      height: 266px;\n      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);\n              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);\n      cursor: pointer;\n      overflow: hidden;\n      background-color: #fff;\n      -webkit-transition: -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); }\ndashboard .projects > .project:hover {\n        -webkit-box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);\n                box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12); }\ndashboard .projects > .project > .header {\n        padding: 10px; }\ndashboard .projects > .project > .header > a:hover {\n          text-decoration: underline; }\ndashboard .projects > .project > img {\n        display: block;\n        width: 100%;\n        height: 165px;\n        -o-object-fit: cover;\n           object-fit: cover; }\ndashboard .projects > .project > .footer {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        padding: 10px;\n        border-top: 1px solid #eff1f2; }\ndashboard .projects > .project > .footer .name {\n          font-size: 1.6rem;\n          font-weight: bold;\n          margin-bottom: 2px; }\ndashboard .projects > .project > .footer .updated {\n          font-size: 1rem;\n          color: rgba(0, 0, 0, 0.54); }\ndashboard .projects > .project > .footer .actions {\n          margin-left: auto; }\n"];



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vebto_client_auth_current_user__ = __webpack_require__("./node_modules/vebto-client/auth/current-user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vebto_client_core_ui_toast_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/toast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_ui_modal_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/modal.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vebto_client_core_ui_confirm_modal_confirm_modal_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/confirm-modal/confirm-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_vebto_config_service__ = __webpack_require__("./node_modules/vebto-client/core/vebto-config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vebto_client_admin_pagination_url_aware_paginator_service__ = __webpack_require__("./node_modules/vebto-client/admin/pagination/url-aware-paginator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_operators_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_projects_projects_service__ = __webpack_require__("./src/app/shared/projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_projects_project_url_service__ = __webpack_require__("./src/app/shared/projects/project-url.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_projects_publish_project_modal_publish_project_modal_component__ = __webpack_require__("./src/app/shared/projects/publish-project-modal/publish-project-modal.component.ts");














var DashboardComponent = /** @class */ (function () {
    /**
     * DashboardComponent Constructor.
     */
    function DashboardComponent(route, router, settings, currentUser, projectsApi, toast, modal, projectUrl, siteConfig, paginator) {
        this.route = route;
        this.router = router;
        this.settings = settings;
        this.currentUser = currentUser;
        this.projectsApi = projectsApi;
        this.toast = toast;
        this.modal = modal;
        this.projectUrl = projectUrl;
        this.siteConfig = siteConfig;
        this.paginator = paginator;
        this.projects = [];
        this.models = new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["i" /* FormGroup */]({
            query: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* FormControl */](''),
            order: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* FormControl */]('created_at|desc'),
            published: new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* FormControl */]('all')
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.projects = data.projects.data;
        });
        this.bindToProjectFilters();
    };
    /**
     * Open specified project in the builder.
     */
    DashboardComponent.prototype.openBuilder = function (project) {
        this.router.navigate(['/builder', project.id]);
    };
    /**
     * Get absolute url for specified project's thumbnail image.
     */
    DashboardComponent.prototype.getProjectImage = function (project) {
        return this.projectUrl.getBaseUrl(project.uuid) + 'thumbnail.png';
    };
    /**
     * Get absolute url for specified project site.
     */
    DashboardComponent.prototype.getProjectUrl = function (project) {
        return this.projectUrl.getSiteUrl(project);
    };
    /**
     * Open modal for publish specified project.
     */
    DashboardComponent.prototype.openPublishProjectModal = function (project) {
        var _this = this;
        this.modal.open(__WEBPACK_IMPORTED_MODULE_13__shared_projects_publish_project_modal_publish_project_modal_component__["a" /* PublishProjectModalComponent */], { project: project }).afterClosed().subscribe(function (project) {
            if (!project)
                return;
            var i = _this.projects.findIndex(function (curr) { return curr.id === project.model.id; });
            _this.projects[i] = project.model;
        });
    };
    /**
     * Delete specified project, if user confirms it.
     */
    DashboardComponent.prototype.deleteProjectWithConfirmation = function (project) {
        var _this = this;
        this.modal.open(__WEBPACK_IMPORTED_MODULE_5_vebto_client_core_ui_confirm_modal_confirm_modal_component__["a" /* ConfirmModalComponent */], {
            title: 'Delete Project',
            body: 'Are you sure you want to delete this project?',
            ok: 'Delete',
        }).afterClosed().subscribe(function (confirmed) {
            if (!confirmed)
                return;
            _this.projectsApi.delete({ ids: [project.id] }).subscribe(function () {
                _this.toast.open('Project deleted');
                _this.projects.splice(_this.projects.indexOf(project), 1);
            });
        });
    };
    /**
     * Bind to page header filters and refresh projects on change.
     */
    DashboardComponent.prototype.bindToProjectFilters = function () {
        var _this = this;
        this.models.valueChanges.pipe(Object(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators_debounceTime__["a" /* debounceTime */])(250), Object(__WEBPACK_IMPORTED_MODULE_10_rxjs_operators_distinctUntilChanged__["a" /* distinctUntilChanged */])())
            .subscribe(function (params) {
            var merged = Object.assign({ user_id: _this.currentUser.get('id'), per_page: 20 }, params);
            _this.paginator.paginate('projects', merged).subscribe(function (response) {
                _this.projects = response.data;
            });
        });
    };
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardModule; });
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/dashboard/new-project-page/new-project-modal/new-project-modal.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_NewProjectModalComponent */
/* unused harmony export View_NewProjectModalComponent_0 */
/* unused harmony export View_NewProjectModalComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProjectModalComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__new_project_modal_component_scss_ngstyle__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-modal/new-project-modal.component.scss.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_progress_bar_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/progress-bar/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_progress_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translate_directive__ = __webpack_require__("./node_modules/vebto-client/translations/translate.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vebto_client_translations_translations_service__ = __webpack_require__("./node_modules/vebto-client/translations/translations.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/svg-icon/svg-icon.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/svg-icon/svg-icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__new_project_modal_component__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-modal/new-project-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_projects_projects_service__ = __webpack_require__("./src/app/shared/projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__shared_templates_templates_service__ = __webpack_require__("./src/app/shared/templates/templates.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__shared_projects_project_url_service__ = __webpack_require__("./src/app/shared/projects/project-url.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




















var styles_NewProjectModalComponent = [__WEBPACK_IMPORTED_MODULE_0__new_project_modal_component_scss_ngstyle__["a" /* styles */]];
var RenderType_NewProjectModalComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 2, styles: styles_NewProjectModalComponent, data: {} });

function View_NewProjectModalComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "mat-progress-bar", [["aria-valuemax", "100"], ["aria-valuemin", "0"], ["class", "mat-progress-bar"], ["color", "accent"], ["mode", "indeterminate"], ["role", "progressbar"]], [[1, "aria-valuenow", 0], [1, "mode", 0]], null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_progress_bar_typings_index_ngfactory__["b" /* View_MatProgressBar_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_progress_bar_typings_index_ngfactory__["a" /* RenderType_MatProgressBar */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_progress_bar__["a" /* MatProgressBar */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], { color: [0, "color"], mode: [1, "mode"] }, null)], function (_ck, _v) { var currVal_2 = "accent"; var currVal_3 = "indeterminate"; _ck(_v, 1, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).value; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).mode; _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_NewProjectModalComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "p", [["class", "error"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.errors.name; _ck(_v, 1, 0, currVal_0); }); }
function View_NewProjectModalComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "div", [["class", "modal-header"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 3, "h2", [["class", "modal-title mat-dialog-title"], ["mat-dialog-title", ""], ["trans", ""]], [[8, "id", 0]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 81920, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_dialog__["k" /* MatDialogTitle */], [[2, __WEBPACK_IMPORTED_MODULE_4__angular_material_dialog__["j" /* MatDialogRef */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_material_dialog__["e" /* MatDialog */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_6_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["New Project"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 2, "button", [["class", "close-button no-style icon-button"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.close() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 1, "svg-icon", [["name", "close"]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["b" /* View_SvgIconComponent_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["a" /* RenderType_SvgIconComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__["a" /* SvgIconComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_services_settings_service__["a" /* Settings */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](8, 0, null, null, 31, "form", [["ngNativeValidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.confirm() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["q" /* NgForm */], [[8, null], [8, null]], null, { ngSubmit: "ngSubmit" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["q" /* NgForm */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["p" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 17, "div", [["class", "mat-dialog-content many-inputs mat-dialog-content"], ["mat-dialog-content", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](13, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_dialog__["h" /* MatDialogContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 15, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](15, 0, null, null, 2, "label", [["for", "project-name"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](16, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_6_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Name"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](18, 0, null, null, 7, "input", [["id", "project-name"], ["name", "project-name"], ["required", ""], ["type", "text"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 19)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.newProject.name = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](19, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](20, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */], [], { required: [0, "required"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */]], [8, null], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](25, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_NewProjectModalComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](27, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_11__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_NewProjectModalComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](29, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_11__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](30, 0, null, null, 9, "div", [["class", "buttons right mat-dialog-actions mat-dialog-actions"], ["mat-dialog-actions", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](31, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_dialog__["f" /* MatDialogActions */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](32, 0, null, null, 3, "button", [["class", "button cancel cancel-button"], ["mat-button", ""], ["trans", ""], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.close() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["d" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["b" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](33, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_15__angular_cdk_a11y__["j" /* FocusMonitor */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](34, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_6_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Cancel"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](36, 0, null, null, 3, "button", [["class", "button primary submit-button"], ["color", "accent"], ["mat-raised-button", ""], ["trans", ""], ["type", "submit"]], [[8, "disabled", 0]], null, null, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["d" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["b" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](37, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_15__angular_cdk_a11y__["j" /* FocusMonitor */]], { disabled: [0, "disabled"], color: [1, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](38, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_6_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Create"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 2, 0); var currVal_1 = "close"; _ck(_v, 7, 0, currVal_1); var currVal_17 = ""; _ck(_v, 20, 0, currVal_17); var currVal_18 = "project-name"; var currVal_19 = _co.newProject.name; _ck(_v, 23, 0, currVal_18, currVal_19); var currVal_20 = _co.loading; _ck(_v, 27, 0, currVal_20); var currVal_21 = _co.errors.name; _ck(_v, 29, 0, currVal_21); var currVal_24 = _co.loading; var currVal_25 = "accent"; _ck(_v, 37, 0, currVal_24, currVal_25); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).id; _ck(_v, 1, 0, currVal_0); var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassUntouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassTouched; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassPristine; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassDirty; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassValid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassInvalid; var currVal_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassPending; _ck(_v, 8, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_9 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).required ? "" : null); var currVal_10 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).ngClassUntouched; var currVal_11 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).ngClassTouched; var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).ngClassPristine; var currVal_13 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).ngClassDirty; var currVal_14 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).ngClassValid; var currVal_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).ngClassInvalid; var currVal_16 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).ngClassPending; _ck(_v, 18, 0, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16); var currVal_22 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33).disabled || null); _ck(_v, 32, 0, currVal_22); var currVal_23 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 37).disabled || null); _ck(_v, 36, 0, currVal_23); }); }
function View_NewProjectModalComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "new-project-modal", [], null, null, null, View_NewProjectModalComponent_0, RenderType_NewProjectModalComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_16__new_project_modal_component__["a" /* NewProjectModalComponent */], [__WEBPACK_IMPORTED_MODULE_4__angular_material_dialog__["j" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_4__angular_material_dialog__["a" /* MAT_DIALOG_DATA */], __WEBPACK_IMPORTED_MODULE_17__shared_projects_projects_service__["a" /* Projects */], __WEBPACK_IMPORTED_MODULE_18__shared_templates_templates_service__["a" /* Templates */], __WEBPACK_IMPORTED_MODULE_19__shared_projects_project_url_service__["a" /* ProjectUrl */]], null, null)], null, null); }
var NewProjectModalComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("new-project-modal", __WEBPACK_IMPORTED_MODULE_16__new_project_modal_component__["a" /* NewProjectModalComponent */], View_NewProjectModalComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/dashboard/new-project-page/new-project-modal/new-project-modal.component.scss.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/dashboard/new-project-page/new-project-modal/new-project-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProjectModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_services_utils__ = __webpack_require__("./node_modules/vebto-client/core/services/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_projects_projects_service__ = __webpack_require__("./src/app/shared/projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_projects_project_url_service__ = __webpack_require__("./src/app/shared/projects/project-url.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_page_document__ = __webpack_require__("./src/app/shared/page-document.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_templates_templates_service__ = __webpack_require__("./src/app/shared/templates/templates.service.ts");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var NewProjectModalComponent = /** @class */ (function () {
    /**
     * NewProjectModalComponent Constructor.
     */
    function NewProjectModalComponent(dialogRef, data, projects, templates, projectUrl) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.projects = projects;
        this.templates = templates;
        this.projectUrl = projectUrl;
        /**
         * New project model.
         */
        this.newProject = {};
        /**
         * Errors from backend.
         */
        this.errors = {};
        this.pageDocument = new __WEBPACK_IMPORTED_MODULE_4__shared_page_document__["a" /* PageDocument */]();
        /**
         * Whether backend request is currently in progress.
         */
        this.loading = false;
        this.newProject.uuid = __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_services_utils__["a" /* utils */].randomString(36);
        this.pageDocument.setBaseUrl(this.projectUrl.getBaseUrl(this.newProject.uuid));
    }
    /**
     * Create a new project.
     */
    NewProjectModalComponent.prototype.confirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        if (!this.data.templateName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createProjectFromTemplate()];
                    case 1:
                        params = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        params = this.createBlankProject();
                        _a.label = 3;
                    case 3:
                        this.projects.create(params).subscribe(function (response) {
                            _this.loading = false;
                            _this.dialogRef.close(response.project);
                        }, function (response) {
                            _this.loading = false;
                            _this.errors = response.messages;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Close the modal.
     */
    NewProjectModalComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    /**
     * Get payload for new project created from a template.
     */
    NewProjectModalComponent.prototype.createProjectFromTemplate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var params = _this.getBasePayload();
            _this.templates.get(_this.data.templateName).subscribe(function (response) {
                params.template = response.template;
                params.pages = _this.transformTemplatePages(response.template);
                resolve(params);
            });
        });
    };
    /**
     * Get payload for new project without a template.
     */
    NewProjectModalComponent.prototype.createBlankProject = function () {
        var params = this.getBasePayload();
        params.pages.push({
            name: 'index',
            html: this.pageDocument.generate().getOuterHtml()
        });
        return params;
    };
    /**
     * Transform template pages into project pages.
     */
    NewProjectModalComponent.prototype.transformTemplatePages = function (template) {
        var _this = this;
        return template.pages.map(function (page) {
            return {
                name: page.name,
                html: _this.pageDocument.generate(page.html, template).getOuterHtml(),
            };
        });
    };
    /**
     * Get base payload for creating new project.
     */
    NewProjectModalComponent.prototype.getBasePayload = function () {
        return {
            name: this.newProject.name,
            uuid: this.newProject.uuid,
            pages: [],
            template: null,
        };
    };
    return NewProjectModalComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/new-project-page/new-project-page.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_NewProjectPageComponent */
/* unused harmony export View_NewProjectPageComponent_0 */
/* unused harmony export View_NewProjectPageComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProjectPageComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__new_project_page_component_scss_ngstyle__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-page.component.scss.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vebto_client_core_ui_material_navbar_material_navbar_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/material-navbar/material-navbar.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vebto_client_core_ui_material_navbar_material_navbar_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/material-navbar/material-navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vebto_client_core_vebto_config_service__ = __webpack_require__("./node_modules/vebto-client/core/vebto-config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/ad-host/ad-host.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_ui_ad_host_ad_host_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/ad-host/ad-host.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vebto_client_core_services_utils__ = __webpack_require__("./node_modules/vebto-client/core/services/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_vebto_client_translations_translate_directive__ = __webpack_require__("./node_modules/vebto-client/translations/translate.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_vebto_client_translations_translations_service__ = __webpack_require__("./node_modules/vebto-client/translations/translations.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/list/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_material_list__ = __webpack_require__("./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__new_project_page_component__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_vebto_client_core_ui_modal_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/modal.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





















var styles_NewProjectPageComponent = [__WEBPACK_IMPORTED_MODULE_0__new_project_page_component_scss_ngstyle__["a" /* styles */]];
var RenderType_NewProjectPageComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 2, styles: styles_NewProjectPageComponent, data: {} });

function View_NewProjectPageComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 0, "div", [["class", "color"]], [[2, "active", null], [4, "background", null], [8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.filterByColor(_v.context.$implicit.name) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.selectedColor === _v.context.$implicit.name); var currVal_1 = _v.context.$implicit.color; var currVal_2 = _v.context.$implicit.name; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_NewProjectPageComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 3, "figure", [["class", "template grid-item"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openNewProjectModal(_v.context.$implicit.name) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 0, "img", [], [[8, "src", 4]], null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 1, "figcaption", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](3, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.getTemplateThumbnail(_v.context.$implicit); _ck(_v, 1, 0, currVal_0); var currVal_1 = _v.context.$implicit.name; _ck(_v, 3, 0, currVal_1); }); }
function View_NewProjectPageComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "material-navbar", [["menuPosition", "dashboard"]], null, null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_vebto_client_core_ui_material_navbar_material_navbar_component_ngfactory__["b" /* View_MaterialNavbar_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_vebto_client_core_ui_material_navbar_material_navbar_component_ngfactory__["a" /* RenderType_MaterialNavbar */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_3_vebto_client_core_ui_material_navbar_material_navbar_component__["a" /* MaterialNavbar */], [__WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_5_vebto_client_core_vebto_config_service__["a" /* VebtoConfig */]], { menuPosition: [0, "menuPosition"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 54, "div", [["class", "content scroll-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, null, 1, "ad-host", [["class", "ad-host-top"]], [[8, "id", 0]], null, null, __WEBPACK_IMPORTED_MODULE_6__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__["b" /* View_AdHostComponent_0 */], __WEBPACK_IMPORTED_MODULE_6__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__["a" /* RenderType_AdHostComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_ui_ad_host_ad_host_component__["a" /* AdHostComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_8_vebto_client_core_services_utils__["a" /* utils */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], { slot: [0, "slot"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 49, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 44, "aside", [["class", "sidebar"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 3, "button", [["class", "blank-page-button"], ["color", "accent"], ["mat-raised-button", ""], ["trans", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openNewProjectModal() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_button_typings_index_ngfactory__["d" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_button_typings_index_ngfactory__["b" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](8, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_12__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_13_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Start with Blank Page"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, null, 9, "div", [["class", "panel"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 2, "div", [["class", "panel-header"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](13, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_13_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Colors"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](15, 0, null, null, 5, "div", [["class", "panel-body colors"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](16, 0, null, null, 2, "div", [["class", "color empty-color"], ["title", "none"]], [[2, "active", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.filterByColor(null) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](17, 0, null, null, 1, ":svg:svg", [["style", "width: 32px; height: 32px;"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](18, 0, null, null, 0, ":svg:line", [["style", "stroke:rgb(255,0,0);stroke-width:1"], ["x1", "0"], ["x2", "26"], ["y1", "26"], ["y2", "0"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_NewProjectPageComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](20, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgForOf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](21, 0, null, null, 29, "div", [["class", "panel"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, null, 2, "div", [["class", "panel-header"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_13_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Categories"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](25, 0, null, null, 25, "mat-list", [["class", "panel-body categories mat-list"]], null, null, null, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["g" /* View_MatList_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["a" /* RenderType_MatList */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](26, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["a" /* MatList */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](27, 0, null, 0, 5, "mat-list-item", [["class", "category mat-list-item"], ["trans", ""]], [[2, "active", null]], [[null, "click"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("focus" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28)._handleFocus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28)._handleBlur() !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (_co.filterByCategory(null) !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["e" /* View_MatListItem_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["b" /* RenderType_MatListItem */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](28, 1097728, null, 2, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["c" /* MatListItem */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["f" /* MatNavList */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 1, { _lines: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { _hasAvatar: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](31, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_13_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["All Categories"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](33, 0, null, 0, 5, "mat-list-item", [["class", "category mat-list-item"], ["trans", ""]], [[2, "active", null]], [[null, "click"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("focus" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 34)._handleFocus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 34)._handleBlur() !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (_co.filterByCategory("landing page") !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["e" /* View_MatListItem_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["b" /* RenderType_MatListItem */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](34, 1097728, null, 2, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["c" /* MatListItem */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["f" /* MatNavList */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 3, { _lines: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 4, { _hasAvatar: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](37, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_13_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["Landing Page"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](39, 0, null, 0, 5, "mat-list-item", [["class", "category mat-list-item"], ["trans", ""]], [[2, "active", null]], [[null, "click"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("focus" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 40)._handleFocus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 40)._handleBlur() !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (_co.filterByCategory("blog") !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["e" /* View_MatListItem_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["b" /* RenderType_MatListItem */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](40, 1097728, null, 2, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["c" /* MatListItem */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["f" /* MatNavList */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 5, { _lines: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 6, { _hasAvatar: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](43, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_13_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["Blog"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](45, 0, null, 0, 5, "mat-list-item", [["class", "category mat-list-item"], ["trans", ""]], [[2, "active", null]], [[null, "click"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("focus" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46)._handleFocus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46)._handleBlur() !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (_co.filterByCategory("portfolio") !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["e" /* View_MatListItem_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_list_typings_index_ngfactory__["b" /* RenderType_MatListItem */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](46, 1097728, null, 2, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["c" /* MatListItem */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_17__angular_material_list__["f" /* MatNavList */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 7, { _lines: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 8, { _hasAvatar: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](49, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_13_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_14_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["Portfolio"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](51, 0, null, null, 3, "div", [["class", "templates"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](52, 0, null, null, 2, "div", [["class", "grid-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_NewProjectPageComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](54, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgForOf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](55, 0, null, null, 1, "ad-host", [["class", "ad-host-bottom"]], [[8, "id", 0]], null, null, __WEBPACK_IMPORTED_MODULE_6__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__["b" /* View_AdHostComponent_0 */], __WEBPACK_IMPORTED_MODULE_6__node_modules_vebto_client_core_ui_ad_host_ad_host_component_ngfactory__["a" /* RenderType_AdHostComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](56, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_7_vebto_client_core_ui_ad_host_ad_host_component__["a" /* AdHostComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_8_vebto_client_core_services_utils__["a" /* utils */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */]], { slot: [0, "slot"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "dashboard"; _ck(_v, 1, 0, currVal_0); var currVal_2 = _co.siteConfig.get().admin.ads[0].slot; _ck(_v, 4, 0, currVal_2); var currVal_4 = "accent"; _ck(_v, 8, 0, currVal_4); var currVal_6 = _co.colors; _ck(_v, 20, 0, currVal_6); var currVal_11 = _co.filteredTemplates; _ck(_v, 54, 0, currVal_11); var currVal_13 = _co.siteConfig.get().admin.ads[1].slot; _ck(_v, 56, 0, currVal_13); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).randomId; _ck(_v, 3, 0, currVal_1); var currVal_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 8).disabled || null); _ck(_v, 7, 0, currVal_3); var currVal_5 = !_co.selectedColor; _ck(_v, 16, 0, currVal_5); var currVal_7 = !_co.selectedCategory; _ck(_v, 27, 0, currVal_7); var currVal_8 = (_co.selectedCategory === "landing page"); _ck(_v, 33, 0, currVal_8); var currVal_9 = (_co.selectedCategory === "blog"); _ck(_v, 39, 0, currVal_9); var currVal_10 = (_co.selectedCategory === "portfolio"); _ck(_v, 45, 0, currVal_10); var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 56).randomId; _ck(_v, 55, 0, currVal_12); }); }
function View_NewProjectPageComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "new-project-page", [], null, null, null, View_NewProjectPageComponent_0, RenderType_NewProjectPageComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_18__new_project_page_component__["a" /* NewProjectPageComponent */], [__WEBPACK_IMPORTED_MODULE_19__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_4_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_20_vebto_client_core_ui_modal_service__["a" /* Modal */], __WEBPACK_IMPORTED_MODULE_19__angular_router__["m" /* Router */], __WEBPACK_IMPORTED_MODULE_5_vebto_client_core_vebto_config_service__["a" /* VebtoConfig */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var NewProjectPageComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("new-project-page", __WEBPACK_IMPORTED_MODULE_18__new_project_page_component__["a" /* NewProjectPageComponent */], View_NewProjectPageComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/dashboard/new-project-page/new-project-page.component.scss.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n\n\n\nnew-project-page {\n  display: block;\n  height: 100%;\n  background-color: #FAFAFA; }\nnew-project-page .content {\n    height: calc(100% - 70px);\n    overflow: auto; }\nnew-project-page .content > .container {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      margin-top: 60px; }\n@media only screen and (max-width: 768px) {\n        new-project-page .content > .container {\n          display: block; } }\nnew-project-page .content .ad-host-top {\n      margin-top: 60px; }\nnew-project-page .content .ad-host-bottom {\n      margin-bottom: 60px; }\nnew-project-page .sidebar {\n    width: 260px;\n    height: 100%;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 260px;\n            flex: 0 0 260px;\n    margin-right: 35px; }\nnew-project-page .sidebar > .blank-page-button {\n      width: 100%;\n      line-height: 46px; }\nnew-project-page .sidebar > .panel {\n      background-color: #fff;\n      -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);\n              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);\n      margin-top: 15px; }\nnew-project-page .sidebar > .panel .panel-header {\n        padding: 15px;\n        border-bottom: 1px solid #E0E0E0;\n        font-weight: 500; }\nnew-project-page .sidebar .colors {\n      padding: 5px 5px 0; }\nnew-project-page .sidebar .colors > .color {\n        display: inline-block;\n        width: 33px;\n        height: 33px;\n        margin: 6px;\n        border: 3px solid transparent;\n        cursor: pointer;\n        position: relative; }\nnew-project-page .sidebar .colors > .color > svg {\n          position: absolute;\n          top: 0;\n          left: 0; }\nnew-project-page .sidebar .colors > .color.empty-color {\n          border-color: #E0E0E0; }\nnew-project-page .sidebar .colors > .color.active {\n          border-color: #009688; }\nnew-project-page .sidebar .categories {\n      padding: 0; }\nnew-project-page .sidebar .categories > .category {\n        border-bottom: 1px solid #E0E0E0;\n        cursor: pointer; }\nnew-project-page .sidebar .categories > .category.active {\n          background-color: #009688;\n          color: #fff; }\n@media only screen and (max-width: 768px) {\n      new-project-page .sidebar {\n        height: auto;\n        width: 100%;\n        margin-bottom: 15px; }\n        new-project-page .sidebar > .panel {\n          display: none; } }\nnew-project-page .templates {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto; }\nnew-project-page .templates .grid-container {\n      display: -ms-grid;\n      display: grid;\n      -ms-grid-columns: 1fr;\n          grid-template-columns: 1fr;\n      grid-auto-rows: -webkit-min-content;\n      grid-auto-rows: min-content;\n      grid-column-gap: 15px;\n      grid-row-gap: 15px;\n      padding-bottom: 60px; }\n@media only screen and (min-width: 768px) {\n        new-project-page .templates .grid-container {\n          -ms-grid-columns: (1fr)[3];\n              grid-template-columns: repeat(3, 1fr); } }\nnew-project-page .templates .template {\n      background-color: #fff;\n      -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);\n              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);\n      margin: 0;\n      max-height: 275px;\n      cursor: pointer;\n      -webkit-transition: -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); }\nnew-project-page .templates .template:hover {\n        -webkit-box-shadow: 0 9px 11px -5px rgba(0, 0, 0, 0.2), 0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12);\n                box-shadow: 0 9px 11px -5px rgba(0, 0, 0, 0.2), 0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12); }\nnew-project-page .templates .template > img {\n        width: 100%;\n        height: auto;\n        -o-object-fit: cover;\n           object-fit: cover; }\nnew-project-page .templates .template > figcaption {\n        padding: 10px;\n        text-align: center; }\n"];



/***/ }),

/***/ "./src/app/dashboard/new-project-page/new-project-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProjectPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template_colors__ = __webpack_require__("./src/app/dashboard/new-project-page/template-colors.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vebto_client_core_ui_modal_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/modal.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__new_project_modal_new_project_modal_component__ = __webpack_require__("./src/app/dashboard/new-project-page/new-project-modal/new-project-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vebto_client_core_vebto_config_service__ = __webpack_require__("./node_modules/vebto-client/core/vebto-config.service.ts");






var NewProjectPageComponent = /** @class */ (function () {
    /**
     * NewProjectPageComponent Constructor.
     */
    function NewProjectPageComponent(route, settings, modal, router, siteConfig) {
        this.route = route;
        this.settings = settings;
        this.modal = modal;
        this.router = router;
        this.siteConfig = siteConfig;
        this.colors = __WEBPACK_IMPORTED_MODULE_2__template_colors__["a" /* TemplateColors */];
        /**
         * All available templates.
         */
        this.templates = [];
        /**
         * Template filtered by category and color.
         */
        this.filteredTemplates = [];
    }
    NewProjectPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.templates = data.templates;
            _this.filteredTemplates = data.templates;
        });
    };
    /**
     * Open new project modal with specified template.
     */
    NewProjectPageComponent.prototype.openNewProjectModal = function (templateName) {
        var _this = this;
        this.modal.open(__WEBPACK_IMPORTED_MODULE_4__new_project_modal_new_project_modal_component__["a" /* NewProjectModalComponent */], { templateName: templateName }).afterClosed().subscribe(function (project) {
            if (!project)
                return;
            _this.router.navigate(['/builder', project.model.id]);
        });
    };
    NewProjectPageComponent.prototype.getTemplateThumbnail = function (template) {
        return this.settings.getBaseUrl(true) + 'storage/' + template.thumbnail;
    };
    /**
     * Filter available templates by specified category.
     */
    NewProjectPageComponent.prototype.filterByCategory = function (name) {
        this.selectedCategory = name;
        if (!name)
            return this.filteredTemplates = this.templates.slice();
        this.filteredTemplates = this.templates.filter(function (template) {
            return template.config.category.toLowerCase().indexOf(name.toLowerCase()) > -1;
        });
    };
    /**
     * Filter available templates by specified color.
     */
    NewProjectPageComponent.prototype.filterByColor = function (name) {
        this.selectedColor = name;
        if (!name)
            return this.filteredTemplates = this.templates.slice();
        this.filteredTemplates = this.templates.filter(function (template) {
            return template.config.color.toLowerCase().indexOf(name.toLowerCase()) > -1;
        });
    };
    return NewProjectPageComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/new-project-page/template-colors.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateColors; });
var TemplateColors = [
    { name: 'black', color: 'black' },
    { name: 'blue', color: 'rgb(132, 189, 219)' },
    { name: 'gray', color: 'rgb(238, 238, 238)' },
    { name: 'green', color: 'rgb(24, 187, 155)' },
    { name: 'orange', color: 'rgb(218, 92, 74)' },
    { name: 'red', color: 'red' },
    { name: 'yellow', color: 'rgb(255, 223, 96)' },
    { name: 'white', color: 'rgb(250, 250, 250)' },
    { name: 'purple', color: 'rgb(184, 75, 97)' },
];


/***/ }),

/***/ "./src/app/dashboard/new-project-page/templates-resolver.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatesResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_templates_templates_service__ = __webpack_require__("./src/app/shared/templates/templates.service.ts");


var TemplatesResolver = /** @class */ (function () {
    function TemplatesResolver(router, templates) {
        this.router = router;
        this.templates = templates;
    }
    TemplatesResolver.prototype.resolve = function (route, state) {
        var _this = this;
        return this.templates.all({ per_page: 50 }).toPromise().then(function (response) {
            return response.data;
        }).catch(function () {
            _this.router.navigate(['/dashboard']);
            return null;
        });
    };
    return TemplatesResolver;
}());



/***/ }),

/***/ "./src/app/dashboard/projects-resolver.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_auth_current_user__ = __webpack_require__("./node_modules/vebto-client/auth/current-user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_projects_projects_service__ = __webpack_require__("./src/app/shared/projects/projects.service.ts");



var ProjectsResolver = /** @class */ (function () {
    function ProjectsResolver(router, projects, currentUser) {
        this.router = router;
        this.projects = projects;
        this.currentUser = currentUser;
    }
    ProjectsResolver.prototype.resolve = function (route, state) {
        return this.projects.all({ user_id: this.currentUser.get('id'), per_page: 20 }).toPromise();
    };
    return ProjectsResolver;
}());



/***/ }),

/***/ "./src/app/material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialModule; });
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/shared/dom-helpers.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DomHelpers; });
var DomHelpers = /** @class */ (function () {
    function DomHelpers() {
    }
    DomHelpers.createLink = function (href, id) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        if (id)
            link.id = id;
        return link;
    };
    DomHelpers.createScript = function (src, id) {
        var script = document.createElement('script');
        if (id)
            script.id = id;
        script.src = src;
        return script;
    };
    DomHelpers.nodeFromString = function (html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
    };
    /**
     * Check if node or its parent has content editable attribute.
     */
    DomHelpers.nodeIsEditable = function (node) {
        return node.hasAttribute('contenteditable') || node.parentNode['hasAttribute']('contenteditable');
    };
    /**
     * Return whether or not given coordinates are above given element in the dom.
     */
    DomHelpers.coordinatesAboveNode = function (node, x, y) {
        if (node.nodeName === '#text')
            return;
        var offset = node.getBoundingClientRect(), width = node.offsetWidth, height = node.offsetHeight;
        var box = [
            [offset.left, offset.top],
            [offset.left + width, offset.top],
            [offset.left + width, offset.top + height],
            [offset.left, offset.top + height] //bottom left
        ];
        var beforePointY = box[0][1], beforePointX = box[0][0];
        if (y < box[2][1]) {
            return y < beforePointY || x < beforePointX;
        }
        return false;
    };
    DomHelpers.swapNodes = function (node1, node2) {
        if (node1.contains(node2) || node2.contains(node1))
            return;
        // save the location of node2
        var parent2 = node2.parentNode;
        var next2 = node2.nextElementSibling;
        // special case for node1 is the next sibling of node2
        if (next2 === node1) {
            // just put node1 before node2
            parent2.insertBefore(node1, node2);
        }
        else {
            // insert node2 right before node1
            node1.parentNode.insertBefore(node2, node1);
            // now insert node1 where node2 was
            if (next2) {
                // if there was an element after node2, then insert node1 right before that
                parent2.insertBefore(node1, next2);
            }
            else {
                // otherwise, just append as last child
                parent2.appendChild(node1);
            }
        }
    };
    DomHelpers.reorderDom = function (newOrder, oldOrder) {
        var swapped = [];
        newOrder.forEach(function (newNode, i) {
            var positionChanged = oldOrder[i] !== newNode, current = oldOrder[i];
            if (!positionChanged || swapped.indexOf(current) > -1 || swapped.indexOf(newNode) > -1)
                return;
            DomHelpers.swapNodes(current, newNode);
            swapped.push(newNode);
        });
    };
    return DomHelpers;
}());



/***/ }),

/***/ "./src/app/shared/page-document.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageDocument; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_helpers_service__ = __webpack_require__("./src/app/shared/dom-helpers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_services_utils__ = __webpack_require__("./node_modules/vebto-client/core/services/utils.ts");


var PageDocument = /** @class */ (function () {
    /**
     * PageDocument Constructor.
     */
    function PageDocument(baseUrl) {
        if (baseUrl === void 0) { baseUrl = null; }
        /**
         * Ids of dom elements that are created by the builder and are not part of the project.
         */
        this.internalIds = [
            '#base', '#jquery', '#custom-css', '#custom-js', '#template-js', '[id^=library]', '#theme-css',
            '#template-css', '#framework-css', '#framework-js', '#preview-css', '#font-awesome', '#custom-elements-css'
        ];
        this.baseUrl = baseUrl;
    }
    PageDocument.prototype.getOuterHtml = function () {
        return '<!DOCTYPE html>' + this.pageDocument.documentElement.outerHTML;
    };
    PageDocument.prototype.getInnerHtml = function () {
        return this.pageDocument.documentElement.innerHTML;
    };
    /**
     * Set url for document "base" tag.
     */
    PageDocument.prototype.setBaseUrl = function (url) {
        this.baseUrl = url;
        return this;
    };
    /**
     * Generate page document from specified markup.
     */
    PageDocument.prototype.generate = function (html, template, framework) {
        var _this = this;
        if (html === void 0) { html = ''; }
        this.pageDocument = new DOMParser().parseFromString(this.trim(html), 'text/html');
        //remove old link/script nodes to frameworks, icons, templates etc.
        this.internalIds.forEach(function (id) {
            var els = _this.pageDocument.querySelectorAll(id);
            for (var i = 0; i < els.length; i++) {
                els[i].parentNode.removeChild(els[i]);
            }
        });
        this.addBaseElement();
        this.useFramework(framework || template.config.framework);
        this.addIconsLink();
        //theme
        this.createLink('link', 'css/theme.css', 'theme-css');
        //custom elements css
        this.createLink('link', 'css/custom_elements.css', 'custom-elements-css');
        if (template) {
            this.addTemplate(template);
        }
        this.createLink('link', 'css/styles.css', 'custom-css');
        this.createLink('script', 'js/scripts.js', 'custom-js');
        return this;
    };
    /**
     * Add specified template to page.
     */
    PageDocument.prototype.addTemplate = function (template) {
        var _this = this;
        //legacy libraries
        if (template.config.libraries) {
            template.config.libraries.forEach(function (library) {
                _this.createLink('script', "js/" + library + ".js", "library-" + library);
            });
        }
        this.createLink('link', 'css/template.css', 'template-css');
        this.createLink('script', 'js/template.js', 'template-js');
    };
    /**
     * Create a stylesheet or scripts link from specified uri.
     */
    PageDocument.prototype.createLink = function (type, uri, id) {
        var query = __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_services_utils__["a" /* utils */].randomString(8), parent = type === 'link' ? this.pageDocument.head : this.pageDocument.body;
        type = __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_services_utils__["a" /* utils */].ucFirst(type);
        var link = __WEBPACK_IMPORTED_MODULE_0__dom_helpers_service__["a" /* DomHelpers */]['create' + type](this.baseUrl + uri + '?=' + query, id);
        parent.appendChild(link);
    };
    /**
     * Add base html element to document.
     */
    PageDocument.prototype.addBaseElement = function () {
        var base = this.pageDocument.createElement('base');
        base.id = 'base';
        base.href = this.baseUrl;
        this.pageDocument.head.insertBefore(base, this.pageDocument.head.firstChild);
    };
    /**
     * Add needed links and scripts of specified css framework to document.
     */
    PageDocument.prototype.useFramework = function (name) {
        if (!name || name === 'none')
            return;
        this.createLink('link', 'css/framework.css', 'framework-css');
        this.createLink('script', 'js/jquery.min.js', 'jquery');
        this.createLink('script', 'js/framework.js', 'framework-js');
    };
    /**
     * Add font awesome icons link to the document.
     */
    PageDocument.prototype.addIconsLink = function () {
        var link = __WEBPACK_IMPORTED_MODULE_0__dom_helpers_service__["a" /* DomHelpers */].createLink('http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css', 'font-awesome');
        this.pageDocument.head.appendChild(link);
    };
    /**
     * Trim whitespace from specified markup string.
     */
    PageDocument.prototype.trim = function (string) {
        return (string || '').trim();
    };
    return PageDocument;
}());



/***/ }),

/***/ "./src/app/shared/projects/project-url.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_auth_current_user__ = __webpack_require__("./node_modules/vebto-client/auth/current-user.ts");


var ProjectUrl = /** @class */ (function () {
    /**
     * ProjectBaseUrlService Constructor.
     */
    function ProjectUrl(settings, currentUser) {
        this.settings = settings;
        this.currentUser = currentUser;
    }
    /**
     * Get specified project's base url for the builder.
     */
    ProjectUrl.prototype.getBaseUrl = function (uuid, relative) {
        if (relative === void 0) { relative = false; }
        var uri = 'projects/' + this.currentUser.get('id') + '/' + uuid + '/';
        if (relative)
            return uri;
        return this.settings.getBaseUrl() + 'storage/' + uri;
    };
    /**
     * Get production site url for specified project.
     */
    ProjectUrl.prototype.getSiteUrl = function (project) {
        var base = this.settings.getBaseUrl(true);
        var protocol = base.match(/(^\w+:|^)\/\//)[0];
        if (this.settings.get('builder.routing_type') === 'subdomain') {
            //strip protocol from the url
            return protocol + project.name + '.' + base.replace(protocol, '');
        }
        return this.settings.getBaseUrl(true) + 'sites/' + project.name;
    };
    return ProjectUrl;
}());



/***/ }),

/***/ "./src/app/shared/projects/projects.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Projects; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vebto_client_core_http_app_http_client_service__ = __webpack_require__("./node_modules/vebto-client/core/http/app-http-client.service.ts");

var Projects = /** @class */ (function () {
    /**
     * Projects API service constructor.
     */
    function Projects(http) {
        this.http = http;
    }
    /**
     * Get all available projects.
     */
    Projects.prototype.all = function (params) {
        return this.http.get('projects', params);
    };
    /**
     * Get project matching specified id.
     */
    Projects.prototype.get = function (id) {
        return this.http.get('projects/' + id);
    };
    /**
     * Create a new project.
     */
    Projects.prototype.create = function (params) {
        return this.http.post('projects', params);
    };
    /**
     * Update project matching specified id.
     */
    Projects.prototype.update = function (id, params) {
        return this.http.put('projects/' + id, params);
    };
    /**
     * Delete project matching specified id.
     */
    Projects.prototype.delete = function (params) {
        return this.http.delete('projects', params);
    };
    /**
     * Create or update specified project's thumbnail image.
     */
    Projects.prototype.generateThumbnail = function (projectId, dataUrl) {
        return this.http.post('projects/' + projectId + '/generate-thumbnail', { dataUrl: dataUrl });
    };
    /**
     * Publish specified project to FTP.
     */
    Projects.prototype.publish = function (projectId, params) {
        return this.http.post('projects/' + projectId + '/publish', params);
    };
    return Projects;
}());



/***/ }),

/***/ "./src/app/shared/projects/publish-project-modal/publish-project-modal.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_PublishProjectModalComponent */
/* unused harmony export View_PublishProjectModalComponent_0 */
/* unused harmony export View_PublishProjectModalComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublishProjectModalComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__publish_project_modal_component_scss_ngstyle__ = __webpack_require__("./src/app/shared/projects/publish-project-modal/publish-project-modal.component.scss.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_progress_bar_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/progress-bar/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_progress_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__ = __webpack_require__("./node_modules/vebto-client/translations/translate.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__ = __webpack_require__("./node_modules/vebto-client/translations/translations.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__ = __webpack_require__("./node_modules/vebto-client/core/ui/svg-icon/svg-icon.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__ = __webpack_require__("./node_modules/vebto-client/core/ui/svg-icon/svg-icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_angular_material_slide_toggle_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/slide-toggle/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material_slide_toggle__ = __webpack_require__("./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__publish_project_modal_component__ = __webpack_require__("./src/app/shared/projects/publish-project-modal/publish-project-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__projects_service__ = __webpack_require__("./src/app/shared/projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__project_url_service__ = __webpack_require__("./src/app/shared/projects/project-url.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_vebto_client_core_ui_toast_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/toast.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






















var styles_PublishProjectModalComponent = [__WEBPACK_IMPORTED_MODULE_0__publish_project_modal_component_scss_ngstyle__["a" /* styles */]];
var RenderType_PublishProjectModalComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 2, styles: styles_PublishProjectModalComponent, data: {} });

function View_PublishProjectModalComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "p", [["class", "error"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.errors.host; _ck(_v, 1, 0, currVal_0); }); }
function View_PublishProjectModalComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "p", [["class", "error"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.errors.username; _ck(_v, 1, 0, currVal_0); }); }
function View_PublishProjectModalComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "p", [["class", "error"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.errors.password; _ck(_v, 1, 0, currVal_0); }); }
function View_PublishProjectModalComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "p", [["class", "error"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.errors.directory; _ck(_v, 1, 0, currVal_0); }); }
function View_PublishProjectModalComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "p", [["class", "error"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.errors.port; _ck(_v, 1, 0, currVal_0); }); }
function View_PublishProjectModalComponent_6(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "mat-progress-bar", [["aria-valuemax", "100"], ["aria-valuemin", "0"], ["class", "mat-progress-bar"], ["color", "accent"], ["mode", "indeterminate"], ["role", "progressbar"]], [[1, "aria-valuenow", 0], [1, "mode", 0]], null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_progress_bar_typings_index_ngfactory__["b" /* View_MatProgressBar_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_progress_bar_typings_index_ngfactory__["a" /* RenderType_MatProgressBar */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_progress_bar__["a" /* MatProgressBar */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], { color: [0, "color"], mode: [1, "mode"] }, null)], function (_ck, _v) { var currVal_2 = "accent"; var currVal_3 = "indeterminate"; _ck(_v, 1, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).value; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).mode; _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_PublishProjectModalComponent_7(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "div", [["class", "error no-input-error"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.errors.general; _ck(_v, 1, 0, currVal_0); }); }
function View_PublishProjectModalComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "div", [["class", "modal-header"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 3, "h2", [["class", "modal-title mat-dialog-title"], ["mat-dialog-title", ""], ["trans", ""]], [[8, "id", 0]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 81920, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["k" /* MatDialogTitle */], [[2, __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["j" /* MatDialogRef */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["e" /* MatDialog */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Publish Project"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 2, "button", [["class", "close-button no-style icon-button"], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.close() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 1, "svg-icon", [["name", "close"]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["b" /* View_SvgIconComponent_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_vebto_client_core_ui_svg_icon_svg_icon_component_ngfactory__["a" /* RenderType_SvgIconComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_9_vebto_client_core_ui_svg_icon_svg_icon_component__["a" /* SvgIconComponent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](8, 0, null, null, 104, "form", [["ngNativeValidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.confirm() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["q" /* NgForm */], [[8, null], [8, null]], null, { ngSubmit: "ngSubmit" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["q" /* NgForm */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["p" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 6, "div", [["class", "project-url"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](13, 0, null, null, 1, "a", [["target", "_blank"]], [[8, "href", 4]], null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](14, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](15, 0, null, null, 3, "mat-slide-toggle", [["class", "mat-slide-toggle"], ["name", "ssl"]], [[8, "id", 0], [2, "mat-checked", null], [2, "mat-disabled", null], [2, "mat-slide-toggle-label-before", null]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.toggleProjectState($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_11__node_modules_angular_material_slide_toggle_typings_index_ngfactory__["b" /* View_MatSlideToggle_0 */], __WEBPACK_IMPORTED_MODULE_11__node_modules_angular_material_slide_toggle_typings_index_ngfactory__["a" /* RenderType_MatSlideToggle */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](5120, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_12__angular_material_slide_toggle__["a" /* MatSlideToggle */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](17, 1228800, null, 0, __WEBPACK_IMPORTED_MODULE_12__angular_material_slide_toggle__["a" /* MatSlideToggle */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_13__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_14__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [8, null]], { disabled: [0, "disabled"], name: [1, "name"], checked: [2, "checked"] }, { change: "change" }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Public"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 0, null, null, 79, "div", [["class", "mat-dialog-content many-inputs mat-dialog-content"], ["mat-dialog-content", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](20, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["h" /* MatDialogContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](21, 0, null, null, 13, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, null, 2, "label", [["for", "host"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Host"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](25, 0, null, null, 7, "input", [["id", "host"], ["name", "host"], ["required", ""], ["type", "text"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.ftpDetails.host = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](26, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](27, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */], [], { required: [0, "required"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](30, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */]], [8, null], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](32, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_PublishProjectModalComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](34, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](35, 0, null, null, 13, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](36, 0, null, null, 2, "label", [["for", "username"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](37, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Username"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](39, 0, null, null, 7, "input", [["id", "username"], ["name", "username"], ["required", ""], ["type", "text"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 40)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 40).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 40)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 40)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.ftpDetails.username = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](40, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](41, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */], [], { required: [0, "required"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](44, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */]], [8, null], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](46, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_PublishProjectModalComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](48, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](49, 0, null, null, 13, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](50, 0, null, null, 2, "label", [["for", "password"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](51, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Password"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](53, 0, null, null, 7, "input", [["id", "password"], ["name", "password"], ["required", ""], ["type", "password"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 54)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.ftpDetails.password = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](54, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](55, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */], [], { required: [0, "required"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](58, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */]], [8, null], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](60, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_PublishProjectModalComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](62, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](63, 0, null, null, 12, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](64, 0, null, null, 2, "label", [["for", "directory"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](65, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Directory"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](67, 0, null, null, 6, "input", [["id", "directory"], ["name", "directory"], ["placeholder", "(Optional)"], ["trans-placeholder", ""], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 69)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 69).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 69)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 69)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.ftpDetails.directory = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](68, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](69, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](71, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](73, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_PublishProjectModalComponent_4)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](75, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](76, 0, null, null, 22, "div", [["class", "inline-inputs"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](77, 0, null, null, 14, "div", [["class", "input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](78, 0, null, null, 2, "label", [["for", "port"], ["trans", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](79, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Port"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](81, 0, null, null, 8, "input", [["id", "port"], ["name", "port"], ["required", ""], ["type", "number"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 82)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 82).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 82)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 82)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("change" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).onChange($event.target.value) !== false);
        ad = (pd_4 && ad);
    } if (("input" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).onChange($event.target.value) !== false);
        ad = (pd_5 && ad);
    } if (("blur" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).onTouched() !== false);
        ad = (pd_6 && ad);
    } if (("ngModelChange" === en)) {
        var pd_7 = ((_co.ftpDetails.port = $event) !== false);
        ad = (pd_7 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](82, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](83, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["y" /* ɵbc */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](84, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */], [], { required: [0, "required"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["u" /* RequiredValidator */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0, p1_0) { return [p0_0, p1_0]; }, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["d" /* DefaultValueAccessor */], __WEBPACK_IMPORTED_MODULE_10__angular_forms__["y" /* ɵbc */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](87, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["l" /* NG_VALIDATORS */]], [8, null], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](89, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_PublishProjectModalComponent_5)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](91, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](92, 0, null, null, 6, "mat-slide-toggle", [["class", "mat-slide-toggle"], ["name", "ssl"]], [[8, "id", 0], [2, "mat-checked", null], [2, "mat-disabled", null], [2, "mat-slide-toggle-label-before", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.ftpDetails.ssl = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_11__node_modules_angular_material_slide_toggle_typings_index_ngfactory__["b" /* View_MatSlideToggle_0 */], __WEBPACK_IMPORTED_MODULE_11__node_modules_angular_material_slide_toggle_typings_index_ngfactory__["a" /* RenderType_MatSlideToggle */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](93, 1228800, null, 0, __WEBPACK_IMPORTED_MODULE_12__angular_material_slide_toggle__["a" /* MatSlideToggle */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_13__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_14__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [8, null]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_12__angular_material_slide_toggle__["a" /* MatSlideToggle */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](95, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["m" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["r" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](97, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_forms__["o" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_10__angular_forms__["n" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["SSL"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_PublishProjectModalComponent_6)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](100, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_PublishProjectModalComponent_7)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](102, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_common__["NgIf"], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](103, 0, null, null, 9, "div", [["class", "buttons right mat-dialog-actions mat-dialog-actions"], ["mat-dialog-actions", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](104, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["f" /* MatDialogActions */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](105, 0, null, null, 3, "button", [["class", "button cancel cancel-button"], ["mat-button", ""], ["trans", ""], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.close() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["d" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["b" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](106, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_17__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_13__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_14__angular_cdk_a11y__["j" /* FocusMonitor */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](107, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Cancel"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](109, 0, null, null, 3, "button", [["class", "button primary submit-button"], ["color", "accent"], ["mat-raised-button", ""], ["trans", ""], ["type", "submit"]], [[8, "disabled", 0]], null, null, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["d" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["b" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](110, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_17__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_13__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_14__angular_cdk_a11y__["j" /* FocusMonitor */]], { disabled: [0, "disabled"], color: [1, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](111, 4341760, null, 0, __WEBPACK_IMPORTED_MODULE_4_vebto_client_translations_translate_directive__["a" /* TranslateDirective */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5_vebto_client_translations_translations_service__["a" /* Translations */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Publish"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 3, 0); var currVal_1 = "close"; _ck(_v, 7, 0, currVal_1); var currVal_15 = _co.loading; var currVal_16 = "ssl"; var currVal_17 = !!_co.data.project.published; _ck(_v, 17, 0, currVal_15, currVal_16, currVal_17); var currVal_26 = ""; _ck(_v, 27, 0, currVal_26); var currVal_27 = "host"; var currVal_28 = _co.ftpDetails.host; _ck(_v, 30, 0, currVal_27, currVal_28); var currVal_29 = _co.errors.host; _ck(_v, 34, 0, currVal_29); var currVal_38 = ""; _ck(_v, 41, 0, currVal_38); var currVal_39 = "username"; var currVal_40 = _co.ftpDetails.username; _ck(_v, 44, 0, currVal_39, currVal_40); var currVal_41 = _co.errors.username; _ck(_v, 48, 0, currVal_41); var currVal_50 = ""; _ck(_v, 55, 0, currVal_50); var currVal_51 = "password"; var currVal_52 = _co.ftpDetails.password; _ck(_v, 58, 0, currVal_51, currVal_52); var currVal_53 = _co.errors.password; _ck(_v, 62, 0, currVal_53); var currVal_61 = "directory"; var currVal_62 = _co.ftpDetails.directory; _ck(_v, 71, 0, currVal_61, currVal_62); var currVal_63 = _co.errors.directory; _ck(_v, 75, 0, currVal_63); var currVal_72 = ""; _ck(_v, 84, 0, currVal_72); var currVal_73 = "port"; var currVal_74 = _co.ftpDetails.port; _ck(_v, 87, 0, currVal_73, currVal_74); var currVal_75 = _co.errors.port; _ck(_v, 91, 0, currVal_75); var currVal_87 = "ssl"; _ck(_v, 93, 0, currVal_87); var currVal_88 = "ssl"; var currVal_89 = _co.ftpDetails.ssl; _ck(_v, 95, 0, currVal_88, currVal_89); var currVal_90 = _co.loading; _ck(_v, 100, 0, currVal_90); var currVal_91 = _co.errors.general; _ck(_v, 102, 0, currVal_91); var currVal_94 = _co.loading; var currVal_95 = "accent"; _ck(_v, 110, 0, currVal_94, currVal_95); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).id; _ck(_v, 1, 0, currVal_0); var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassUntouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassTouched; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassPristine; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassDirty; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassValid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassInvalid; var currVal_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).ngClassPending; _ck(_v, 8, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_9 = _co.getProjectUrl(); _ck(_v, 13, 0, currVal_9); var currVal_10 = _co.getProjectUrl(); _ck(_v, 14, 0, currVal_10); var currVal_11 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 17).id; var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 17).checked; var currVal_13 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 17).disabled; var currVal_14 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 17).labelPosition == "before"); _ck(_v, 15, 0, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_18 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).required ? "" : null); var currVal_19 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 32).ngClassUntouched; var currVal_20 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 32).ngClassTouched; var currVal_21 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 32).ngClassPristine; var currVal_22 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 32).ngClassDirty; var currVal_23 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 32).ngClassValid; var currVal_24 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 32).ngClassInvalid; var currVal_25 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 32).ngClassPending; _ck(_v, 25, 0, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25); var currVal_30 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 41).required ? "" : null); var currVal_31 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46).ngClassUntouched; var currVal_32 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46).ngClassTouched; var currVal_33 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46).ngClassPristine; var currVal_34 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46).ngClassDirty; var currVal_35 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46).ngClassValid; var currVal_36 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46).ngClassInvalid; var currVal_37 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46).ngClassPending; _ck(_v, 39, 0, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37); var currVal_42 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55).required ? "" : null); var currVal_43 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60).ngClassUntouched; var currVal_44 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60).ngClassTouched; var currVal_45 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60).ngClassPristine; var currVal_46 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60).ngClassDirty; var currVal_47 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60).ngClassValid; var currVal_48 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60).ngClassInvalid; var currVal_49 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60).ngClassPending; _ck(_v, 53, 0, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49); var currVal_54 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 73).ngClassUntouched; var currVal_55 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 73).ngClassTouched; var currVal_56 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 73).ngClassPristine; var currVal_57 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 73).ngClassDirty; var currVal_58 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 73).ngClassValid; var currVal_59 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 73).ngClassInvalid; var currVal_60 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 73).ngClassPending; _ck(_v, 67, 0, currVal_54, currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60); var currVal_64 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 84).required ? "" : null); var currVal_65 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).ngClassUntouched; var currVal_66 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).ngClassTouched; var currVal_67 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).ngClassPristine; var currVal_68 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).ngClassDirty; var currVal_69 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).ngClassValid; var currVal_70 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).ngClassInvalid; var currVal_71 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).ngClassPending; _ck(_v, 81, 0, currVal_64, currVal_65, currVal_66, currVal_67, currVal_68, currVal_69, currVal_70, currVal_71); var currVal_76 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 93).id; var currVal_77 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 93).checked; var currVal_78 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 93).disabled; var currVal_79 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 93).labelPosition == "before"); var currVal_80 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 97).ngClassUntouched; var currVal_81 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 97).ngClassTouched; var currVal_82 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 97).ngClassPristine; var currVal_83 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 97).ngClassDirty; var currVal_84 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 97).ngClassValid; var currVal_85 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 97).ngClassInvalid; var currVal_86 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 97).ngClassPending; _ck(_v, 92, 1, [currVal_76, currVal_77, currVal_78, currVal_79, currVal_80, currVal_81, currVal_82, currVal_83, currVal_84, currVal_85, currVal_86]); var currVal_92 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 106).disabled || null); _ck(_v, 105, 0, currVal_92); var currVal_93 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 110).disabled || null); _ck(_v, 109, 0, currVal_93); }); }
function View_PublishProjectModalComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "publish-project-modal", [], null, null, null, View_PublishProjectModalComponent_0, RenderType_PublishProjectModalComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_18__publish_project_modal_component__["a" /* PublishProjectModalComponent */], [__WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["j" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["a" /* MAT_DIALOG_DATA */], __WEBPACK_IMPORTED_MODULE_19__projects_service__["a" /* Projects */], __WEBPACK_IMPORTED_MODULE_20__project_url_service__["a" /* ProjectUrl */], __WEBPACK_IMPORTED_MODULE_6_vebto_client_core_services_settings_service__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_21_vebto_client_core_ui_toast_service__["a" /* Toast */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var PublishProjectModalComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("publish-project-modal", __WEBPACK_IMPORTED_MODULE_18__publish_project_modal_component__["a" /* PublishProjectModalComponent */], View_PublishProjectModalComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/shared/projects/publish-project-modal/publish-project-modal.component.scss.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n\n\n\npublish-project-modal {\n  display: block; }\npublish-project-modal .project-url {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: 40px;\n    padding-bottom: 15px;\n    border-bottom: 1px solid #eff1f2; }\npublish-project-modal .project-url > a {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      font-weight: 500;\n      font-size: 1.5rem; }\npublish-project-modal .project-url > a:hover {\n        text-decoration: underline; }\npublish-project-modal .project-url > mat-slide-toggle {\n      margin-left: auto; }\npublish-project-modal .inline-inputs {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    margin-bottom: 20px; }\npublish-project-modal .inline-inputs > .input-container {\n      max-width: 200px; }\npublish-project-modal .inline-inputs > mat-slide-toggle {\n      margin-left: auto; }\n"];



/***/ }),

/***/ "./src/app/shared/projects/publish-project-modal/publish-project-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublishProjectModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vebto_client_core_services_settings_service__ = __webpack_require__("./node_modules/vebto-client/core/services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vebto_client_core_ui_toast_service__ = __webpack_require__("./node_modules/vebto-client/core/ui/toast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__projects_service__ = __webpack_require__("./src/app/shared/projects/projects.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_url_service__ = __webpack_require__("./src/app/shared/projects/project-url.service.ts");





var PublishProjectModalComponent = /** @class */ (function () {
    /**
     * NewProjectModalComponent Constructor.
     */
    function PublishProjectModalComponent(dialogRef, data, projects, projectUrl, settings, toast) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.projects = projects;
        this.projectUrl = projectUrl;
        this.settings = settings;
        this.toast = toast;
        /**
         * Backend errors for last request.
         */
        this.errors = {};
        /**
         * Details of ftp project should be published to.
         */
        this.ftpDetails = { port: 21, ssl: false };
        /**
         * Whether backend request is currently in progress.
         */
        this.loading = false;
    }
    PublishProjectModalComponent.prototype.ngOnInit = function () {
    };
    PublishProjectModalComponent.prototype.confirm = function () {
        var _this = this;
        this.loading = true;
        this.projects.publish(this.data.project.id, this.ftpDetails).subscribe(function () {
            _this.loading = false;
            _this.toast.open('Project published');
            _this.close();
        }, function (response) {
            _this.errors = response.messages;
            _this.loading = false;
        });
    };
    /**
     * Close the modal.
     */
    PublishProjectModalComponent.prototype.close = function () {
        this.dialogRef.close(this.data.project);
    };
    /**
     * Get absolute url for project site.
     */
    PublishProjectModalComponent.prototype.getProjectUrl = function () {
        return this.projectUrl.getSiteUrl(this.data.project);
    };
    /**
     * Toggle project "published" state.
     */
    PublishProjectModalComponent.prototype.toggleProjectState = function (e) {
        var _this = this;
        if (this.stateToggleRequest) {
            this.stateToggleRequest.unsubscribe();
            this.stateToggleRequest = null;
        }
        this.stateToggleRequest = this.projects
            .update(this.data.project.id, { published: e.checked ? 1 : 0 }).subscribe(function (response) {
            _this.data.project.published = response.project.model.published;
        });
    };
    return PublishProjectModalComponent;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/shared/templates/templates.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Templates; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vebto_client_core_http_app_http_client_service__ = __webpack_require__("./node_modules/vebto-client/core/http/app-http-client.service.ts");

var Templates = /** @class */ (function () {
    /**
     * Templates API service constructor.
     */
    function Templates(http) {
        this.http = http;
    }
    /**
     * Get all available templates.
     */
    Templates.prototype.all = function (params) {
        if (params === void 0) { params = {}; }
        return this.http.get('templates', params);
    };
    /**
     * Get template by specified id.
     */
    Templates.prototype.get = function (name) {
        return this.http.get('templates/' + name);
    };
    /**
     * Create a new template.
     */
    Templates.prototype.create = function (params) {
        return this.http.post('templates', params);
    };
    /**
     * Update specified template.
     */
    Templates.prototype.update = function (name, params) {
        return this.http.put('templates/' + name, params);
    };
    /**
     * Delete specified templates.
     */
    Templates.prototype.delete = function (names) {
        return this.http.delete('templates', { names: names });
    };
    return Templates;
}());



/***/ }),

/***/ "./src/app/shared/themes/themes.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Themes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vebto_client_core_http_http_cache_client__ = __webpack_require__("./node_modules/vebto-client/core/http/http-cache-client.ts");

var Themes = /** @class */ (function () {
    /**
     * Themes API service constructor.
     */
    function Themes(http) {
        this.http = http;
    }
    /**
     * Get all available themes.
     */
    Themes.prototype.all = function () {
        return this.http.get('themes');
    };
    return Themes;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs__ = __webpack_require__("./node_modules/hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module_ngfactory__ = __webpack_require__("./src/app/app.module.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");





if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["j" /* platformBrowser */]().bootstrapModuleFactory(__WEBPACK_IMPORTED_MODULE_3__app_app_module_ngfactory__["a" /* AppModuleNgFactory */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map