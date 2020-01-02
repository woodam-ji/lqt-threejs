function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xFFFFFF);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    camera.position.x = 70;
    camera.position.y = 20;
    camera.position.z = -40;
    camera.lookAt(scene.position);

    const ambientLight = new THREE.AmbientLight(0x464646);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
    spotLight.position.set(100,270,250);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 5120;
    spotLight.shadow.mapSize.height = 5120;

    scene.add(spotLight);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    const floor = createFloor();
    scene.add(floor);
    createTables(floor);
    createPillars(floor);
    createPartitions(floor);
    createMonitors(floor);
    createCeiling(scene);
    const boy = makeHuman('#FF00BF', false, renderer, floor, camera, true);
    const girl = makeHuman('#BC5E00', true, renderer, floor, camera, false);
    girl.position.x = 5;

    scene.add(boy);
    scene.add(girl);

    new function renderScene() {
        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);
    };
}
window.onload = init();

