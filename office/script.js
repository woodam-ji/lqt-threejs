function init() {
    const scene = new THREE.Scene();
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const PI = Math.PI;
    const cos = Math.cos;
    const sin = Math.sin;

    const camera = new THREE.PerspectiveCamera(80, innerWidth/innerHeight, 0.1, 1000);
    camera.position.x = 70;
    camera.position.y = 20;
    camera.position.z = -40;
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xFFFFFF);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, .1);
    scene.add(ambientLight);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    const groupCount = 17;
    const userCountPerGroup = 8;
    const partitionCountPerGroup = userCountPerGroup / 2;

    const officeWidth = partitionCountPerGroup * 11;
    const officeHeight = groupCount * 11;

    const floor = createFloor(officeWidth, officeHeight);
    createTables(floor, groupCount, userCountPerGroup);
    createPillars(floor);
    createPartitions(floor, groupCount, partitionCountPerGroup);
    createMonitors(floor, groupCount, userCountPerGroup);
    createCeiling(scene, officeWidth, officeHeight);
    createWall(floor);
    createHumans(renderer, floor, camera, groupCount, userCountPerGroup);
    scene.add(floor);

    // TODO. 타이머 (light)

    new function renderScene() {
        renderer.render(scene,camera);
        // TODO. 캐릭터 걸어다니도록
        // boy.position.z -= clock.getDelta();
        requestAnimationFrame(renderScene);
    };
}
window.onload = init();