import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, Mesh, MultiMaterial, StandardMaterial, Color3, SceneOptimizerOptions, HardwareScalingOptimization, SceneOptimizer } from "babylonjs";
import {interpolateSpectral} from "d3";
import * as GUI from 'babylonjs-gui';
import axios from 'axios';

const genScene = (nameData) => {
    console.log(nameData[0])

    var canvas = document.getElementById("renderCanvas");

    const info = document.getElementById("info")
    const setInfo = (text) => info.innerHTML = text


    var engine = null;
    var scene = null;
    var sceneToRender = null;
    var createDefaultEngine = function() { return new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
    var createScene = function() {
        setInfo("creating the scene")
        // Create scene
        var scene = new Scene(engine);
    
        // Create simple sphere
        const multimat = new MultiMaterial('multi', scene);

        // const colorMode = "GENDER";
        const colorMode = "TOP";

        if (colorMode === "GENDER") {
            let material1 = new StandardMaterial("sphere material", scene)
            material1.diffuseColor = new Color3(0, 0, 1);
            material1.freeze();
            multimat.subMaterials.push(material1)

            let material2 = new StandardMaterial("sphere material", scene)
            material2.diffuseColor = new Color3(1, 0, 0);
            material2.freeze();
            multimat.subMaterials.push(material2)
        }


        const boxes = []

        const colorScale = (t) => {
            const v = (t - 1900) / (2017 - 1900) 
            const rgbColor = interpolateSpectral(v)
            const [r, g, b] = rgbColor.substring(4, rgbColor.length-1 ).split(',').map(n => parseInt(n, 10) / 255)
            return new Color3(r, g, b)
        }

        setInfo("Adding the boxes")
        for (let i = 0; i < nameData.length; i ++) {
            const nameInfo = nameData[i]

            const size =  0.000 + Math.log10(nameData[i].count - 900) / 100
            
            var sphere = MeshBuilder.CreateBox("sphere", {size})
            const posX = nameInfo.x / 10 + 3
            const posY = nameInfo.y / 10 
            const posZ = nameInfo.z / 10

            sphere.position.y = posX
            sphere.position.x = posY
            sphere.position.z = posZ

            boxes.push(sphere)

            if (colorMode === "TOP") {
                let material = new StandardMaterial("sphere material", scene)
                material.diffuseColor = colorScale(nameData[i].idxmax);
                material.freeze();
                multimat.subMaterials.push(material)
            }
        }
        setInfo("Adding the collors")
        var newMesh = Mesh.MergeMeshes(boxes, true, true, undefined, true);
        newMesh.material = multimat;
        for (let i = 0; i < newMesh.subMeshes.length; i ++) {
            if (colorMode === "TOP") {
                newMesh.subMeshes[i].materialIndex = i
            } else if (colorMode === "GENDER") {
                newMesh.subMeshes[i].materialIndex = nameData[i].name.includes('(F)') ? 1 : 0
            }
        }
        newMesh.freezeWorldMatrix();

        setInfo("Adding the rest")

    
    
        // Lights and camera
        var light = new HemisphericLight("HemiLight", new Vector3(0, 1, 0), scene);
        var camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 0.1, new Vector3(0, 3, 0), scene);
        console.log(camera)
        camera.attachControl(canvas, true);
        scene.activeCamera.beta += 0.8;
    
        // Default Environment
        var environment = scene.createDefaultEnvironment({ enableGroundShadow: true, groundYBias: 1 });
        environment.setMainColor(Color3.FromHexString("#74b9ff"))
        
        var plane = MeshBuilder.CreatePlane("plane", {size: 1, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
        plane.position = new Vector3(-0.4, 4, -0.4)
        // plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);
        var panel = new GUI.StackPanel();    
        advancedTexture.addControl(panel);  
        var header = new GUI.TextBlock();
        header.text = "Color GUI";
        header.height = "50px";
        header.color = "white";
        header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        header.fontSize = "32"
        panel.addControl(header); 
        var body = new GUI.TextBlock();
        body.text = "";
        body.height = "100px";
        body.color = "white";
        body.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        body.fontSize = "24"
        panel.addControl(body); 

        // Shadows
        // var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        // shadowGenerator.useBlurExponentialShadowMap = true;
        // shadowGenerator.blurKernel = 32;
        // shadowGenerator.addShadowCaster(sphere, true);
    
        // Enable VR
        var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false, useMultiview: true});
        vrHelper.enableTeleportation({floorMeshes: [environment.ground]});

        vrHelper.raySelectionPredicate = mesh => {
            if (mesh.name === "sphere_merged" || mesh.name === "ground") {
                return true;
            }
            return false;
        };

        vrHelper.onNewMeshPicked.add(pickingInfo => {
            if (pickingInfo.pickedMesh.name === "sphere_merged") {
                plane.position = new Vector3(pickingInfo.pickedPoint.x , pickingInfo.pickedPoint.y, pickingInfo.pickedPoint.z)
                console.log(vrHelper.webVRCamera.devicePosition.clone())
                plane.lookAt(vrHelper.webVRCamera.devicePosition.clone())
                plane.rotation.y += Math.PI
                plane.rotation.x = -plane.rotation.x
                header.text = nameData[pickingInfo.subMeshId].name
                const nameInfoText = `Année de pic : ${nameData[pickingInfo.subMeshId].idxmax}\nNombre : ${nameData[pickingInfo.subMeshId].count}`
                body.text = nameInfoText
            } else {
                // plane.position = new BABYLON.Vector3(-1000, -1000, -1000)
            }
            
        });

        // vrHelper.onControllerMeshLoaded.add((webVRController)=>{
        //     console.log(webVRController)
        //     if(webVRController.hand=="right"){  
        //         const cube = BABYLON.MeshBuilder.CreateBox("box", {size: 0.2})
        //         // webVRController.mesh.setEnabled(false);
        //         webVRController.attachToMesh(box);
        //         // webVRController.mesh.setEnabled(true);
        //     }
        // });

        var ground = Mesh.CreateGround("ground", 6, 6, 2, scene);
        vrHelper.enableTeleportation({ floorMeshName: "ground", floorMeshes: [ground] });

        var options = new SceneOptimizerOptions();
        options.addOptimization(new HardwareScalingOptimization(0, 1));

        // Optimizer
        var optimizer = new SceneOptimizer(scene, options);
    
        // Runs every frame to rotate the sphere
        /* scene.onBeforeRenderObservable.add(()=>{
            sphere.rotation.y += 0.0001*scene.getEngine().getDeltaTime();
            sphere.rotation.x += 0.0001*scene.getEngine().getDeltaTime();
        }) */ 

        setInfo("")
        
        return scene;
    };
    
    engine = createDefaultEngine();
    if (!engine) throw 'engine should not be null.';
    scene = createScene();;
    sceneToRender = scene

    engine.runRenderLoop(function () {
        if (sceneToRender) {
            sceneToRender.render();
        }
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

// var request = $.ajax({
//     url: "/data_3D_sample.json",
//     method: "GET",
//     dataType: "json"
// });
    
// request.done(function( data ) {
//     genScene(data)
// });

// request.fail(function( jqXHR, textStatus ) {
//     alert( "Request failed: " + textStatus );
// });

axios.get('/data_3D_sample.json')
  .then(function (response) {
    genScene(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  