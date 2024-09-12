"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[856],{"./packages/components/build-module/flex/context.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>FlexContext,f:()=>useFlexContext});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const FlexContext=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({flexItemDisplay:void 0}),useFlexContext=()=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(FlexContext)},"./packages/components/build-module/flex/flex-item/component.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _context__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/build-module/context/context-connect.js"),_view__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/build-module/view/component.js"),_hook__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/build-module/flex/flex-item/hook.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_context__WEBPACK_IMPORTED_MODULE_3__.Iq)((function UnconnectedFlexItem(props,forwardedRef){const flexItemProps=(0,_hook__WEBPACK_IMPORTED_MODULE_1__.i)(props);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_view__WEBPACK_IMPORTED_MODULE_2__.Z,{...flexItemProps,ref:forwardedRef})}),"FlexItem")},"./packages/components/build-module/flex/flex-item/hook.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>useFlexItem});var _emotion_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),_context__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/components/build-module/context/use-context-system.js"),_context__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/build-module/flex/context.js"),_styles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/build-module/flex/styles.js"),_utils_hooks_use_cx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/build-module/utils/hooks/use-cx.js");function useFlexItem(props){const{className,display:displayProp,isBlock=!1,...otherProps}=(0,_context__WEBPACK_IMPORTED_MODULE_0__.y)(props,"FlexItem"),sx={},contextDisplay=(0,_context__WEBPACK_IMPORTED_MODULE_1__.f)().flexItemDisplay;sx.Base=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.iv)({display:displayProp||contextDisplay},"","","","");return{...otherProps,className:(0,_utils_hooks_use_cx__WEBPACK_IMPORTED_MODULE_3__.I)()(_styles__WEBPACK_IMPORTED_MODULE_4__.ck,sx.Base,isBlock&&_styles__WEBPACK_IMPORTED_MODULE_4__.Ge,className)}}},"./packages/components/build-module/flex/flex/hook.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>useFlex});var _emotion_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),_wordpress_element__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/index.js"),_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/deprecated/build-module/index.js"),_context__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/build-module/context/use-context-system.js"),_utils_use_responsive_value__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/build-module/utils/use-responsive-value.js"),_utils_space__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/components/build-module/utils/space.js"),_styles__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./packages/components/build-module/flex/styles.js"),_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/build-module/utils/hooks/use-cx.js");function useFlex(props){const{align,className,direction:directionProp="row",expanded=!0,gap=2,justify="space-between",wrap=!1,...otherProps}=(0,_context__WEBPACK_IMPORTED_MODULE_1__.y)(function useDeprecatedProps(props){const{isReversed,...otherProps}=props;return void 0!==isReversed?((0,_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0__.Z)("Flex isReversed",{alternative:'Flex direction="row-reverse" or "column-reverse"',since:"5.9"}),{...otherProps,direction:isReversed?"row-reverse":"row"}):otherProps}(props),"Flex"),directionAsArray=Array.isArray(directionProp)?directionProp:[directionProp],direction=(0,_utils_use_responsive_value__WEBPACK_IMPORTED_MODULE_2__.V)(directionAsArray),isColumn="string"==typeof direction&&!!direction.includes("column"),cx=(0,_utils__WEBPACK_IMPORTED_MODULE_3__.I)();return{...otherProps,className:(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)((()=>{const base=(0,_emotion_react__WEBPACK_IMPORTED_MODULE_5__.iv)({alignItems:null!=align?align:isColumn?"normal":"center",flexDirection:direction,flexWrap:wrap?"wrap":void 0,gap:(0,_utils_space__WEBPACK_IMPORTED_MODULE_6__.D)(gap),justifyContent:justify,height:isColumn&&expanded?"100%":void 0,width:!isColumn&&expanded?"100%":void 0},"","","","");return cx(_styles__WEBPACK_IMPORTED_MODULE_7__.kC,base,isColumn?_styles__WEBPACK_IMPORTED_MODULE_7__.bg:_styles__WEBPACK_IMPORTED_MODULE_7__.h,className)}),[align,className,cx,direction,expanded,gap,isColumn,justify,wrap]),isColumn}}},"./packages/components/build-module/flex/styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ge:()=>block,bg:()=>ItemsColumn,ck:()=>Item,h:()=>ItemsRow,kC:()=>Flex});const Flex={name:"zjik7",styles:"display:flex"},Item={name:"qgaee5",styles:"display:block;max-height:100%;max-width:100%;min-height:0;min-width:0"},block={name:"82a6rk",styles:"flex:1"},ItemsColumn={name:"13nosa1",styles:">*{min-height:0;}"},ItemsRow={name:"1pwxzk4",styles:">*{min-width:0;}"}},"./packages/components/build-module/utils/use-responsive-value.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>useResponsiveValue});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const breakpoints=["40em","52em","64em"],useBreakpointIndex=(options={})=>{const{defaultIndex=0}=options;if("number"!=typeof defaultIndex)throw new TypeError(`Default breakpoint index should be a number. Got: ${defaultIndex}, ${typeof defaultIndex}`);if(defaultIndex<0||defaultIndex>breakpoints.length-1)throw new RangeError(`Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`);const[value,setValue]=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultIndex);return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const onResize=()=>{const newValue=breakpoints.filter((bp=>"undefined"!=typeof window&&window.matchMedia(`screen and (min-width: ${bp})`).matches)).length;value!==newValue&&setValue(newValue)};return onResize(),"undefined"!=typeof window&&window.addEventListener("resize",onResize),()=>{"undefined"!=typeof window&&window.removeEventListener("resize",onResize)}}),[value]),value};function useResponsiveValue(values,options={}){const index=useBreakpointIndex(options);if(!Array.isArray(values)&&"function"!=typeof values)return values;const array=values||[];return array[index>=array.length?array.length-1:index]}}}]);