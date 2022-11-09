import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,

    addBasePlugins,
    ITexture,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./styles.css";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pane } from "tweakpane";
import { TpPluginBundle } from '@tweakpane/core';
// import { AnimationOptions } from 'popmotion';
// import { MaterialExtension, ViewerApp } from 'examples/runtime/core.m';
// import { Zippable } from 'fflate';

gsap.registerPlugin(ScrollTrigger);

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm: false,
    })

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)

    // or use this to add all main ones at once.
    await addBasePlugins(viewer)

    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/torch04.glb")

    // await viewer.scene.setEnvironment(
    //     await manager.importer!.importSinglePath<ITexture>(
    //         "./assets/environment.hdr"
    //     )
    // );

    viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})

    function setupScrollanimation(){
        const tl = gsap.timeline()

        let sections = gsap.utils.toArray(".panel");
    
        // first section
        tl
        .to(position, {x: 3.27, y: -3.84, z: -7.76, duration: 1,
            ease: "rough",
            scrollTrigger: {
                trigger: ".second", 
                start: "top bottom",
                end: "top top", 
                // markers: true, 
                scrub: true,
                immediateRender: false,
                snap: 1 / (sections.length - 1),
        }, onUpdate})

        .to(".section--one--container", { xPercent: '150', opacity: 0,
            ease: "sine",
            scrollTrigger: {
                trigger: ".second", 
                start: "top bottom",
                end: "top center", scrub: 1
        }})

        .to(target, {x: -1.49, y: -3.84, z: 0.39, duration: 1,
            // ease: "sine",
            scrollTrigger: {
                trigger: ".second", 
                start: "top bottom",
                end: "top top", 
                // markers: true, 
                scrub: true,
                immediateRender: false
        }})

        // Last Section
        .to(position, {x: -0.42, y: -2.49, z: 7.90, duration: 1,
            ease: "rough",
            scrollTrigger: {
                trigger: ".third", 
                start: "top bottom",
                end: "top top", 
                // markers: true, 
                scrub: true,
                immediateRender: false,
                snap: 1 / (sections.length - 1),
        }, onUpdate})

        .to(".section--two--container", { xPercent: '-150', opacity: 0,
            ease: "sine",
            scrollTrigger: {
                trigger: ".third", 
                start: "top bottom",
                end: "top top", scrub: 1,
        }})

        .to(target, {x: -1.55, y: -2.49, z: 0.30, duration: 1,
            // ease: "rough",
            scrollTrigger: {
                trigger: ".third", 
                start: "top bottom",
                end: "top top", 
                // markers: true, 
                scrub: true,
                immediateRender: false
        }})

    }


    setupScrollanimation()

    // WebGI Update

    let needsUpdate = true;

    function onUpdate() {
        needsUpdate = true
        viewer.renderer.resetShadows()
    }

    viewer.addEventListener('preFrame', () => {
        if(needsUpdate){
            camera.positionUpdated(true)
            camera.targetUpdated(true)
            needsUpdate = false
        }
    })

}

setupViewer()
