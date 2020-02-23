function init() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-20, 20, 20);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 5120;
    spotLight.shadow.mapSize.height = 5120;

    scene.add(spotLight);

    //Let's make a sphere
    var headGeometry = new THREE.SphereGeometry(4, 32, 32);
    var headMeterial = new THREE.MeshBasicMaterial({
        color: 0xDD9b26
    });
    var head = new THREE.Mesh(headGeometry, headMeterial);
    head.position.x = 0;
    head.position.y = 0;
    head.position.z = 0;
    head.castShadow = true;

    var earGeometry = new THREE.SphereGeometry(1, 32, 32);
    var earMeterial = new THREE.MeshBasicMaterial({
        color: 0xDD9b26
    });
    var ear1 = new THREE.Mesh(earGeometry, earMeterial);
    var ear2 = new THREE.Mesh(earGeometry, earMeterial);
    ear1.position.x = 2.5;
    ear1.position.y = 2;
    ear1.position.z = 2.5;
    head.add(ear1);

    ear2.position.x = -2.5;
    ear2.position.y = 2;
    ear2.position.z = 2.5;
    head.add(ear2);

    var eyeGeometry = new THREE.SphereGeometry(0.25, 64, 64);
    var eyeMeterial = new THREE.MeshBasicMaterial({
        color: 0x00000
    });
    var eye1 = new THREE.Mesh(eyeGeometry, eyeMeterial);
    var eye2 = new THREE.Mesh(eyeGeometry, eyeMeterial);
    eye1.position.x = -1.2;
    eye1.position.y = -1.3;
    eye1.position.z = 3.45;
    head.add(eye1);

    eye2.position.x = 1.2;
    eye2.position.y = -1.3;
    eye2.position.z = 3.45;
    head.add(eye2);

    var noseGeometry = new THREE.SphereGeometry(0.5, 64, 64);
    var noseMeterial = new THREE.MeshBasicMaterial({
        color: '#ffffff'
    });
    var nose1 = new THREE.Mesh(noseGeometry, noseMeterial);
    var nose2 = new THREE.Mesh(noseGeometry, noseMeterial);
    nose1.position.x = -0.45;
    nose1.position.y = -2.5;
    nose1.position.z = 3;
    head.add(nose1);

    nose2.position.x = 0.45;
    nose2.position.y = -2.5;
    nose2.position.z = 3;
    head.add(nose2);

    var nosePointGeometry = new THREE.SphereGeometry(0.3, 64, 64);
    var nosePointMeterial = new THREE.MeshBasicMaterial({
        color: 0x00000
    });
    var nosePoint = new THREE.Mesh(nosePointGeometry, nosePointMeterial);
    nosePoint.position.x = 0;
    nosePoint.position.y = -2.5;
    nosePoint.position.z = 3.5;
    head.add(nosePoint);

    var eyebrow1 = getEyeBrow(0.7, -0.75);
    head.add(eyebrow1);

    var eyebrow2 = getEyeBrow(-2, -0.75);
    head.add(eyebrow2);

    scene.add(head);


    document.getElementById("threejs_scene").appendChild(renderer.domElement);

    /* 
        CAMERA
    */

    camera.position.x = 0;
    camera.position.y = -10;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    // const flyControls = new THREE.FlyControls(camera, renderer.domElement);
    // console.log('fly', flyControls);

    const controls = new THREE.OrbitControls(camera, renderer.domElement); // 카메라와 마우스 상호작용을 위해 OrbitControls를 설정합니다.
    controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
    controls.zoomSpeed = 1.5; // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
    controls.panSpeed = 1.0; // 패닝 속도 입니다. 기본값(Float)은 1입니다.
    // controls.keys = {
    //     LEFT: 37, //left arrow
    //     UP: 38, // up arrow
    //     RIGHT: 39, // right arrow
    //     BOTTOM: 40 // down arrow
    // }
    // controls.keyPanSpeed = 20;
``
    // document.addEventListener('keydown', (e) => {
    //     const rotSpeed = 0.1;
    //     const x = camera.position.x;
    //     const y = camera.position.y;
    //     const z = camera.position.z;
    //     if (e.key === 'ArrowUp') {
    //         // camera.position.y -= 0.2;
    //         // camera.position.z -= 0.5;
    //         // camera.rotation.x += 0.2;
    //         camera.position.y = y * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
    //         // camera.position.z = z * Math.cos(rotSpeed) + y * Math.sin(rotSpeed);
    //         // camera.lookAt(scene.position);
    //         // controls.update();
    //         // camera.updateProjectionMatrix();
    //     }
    //     if (e.key === 'ArrowDown') {
    //         // camera.position.y += 0.2;
    //         // camera.position.z += 0.5;
    //         // camera.rotation.x -= 0.2;
    //         camera.position.y = y * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
    //         // camera.position.z = z * Math.cos(rotSpeed) - y * Math.sin(rotSpeed);
    //         // camera.lookAt(scene.position);
    //         // controls.update();
    //         // camera.updateProjectionMatrix();
    //     }
    //     if (e.key === 'ArrowLeft') {
    //         // camera.position.x += 0.2;
    //         camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
    //         camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
    //         // camera.lookAt(scene.position);
    //         // controls.update();
    //         // camera.updateProjectionMatrix();
    //     }
    //     if (e.key === 'ArrowRight') {
    //         // camera.position.x -= 0.2;
    //         camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
    //         camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
    //         // camera.lookAt(scene.position);
    //         // controls.update();
    //         // camera.updateProjectionMatrix();
    //     }
    // }, false);

    var renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);
        // cube animation
        // head.rotation.x += 0.01;
        // head.rotation.y += 0.01;
        // head.rotation.z += 0.01;

        renderer.render(scene, camera);
    };
}

window.onload = init();

function getEyeBrow(x, y) {
    var eyebrow = new THREE.Shape();
    eyebrow.moveTo(x, y);

    // 0.7, -0.75
    // eyebrow1.bezierCurveTo(0.7,-0.75, 1.4,-0.75, 2,-0.75);
    // eyebrow1.bezierCurveTo(2,-0.75, 2.2,-0.9, 2,-1.05);
    // eyebrow1.bezierCurveTo(2,-1.05, 1.4,-1.05, 0.7,-1.05);
    // eyebrow1.bezierCurveTo(0.7,-1.05, 0.5,-0.9, 0.7,-0.75);
    eyebrow.bezierCurveTo(x, y, x + 0.65, y, x + 1.3, y);
    eyebrow.bezierCurveTo(x + 1.3, y, x + 1.5, y - 0.15, x + 1.3, y - 0.3);
    eyebrow.bezierCurveTo(x + 1.3, y - 0.3, x + 0.65, y - 0.3, x, y - 0.3);
    eyebrow.bezierCurveTo(x, y - 0.3, x - 0.2, y - 0.15, x, y);

    var geometry = new THREE.ShapeGeometry(eyebrow);
    var material = new THREE.MeshBasicMaterial({
        color: '#000000'
    });
    var eyebrowMesh = new THREE.Mesh(geometry, material);
    eyebrowMesh.position.z = 4;

    return eyebrowMesh;
}