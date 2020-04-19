/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\");\n/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ \"./node_modules/d3/index.js\");\n/* harmony import */ var babylonjs_gui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babylonjs-gui */ \"./node_modules/babylonjs-gui/babylon.gui.min.js\");\n/* harmony import */ var babylonjs_gui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babylonjs_gui__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\nvar genScene = function genScene(nameData) {\n  console.log(nameData[0]);\n  var canvas = document.getElementById(\"renderCanvas\");\n  var info = document.getElementById(\"info\");\n\n  var setInfo = function setInfo(text) {\n    return info.innerHTML = text;\n  };\n\n  var engine = null;\n  var scene = null;\n  var sceneToRender = null;\n\n  var createDefaultEngine = function createDefaultEngine() {\n    return new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Engine\"](canvas, true, {\n      preserveDrawingBuffer: true,\n      stencil: true\n    });\n  };\n\n  var createScene = function createScene() {\n    setInfo(\"creating the scene\"); // Create scene\n\n    var scene = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"](engine); // Create simple sphere\n\n    var multimat = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"MultiMaterial\"]('multi', scene); // const colorMode = \"GENDER\";\n\n    var colorMode = \"TOP\";\n\n    if (colorMode === \"GENDER\") {\n      var material1 = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"StandardMaterial\"](\"sphere material\", scene);\n      material1.diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Color3\"](0, 0, 1);\n      material1.freeze();\n      multimat.subMaterials.push(material1);\n      var material2 = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"StandardMaterial\"](\"sphere material\", scene);\n      material2.diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Color3\"](1, 0, 0);\n      material2.freeze();\n      multimat.subMaterials.push(material2);\n    }\n\n    var boxes = [];\n\n    var colorScale = function colorScale(t) {\n      var v = (t - 1900) / (2017 - 1900);\n      var rgbColor = Object(d3__WEBPACK_IMPORTED_MODULE_1__[\"interpolateSpectral\"])(v);\n\n      var _rgbColor$substring$s = rgbColor.substring(4, rgbColor.length - 1).split(',').map(function (n) {\n        return parseInt(n, 10) / 255;\n      }),\n          _rgbColor$substring$s2 = _slicedToArray(_rgbColor$substring$s, 3),\n          r = _rgbColor$substring$s2[0],\n          g = _rgbColor$substring$s2[1],\n          b = _rgbColor$substring$s2[2];\n\n      return new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Color3\"](r, g, b);\n    };\n\n    setInfo(\"Adding the boxes\");\n\n    for (var i = 0; i < nameData.length; i++) {\n      var nameInfo = nameData[i];\n      var size = 0.000 + Math.log10(nameData[i].count - 900) / 100;\n      var sphere = babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"MeshBuilder\"].CreateBox(\"sphere\", {\n        size: size\n      });\n      var posX = nameInfo.x / 10 + 3;\n      var posY = nameInfo.y / 10;\n      var posZ = nameInfo.z / 10;\n      sphere.position.y = posX;\n      sphere.position.x = posY;\n      sphere.position.z = posZ;\n      boxes.push(sphere);\n\n      if (colorMode === \"TOP\") {\n        var material = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"StandardMaterial\"](\"sphere material\", scene);\n        material.diffuseColor = colorScale(nameData[i].idxmax);\n        material.freeze();\n        multimat.subMaterials.push(material);\n      }\n    }\n\n    setInfo(\"Adding the collors\");\n    var newMesh = babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"].MergeMeshes(boxes, true, true, undefined, true);\n    newMesh.material = multimat;\n\n    for (var _i2 = 0; _i2 < newMesh.subMeshes.length; _i2++) {\n      if (colorMode === \"TOP\") {\n        newMesh.subMeshes[_i2].materialIndex = _i2;\n      } else if (colorMode === \"GENDER\") {\n        newMesh.subMeshes[_i2].materialIndex = nameData[_i2].name.includes('(F)') ? 1 : 0;\n      }\n    }\n\n    newMesh.freezeWorldMatrix();\n    setInfo(\"Adding the rest\"); // Lights and camera\n\n    var light = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"HemisphericLight\"](\"HemiLight\", new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0), scene);\n    var camera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"ArcRotateCamera\"](\"camera\", -Math.PI / 2, Math.PI / 4, 0.1, new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 3, 0), scene);\n    console.log(camera);\n    camera.attachControl(canvas, true);\n    scene.activeCamera.beta += 0.8; // Default Environment\n\n    var environment = scene.createDefaultEnvironment({\n      enableGroundShadow: true,\n      groundYBias: 1\n    });\n    environment.setMainColor(babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Color3\"].FromHexString(\"#74b9ff\"));\n    var plane = babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"MeshBuilder\"].CreatePlane(\"plane\", {\n      size: 1,\n      sideOrientation: BABYLON.Mesh.BACKSIDE\n    }, scene);\n    plane.position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](-0.4, 4, -0.4); // plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;\n\n    var advancedTexture = babylonjs_gui__WEBPACK_IMPORTED_MODULE_2__[\"AdvancedDynamicTexture\"].CreateForMesh(plane);\n    var panel = new babylonjs_gui__WEBPACK_IMPORTED_MODULE_2__[\"StackPanel\"]();\n    advancedTexture.addControl(panel);\n    var header = new babylonjs_gui__WEBPACK_IMPORTED_MODULE_2__[\"TextBlock\"]();\n    header.text = \"Color GUI\";\n    header.height = \"50px\";\n    header.color = \"white\";\n    header.textHorizontalAlignment = babylonjs_gui__WEBPACK_IMPORTED_MODULE_2__[\"Control\"].HORIZONTAL_ALIGNMENT_CENTER;\n    header.fontSize = \"32\";\n    panel.addControl(header);\n    var body = new babylonjs_gui__WEBPACK_IMPORTED_MODULE_2__[\"TextBlock\"]();\n    body.text = \"\";\n    body.height = \"100px\";\n    body.color = \"white\";\n    body.textHorizontalAlignment = babylonjs_gui__WEBPACK_IMPORTED_MODULE_2__[\"Control\"].HORIZONTAL_ALIGNMENT_CENTER;\n    body.fontSize = \"24\";\n    panel.addControl(body); // Shadows\n    // var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);\n    // shadowGenerator.useBlurExponentialShadowMap = true;\n    // shadowGenerator.blurKernel = 32;\n    // shadowGenerator.addShadowCaster(sphere, true);\n    // Enable VR\n\n    var vrHelper = scene.createDefaultVRExperience({\n      createDeviceOrientationCamera: false,\n      useMultiview: true\n    });\n    vrHelper.enableTeleportation({\n      floorMeshes: [environment.ground]\n    });\n\n    vrHelper.raySelectionPredicate = function (mesh) {\n      if (mesh.name === \"sphere_merged\" || mesh.name === \"ground\") {\n        return true;\n      }\n\n      return false;\n    };\n\n    vrHelper.onNewMeshPicked.add(function (pickingInfo) {\n      if (pickingInfo.pickedMesh.name === \"sphere_merged\") {\n        plane.position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](pickingInfo.pickedPoint.x, pickingInfo.pickedPoint.y, pickingInfo.pickedPoint.z);\n        console.log(vrHelper.webVRCamera.devicePosition.clone());\n        plane.lookAt(vrHelper.webVRCamera.devicePosition.clone());\n        plane.rotation.y += Math.PI;\n        plane.rotation.x = -plane.rotation.x;\n        header.text = nameData[pickingInfo.subMeshId].name;\n        var nameInfoText = \"Ann\\xE9e de pic : \".concat(nameData[pickingInfo.subMeshId].idxmax, \"\\nNombre : \").concat(nameData[pickingInfo.subMeshId].count);\n        body.text = nameInfoText;\n      } else {// plane.position = new BABYLON.Vector3(-1000, -1000, -1000)\n      }\n    }); // vrHelper.onControllerMeshLoaded.add((webVRController)=>{\n    //     console.log(webVRController)\n    //     if(webVRController.hand==\"right\"){  \n    //         const cube = BABYLON.MeshBuilder.CreateBox(\"box\", {size: 0.2})\n    //         // webVRController.mesh.setEnabled(false);\n    //         webVRController.attachToMesh(box);\n    //         // webVRController.mesh.setEnabled(true);\n    //     }\n    // });\n\n    var ground = babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"].CreateGround(\"ground\", 6, 6, 2, scene);\n    vrHelper.enableTeleportation({\n      floorMeshName: \"ground\",\n      floorMeshes: [ground]\n    });\n    var options = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"SceneOptimizerOptions\"]();\n    options.addOptimization(new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"HardwareScalingOptimization\"](0, 1)); // Optimizer\n\n    var optimizer = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"SceneOptimizer\"](scene, options); // Runs every frame to rotate the sphere\n\n    /* scene.onBeforeRenderObservable.add(()=>{\n        sphere.rotation.y += 0.0001*scene.getEngine().getDeltaTime();\n        sphere.rotation.x += 0.0001*scene.getEngine().getDeltaTime();\n    }) */\n\n    setInfo(\"\");\n    return scene;\n  };\n\n  engine = createDefaultEngine();\n  if (!engine) throw 'engine should not be null.';\n  scene = createScene();\n  ;\n  sceneToRender = scene;\n  engine.runRenderLoop(function () {\n    if (sceneToRender) {\n      sceneToRender.render();\n    }\n  }); // Resize\n\n  window.addEventListener(\"resize\", function () {\n    engine.resize();\n  });\n}; // var request = $.ajax({\n//     url: \"/data_3D_sample.json\",\n//     method: \"GET\",\n//     dataType: \"json\"\n// });\n// request.done(function( data ) {\n//     genScene(data)\n// });\n// request.fail(function( jqXHR, textStatus ) {\n//     alert( \"Request failed: \" + textStatus );\n// });\n\n\naxios__WEBPACK_IMPORTED_MODULE_3___default.a.get('data_3D_sample.json').then(function (response) {\n  genScene(response.data);\n})[\"catch\"](function (error) {\n  console.log(error);\n})[\"finally\"](function () {// always executed\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });