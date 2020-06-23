async function init() {
    const scene = new THREE.Scene();
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(80, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(7, 2, 1);
    camera.lookAt(scene.position);
    camera.updateProjectionMatrix();
    scene.background = new THREE.Color('skyblue');

    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xFFFFFF);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, .1);
    scene.add(ambientLight);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    new function renderScene() {
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
    };

    const office = await makeOffice(scene);
    scene.add(office);

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
}

const mesh = {
    table: null,
    partition: null,
    monitor: null,
    nameTag: null,
    head: null,
    hair: null,
    eye: null,
    neck: null,
    body: null,
    arm: null,
    armShirt: null,
    hand: null,
    leg: null,
    foot: null,
    longHair: null,
    pants: null,
    skirt: null
}

const makeOffice = async (scene) => {
    const {go, L, log, map, deepFlat, reduce, curry} = _;
    const forthFloor = await makeFourthFloorInfo();

    await createCeiling(scene, 10, 10, 3, 3, 1.25);
    const floor = await createFloor(10, 10);

    const addSeat = ({info, group}) => {
        const {x, y, z} = info.position;
        group.position.set(x, y, z);
        if (info.isReverse) group.rotation.y = Math.PI;
        floor.add(group);
        return floor
    }
    const makeSeat = (info) => go(
        {info, group: new THREE.Group()},
        createTable2,
        createPartition2,
        createMonitor2,
        makeHuman2,
        addSeat
    );
    const loop = (iter, f) => iter.map((value, index) => f(value, index));
    const setPosition = (value, index) => {
        const positionZ = value.isReverse ? 1.5 * value.index : 2 * value.index + .45;
        const position = {x: 1 * index, y: 0, z: positionZ};
        return {...value, position}
    }
    console.time('floor');

    await go(
        forthFloor,
        L.map(info => loop(info, setPosition)),
        deepFlat,
        map(makeSeat),
    );
    console.timeEnd('floor')

    return floor;
}

window.onload = (async function () {
    await init();
});