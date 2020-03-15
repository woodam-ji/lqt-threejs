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
    // 불 끄러 가도록
    // 모니터 워크로그 연동

    document.getElementById('selectDepartment').addEventListener('change', (e)=>{
        const department = e.currentTarget.value;
        const updateCameraPosition = departmentPosition[department];
        if (updateCameraPosition){
            // new TWEEN.Tween( camera.position ).to( updateCameraPosition, 600 )
            //     .easing( TWEEN.Easing.Sinusoidal.EaseInOut).start();
            camera.position.set(updateCameraPosition.x, updateCameraPosition.y, updateCameraPosition.z);
            controls.update();
        }
    });

    new function renderScene() {
        renderer.render(scene, camera);
        // TODO. 캐릭터 걸어다니도록
        // boy.position.z -= clock.getDelta();
        requestAnimationFrame(renderScene);
    };
}

const makeOffice = (scene, renderer, camera) => {
    // 5F
    const groupCount = 17;
    const userCountPerGroup = 8;
    const partitionCountPerGroup = userCountPerGroup / 2;

    const secondRowUserCountPerGroup = 6;
    const secondRowPartitionCountPerGroup = secondRowUserCountPerGroup / 2;

    const thirdColumnUserCountPerGroup = 6;
    const thirdColumnPartitionCountPerGroup = thirdColumnUserCountPerGroup / 2;

    const officeWidth = (partitionCountPerGroup + secondRowPartitionCountPerGroup + thirdColumnPartitionCountPerGroup) * 10 + 30 + 50;
    const officeHeight = groupCount * 30;

    const initialX = officeWidth / 2 * -1;
    const initialZ = officeHeight / 2 * -1;

    const floor = createFloor(officeWidth, officeHeight);
    const fifthFloorHumanInfo = makeFifthFloorData();
    createCeiling(scene, officeWidth, officeHeight, groupCount,initialX + 30, initialZ + 12.5);

    createPillars(floor, fifthFloorHumanInfo.firstColumnPillarList, initialX + 5, initialZ + 12.5);
    createTables(floor, groupCount, userCountPerGroup, initialX + 15, initialZ + 10);
    createPartitions(floor, groupCount, partitionCountPerGroup, initialX + 15, initialZ + 12.5);
    createMonitors(floor, fifthFloorHumanInfo.firstColumn, groupCount, userCountPerGroup, initialX + 15, initialZ+ 10);
    createWalls(floor, Math.floor(groupCount/2), initialX + 8.5, initialZ + 45);
    createHumans(renderer, floor, camera, fifthFloorHumanInfo.firstColumn, groupCount, userCountPerGroup, initialX+15, initialZ+5);

    // 두번째 열
    createPillars(floor, fifthFloorHumanInfo.secondColumnPillarList, initialX + 55, initialZ + 12.5);
    createTables(floor, groupCount, secondRowUserCountPerGroup, initialX + 65, initialZ + 10);
    createPartitions(floor, groupCount, secondRowPartitionCountPerGroup, initialX + 65, initialZ + 12.5);
    createMonitors(floor, fifthFloorHumanInfo.secondColumn, groupCount, secondRowUserCountPerGroup, initialX + 65, initialZ+ 10);
    createHumans(renderer, floor, camera, fifthFloorHumanInfo.secondColumn, groupCount, secondRowUserCountPerGroup, initialX+65, initialZ+5);

    // 세번째 열
    const thirdColumnGroupCount = 10;
    createPillars(floor, fifthFloorHumanInfo.secondColumnPillarList, initialX + 105, initialZ + 12.5);
    createTables(floor, thirdColumnGroupCount, secondRowUserCountPerGroup, initialX + 145, initialZ + 25);
    createPartitions(floor, thirdColumnGroupCount, secondRowPartitionCountPerGroup, initialX + 145, initialZ + 28);
    createMonitors(floor, fifthFloorHumanInfo.thirdColumn, thirdColumnGroupCount, secondRowUserCountPerGroup, initialX + 145, initialZ+ 25);
    createHumans(renderer, floor, camera, fifthFloorHumanInfo.thirdColumn, thirdColumnGroupCount, secondRowUserCountPerGroup, initialX+145, initialZ+20);
    return floor;
};
window.onload = init();