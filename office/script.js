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

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, .6);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xFFFFFF, .5);
    spotLight.position.set(100,270,250);
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 5120;
    // spotLight.shadow.mapSize.height = 5120;
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
    createChair(floor);
    createWall(floor);
    // TODO. 의자
    // TODO. 이름표
    // TODO. 나뭇잎 캐노피

    const boy = makeHuman('#FF00BF', false, renderer, floor, camera, true);
    const girl = makeHuman('#BC5E00', true, renderer, floor, camera, false);
    girl.position.x = 5;

    scene.add(boy);
    scene.add(girl);

    // const clock = new THREE.Clock;

    new function renderScene() {
        renderer.render(scene,camera);
        // TODO. 캐릭터 걸어다니도록
        // boy.position.z -= clock.getDelta();
        requestAnimationFrame(renderScene);
    };
}
window.onload = init();