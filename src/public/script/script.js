async function init() {
    const scene = new THREE.Scene();
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const rendererStats  = new ThreeEx.RendererStats();
    const camera = new THREE.PerspectiveCamera(80, innerWidth / innerHeight, 0.1, 1000);
    camera.position.x = 7;
    camera.position.y = 2;
    camera.position.z = 1;
    camera.lookAt(scene.position);


    scene.background = new THREE.Color('skyblue');
    // scene.overrideMaterial = new THREE.MeshBasicMaterial( { color: 'green' } );
    // camera.far = 100000;
    camera.updateProjectionMatrix();


    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xFFFFFF);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, .1);
    scene.add(ambientLight);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.update();

    rendererStats.domElement.style.position = 'absolute';
    rendererStats.domElement.style.left = '0px';
    rendererStats.domElement.style.bottom = '0px';
    document.body.appendChild( rendererStats.domElement );
    new function renderScene() {
        renderer.render(scene, camera);
        rendererStats.update(renderer);
        // TODO. 캐릭터 걸어다니도록
        // boy.position.z -= clock.getDelta();
        requestAnimationFrame(renderScene);
    };

    const office = await makeOffice(scene, renderer, camera);
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


}

const makeOffice = async (scene, renderer, camera) => {
    // 5F
    const groupCount = 17;
    const userCountPerGroup = 8;
    const partitionCountPerGroup = userCountPerGroup / 2;

    const secondRowUserCountPerGroup = 6;
    const secondRowPartitionCountPerGroup = secondRowUserCountPerGroup / 2;

    const thirdColumnUserCountPerGroup = 6;
    const thirdColumnPartitionCountPerGroup = thirdColumnUserCountPerGroup / 2;

    const officeWidth = (partitionCountPerGroup + secondRowPartitionCountPerGroup + thirdColumnPartitionCountPerGroup) * 1 + 3 + 5;
    const officeHeight = groupCount * 3;

    const initialX = officeWidth / 2 * -1;
    const initialZ = officeHeight / 2 * -1;

    const floor = await createFloor(officeWidth, officeHeight);
    const fifthFloorHumanInfo = makeFifthFloorData();
    await createCeiling(scene, officeWidth, officeHeight, groupCount, initialX + 3, initialZ + 1.25);

    await createPillars(floor, fifthFloorHumanInfo.firstColumnPillarList, initialX + 5.5, initialZ + 1.25);
    await createTables(floor, groupCount, userCountPerGroup, initialX + 1.5, initialZ + 1);
    await createPartitions(floor, groupCount, partitionCountPerGroup, initialX + 1.5, initialZ + 1.25);
    await createMonitors(floor, fifthFloorHumanInfo.firstColumn, groupCount, userCountPerGroup, initialX + 1.5, initialZ+ 1.0);
    await createWalls(floor, Math.floor(groupCount/2), initialX + .8, initialZ + 4.5);
    await createHumans(renderer, floor, camera, fifthFloorHumanInfo.firstColumn, groupCount, userCountPerGroup, initialX+1.5, initialZ+.5);

    // 두번째 열
    // await createPillars(floor, fifthFloorHumanInfo.secondColumnPillarList, initialX + 5.5, initialZ + 1.25);
    await createTables(floor, groupCount, secondRowUserCountPerGroup, initialX + 6.5, initialZ + 1);
    await createPartitions(floor, groupCount, secondRowPartitionCountPerGroup, initialX + 6.5, initialZ + 1.25);
    await createMonitors(floor, fifthFloorHumanInfo.secondColumn, groupCount, secondRowUserCountPerGroup, initialX + 6.5, initialZ+ 1);
    await createHumans(renderer, floor, camera, fifthFloorHumanInfo.secondColumn, groupCount, secondRowUserCountPerGroup, initialX+6.5, initialZ+.5);
    //
    // // 세번째 열
    const thirdColumnGroupCount = 10;
    await createPillars(floor, fifthFloorHumanInfo.secondColumnPillarList, initialX + 10.5, initialZ + 1.25);
    await createTables(floor, thirdColumnGroupCount, secondRowUserCountPerGroup, initialX + 14.5, initialZ + 2.5);
    await createPartitions(floor, thirdColumnGroupCount, secondRowPartitionCountPerGroup, initialX + 14.5, initialZ + 2.8);
    await createMonitors(floor, fifthFloorHumanInfo.thirdColumn, thirdColumnGroupCount, secondRowUserCountPerGroup, initialX + 14.5, initialZ+ 2.5);
    await createHumans(renderer, floor, camera, fifthFloorHumanInfo.thirdColumn, thirdColumnGroupCount, secondRowUserCountPerGroup, initialX+14.5, initialZ+2);
    return floor;
};
window.onload = (async function() {
    await init();
});