"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var webgi_1 = require("webgi");
require("./styles.css");
var gsap_1 = __importDefault(require("gsap"));
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
// import { AnimationOptions } from 'popmotion';
// import { MaterialExtension, ViewerApp } from 'examples/runtime/core.m';
// import { Zippable } from 'fflate';
gsap_1["default"].registerPlugin(ScrollTrigger_1.ScrollTrigger);
function setupViewer() {
    return __awaiter(this, void 0, void 0, function () {
        function setupScrollanimation() {
            var tl = gsap_1["default"].timeline();
            var sections = gsap_1["default"].utils.toArray(".panel");
            // first section
            tl
                .to(position, { x: 3.27, y: -3.84, z: -7.76, duration: 1,
                ease: "rough",
                scrollTrigger: {
                    trigger: ".second",
                    start: "top bottom",
                    end: "top top",
                    // markers: true, 
                    scrub: true,
                    immediateRender: false,
                    snap: 1 / (sections.length - 1)
                }, onUpdate: onUpdate })
                .to(".section--one--container", { xPercent: '150', opacity: 0,
                ease: "sine",
                scrollTrigger: {
                    trigger: ".second",
                    start: "top bottom",
                    end: "top center", scrub: 1
                } })
                .to(target, { x: -1.49, y: -3.84, z: 0.39, duration: 1,
                // ease: "sine",
                scrollTrigger: {
                    trigger: ".second",
                    start: "top bottom",
                    end: "top top",
                    // markers: true, 
                    scrub: true,
                    immediateRender: false
                } })
                // Last Section
                .to(position, { x: -0.42, y: -2.49, z: 7.90, duration: 1,
                ease: "rough",
                scrollTrigger: {
                    trigger: ".third",
                    start: "top bottom",
                    end: "top top",
                    // markers: true, 
                    scrub: true,
                    immediateRender: false,
                    snap: 1 / (sections.length - 1)
                }, onUpdate: onUpdate })
                .to(".section--two--container", { xPercent: '-150', opacity: 0,
                ease: "sine",
                scrollTrigger: {
                    trigger: ".third",
                    start: "top bottom",
                    end: "top top", scrub: 1
                } })
                .to(target, { x: -1.55, y: -2.49, z: 0.30, duration: 1,
                // ease: "rough",
                scrollTrigger: {
                    trigger: ".third",
                    start: "top bottom",
                    end: "top top",
                    // markers: true, 
                    scrub: true,
                    immediateRender: false
                } });
        }
        function onUpdate() {
            needsUpdate = true;
            viewer.renderer.resetShadows();
        }
        var viewer, manager, camera, position, target, needsUpdate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    viewer = new webgi_1.ViewerApp({
                        canvas: document.getElementById('webgi-canvas'),
                        useRgbm: false
                    });
                    return [4 /*yield*/, viewer.addPlugin(webgi_1.AssetManagerPlugin)];
                case 1:
                    manager = _a.sent();
                    camera = viewer.scene.activeCamera;
                    position = camera.position;
                    target = camera.target;
                    // Add plugins individually.
                    return [4 /*yield*/, viewer.addPlugin(webgi_1.GBufferPlugin)];
                case 2:
                    // Add plugins individually.
                    _a.sent();
                    return [4 /*yield*/, viewer.addPlugin(new webgi_1.ProgressivePlugin(32))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, viewer.addPlugin(new webgi_1.TonemapPlugin(!viewer.useRgbm))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, viewer.addPlugin(webgi_1.SSRPlugin)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, viewer.addPlugin(webgi_1.SSAOPlugin)
                        // await viewer.addPlugin(DiamondPlugin)
                        // await viewer.addPlugin(FrameFadePlugin)
                        // await viewer.addPlugin(GLTFAnimationPlugin)
                        // await viewer.addPlugin(GroundPlugin)
                    ];
                case 6:
                    _a.sent();
                    // await viewer.addPlugin(DiamondPlugin)
                    // await viewer.addPlugin(FrameFadePlugin)
                    // await viewer.addPlugin(GLTFAnimationPlugin)
                    // await viewer.addPlugin(GroundPlugin)
                    return [4 /*yield*/, viewer.addPlugin(webgi_1.BloomPlugin)
                        // await viewer.addPlugin(TemporalAAPlugin)
                        // await viewer.addPlugin(AnisotropyPlugin)
                        // or use this to add all main ones at once.
                    ];
                case 7:
                    // await viewer.addPlugin(DiamondPlugin)
                    // await viewer.addPlugin(FrameFadePlugin)
                    // await viewer.addPlugin(GLTFAnimationPlugin)
                    // await viewer.addPlugin(GroundPlugin)
                    _a.sent();
                    // await viewer.addPlugin(TemporalAAPlugin)
                    // await viewer.addPlugin(AnisotropyPlugin)
                    // or use this to add all main ones at once.
                    return [4 /*yield*/, (0, webgi_1.addBasePlugins)(viewer)];
                case 8:
                    // await viewer.addPlugin(TemporalAAPlugin)
                    // await viewer.addPlugin(AnisotropyPlugin)
                    // or use this to add all main ones at once.
                    _a.sent();
                    viewer.renderer.refreshPipeline();
                    return [4 /*yield*/, manager.addFromPath("./assets/torch04.glb")
                        // await viewer.scene.setEnvironment(
                        //     await manager.importer!.importSinglePath<ITexture>(
                        //         "./assets/environment.hdr"
                        //     )
                        // );
                    ];
                case 9:
                    _a.sent();
                    // await viewer.scene.setEnvironment(
                    //     await manager.importer!.importSinglePath<ITexture>(
                    //         "./assets/environment.hdr"
                    //     )
                    // );
                    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
                    setupScrollanimation();
                    needsUpdate = true;
                    viewer.addEventListener('preFrame', function () {
                        if (needsUpdate) {
                            camera.positionUpdated(true);
                            camera.targetUpdated(true);
                            needsUpdate = false;
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
setupViewer();
//# sourceMappingURL=index.js.map