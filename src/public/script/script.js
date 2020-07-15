async function init() {
    const scene = new THREE.Scene();
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(80, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(-7, 2, 1);
    camera.lookAt(scene.position);
    camera.updateProjectionMatrix();
    scene.background = new THREE.Color('skyblue');

    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xFFFFFF);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;

    // const ambientLight = new THREE.AmbientLight(0xFFFFFF, .1);
    // scene.add(ambientLight);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    new function renderScene() {
        // animation();
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
    };

    const office = await makeOffice();
    scene.add(office);


    const animation = () => {
        console.log(office);
    }

    window.addEventListener('resize', function () {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }, false);
}

const loaders = {
    font: null
};

const mesh = {
    table: null,
    partition: null,
    monitor: null,
    nameTag: null,
    font: null,
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
    skirt: null,
    light: null
};

const makeOffice = async () => {
    const {go, L, map, log, deepFlat, reduce, curry} = _;
    const fourthFloor = await fourthFloorMembers();
    const fourthFloorLights = fourthFloorLightsData();
    const officeWidth = 22;
    const officeHeight = 50;
    await createCeiling(officeWidth, officeHeight);
    const floor = await createFloor(officeWidth, officeHeight);
    const ceiling = await createCeiling(officeWidth, officeHeight);

    const addLight = ({lightsInfo, lightGroup}) => {
        const x = (lightsInfo.x * -1) + (officeWidth / 2);
        let z = (lightsInfo.z * .9) - (officeHeight / 2);
        lightGroup.position.set(x, -.1, z);
        ceiling.add(lightGroup);
        return {lightsInfo, lightGroup};
    }
    const makeCeilingLight = lightsInfo => go(
        {lightsInfo, lightGroup: new THREE.Group()},
        createCeilingLight,
        addLight
    );
    go(
        fourthFloorLights,
        map(makeCeilingLight),
        reduce()
    )
    // ceiling.add(lightGroup);
    floor.add(ceiling);

    const addSeat = ({info, group}) => {
        const {x, y, z} = info.position;
        group.position.set(x, y, z);
        if (info.isReverse) group.rotation.y = Math.PI;
        floor.add(group)
        return {info, group};
    };
    const makeSeat = (info) => go(
        {info, group: new THREE.Group()},
        setPosition,
        createTable,
        createPartition,
        createMonitor,
        createHuman,
        addSeat
    );

    const setPosition = ({info, group}) => {
        const x = (info.x * -1) + (officeWidth / 2);
        let z = (info.z * .9) - (officeHeight / 2);
        if (info.isReverse) z -= .35;
        const position = {x, y: 0, z};
        return {info: {...info, position}, group};
    };

    console.time('floor');
    await go(
        fourthFloor,
        L.filter(_ => _.name !== undefined),
        map(makeSeat),
    );
    console.timeEnd('floor');

    return floor;
};

window.onload = (async function () {
    await init();
});