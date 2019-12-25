function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xFFFFFF);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 0;
    camera.lookAt(scene.position);

    const ambiLight = new THREE.AmbientLight(0x464646);
    scene.add(ambiLight);

    const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
    spotLight.position.set(100,270,250);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 5120;
    spotLight.shadow.mapSize.height = 5120;

    scene.add(spotLight);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    createTables(scene);
    createPillars(scene);
    createPartitions(scene);
    createMonitors(scene);

    new function renderScene() {
        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);
    };
}
window.onload = init();

