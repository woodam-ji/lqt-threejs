function init() {
    const scene = new THREE.Scene();
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const PI = Math.PI;
    const cos = Math.cos;
    const sin = Math.sin;

    const camera = new THREE.PerspectiveCamera(80, innerWidth / innerHeight, 0.1, 1000);
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
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();


    const office = makeOffice(scene, renderer, camera);
    scene.add(office);

    // TODO. 타이머 (light)
    // 직군별 혹은 팀별 옷 색깔 다르게
    // 불 끄러 가도록
    // 모니터 워크로그 연동


    new function renderScene() {
        renderer.render(scene, camera);
        // TODO. 캐릭터 걸어다니도록
        // boy.position.z -= clock.getDelta();
        requestAnimationFrame(renderScene);
    };
}

const makeOffice = (scene, renderer, camera) => {
    // 5F

    const groupCount = 10;
    const userCountPerGroup = 8;
    const partitionCountPerGroup = userCountPerGroup / 2;

    const secondRowUserCountPerGroup = 6;
    const secondRowPartitionCountPerGroup = secondRowUserCountPerGroup / 2;

    const officeWidth = (partitionCountPerGroup + secondRowPartitionCountPerGroup) * 10 + 20 + 10;
    const officeHeight = groupCount * 30;

    // side 10
    // table 10 X 5

    const initialX = officeWidth / 2 * -1;
    const initialZ = officeHeight / 2 * -1;

    const floor = createFloor(officeWidth, officeHeight);
    createTables(floor, groupCount, userCountPerGroup, initialX + 15, initialZ + 10);

    const fifthFloorHumanInfo = makeFifthFloorData();

    const pillarList = ['R04', 'R03', 'R02', 'R01'];
    createPillars(floor, pillarList, initialX + 5, initialZ + 12.5);
    createPartitions(floor, groupCount, partitionCountPerGroup, initialX + 15, initialZ + 12.5);
    createMonitors(floor, fifthFloorHumanInfo.firstColumn, groupCount, userCountPerGroup, initialX + 15, initialZ+ 10);
    createCeiling(scene, officeWidth, officeHeight, groupCount,initialX + 16, initialZ + 12.5);
    createWalls(floor, Math.floor(groupCount/2), initialX + 8.5, initialZ + 40);
    createHumans(renderer, floor, camera, fifthFloorHumanInfo.firstColumn, groupCount, userCountPerGroup, initialX+15, initialZ+5);


    // 두번째 열

    const pillarSecondRowList = ['', '', '', ''];
    createPillars(floor, pillarSecondRowList, initialX + 55, initialZ + 12.5);
    createTables(floor, groupCount, secondRowUserCountPerGroup, initialX + 65, initialZ + 10);
    createPartitions(floor, groupCount, secondRowPartitionCountPerGroup, initialX + 65, initialZ + 12.5);

    createMonitors(floor, fifthFloorHumanInfo.secondColumn, groupCount, secondRowUserCountPerGroup, initialX + 65, initialZ+ 10);
    createHumans(renderer, floor, camera, fifthFloorHumanInfo.secondColumn, groupCount, secondRowUserCountPerGroup, initialX+65, initialZ+5);
    return floor;
};
window.onload = init();