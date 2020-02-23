function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    //Let's make a sphere
    const tableGeometry = createBoxGeometry( 10, 5, 0.5 );
    const table = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        0, 0, 0
    );
    const table2 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        20, 0, 0
    );
    const table3 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        -20, 0, 0
    );

    scene.add(table);
    scene.add(table2);
    scene.add(table3);

    /**
     * CAMERA
     */

    camera.position.x = 0;
    camera.position.y = -100;
    camera.position.z = 100;
    camera.lookAt(scene.position);

    const left = document.getElementById('left');
    const center= document.getElementById('center');
    const right = document.getElementById('right');

    left.onclick = () => {
        camera.position.x = table3.position.x;
        camera.position.y = table3.position.y - 10;
        camera.position.z = table3.position.z + 5;
        camera.updateProjectionMatrix();
    }

    table3.addEventListener('click', () => {
        console.log('table3!!!');
    })

    center.onclick = () => {
        camera.position.x = table.position.x;
        camera.position.y = table.position.y - 10;
        camera.position.z = table.position.z + 5;
        camera.updateProjectionMatrix();
    }

    right.onclick = () => {
        camera.position.x = table2.position.x;
        camera.position.y = table2.position.y - 10;
        camera.position.z = table2.position.z + 5;
        camera.updateProjectionMatrix();
    }

    const controls = new THREE.OrbitControls(camera, renderer.domElement); // 카메라와 마우스 상호작용을 위해 OrbitControls를 설정합니다.
    controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
    controls.zoomSpeed = 1.5; // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
    controls.panSpeed = 100.0; // 패닝 속도 입니다. 기본값(Float)은 1입니다.

    const ambiLight = new THREE.AmbientLight(0x464646);
    scene.add(ambiLight);

    const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
    spotLight.position.set(-20,0,150);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 5120;
    spotLight.shadow.mapSize.height = 5120;

    scene.add(spotLight);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);

    var renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);
        // scene.rotation.x += 0.01;
        // scene.rotation.y += 0.01;
        // scene.rotation.z += 0.01;
        renderer.render(scene,camera);
    };

    function createTextureMesh(geometry, imageFile) {
        /**
         * material에 이미지를 load해서 사용가능 (texture)
         */
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshLambertMaterial({map: loader.load(imageFile)});

        return new THREE.Mesh(geometry, material);
    }

    function createBoxGeometry(width, height, depth, ...args) {
        return new THREE.BoxGeometry(width, height, depth, ...args );
    }

    function createTable(tableGeometry, image, x, y, z) {
        const table = createTextureMesh(tableGeometry, image);
        table.position.x = x;
        table.position.y = y;
        table.position.z = z;
        table.castShadow = true;

        const tableLegGeometry = createBoxGeometry( 1, 1, 5 );
        const tableLegMaterial = new THREE.MeshLambertMaterial({color: 0xD0AF7A});
        addLegToTable(table, tableLegGeometry, tableLegMaterial);

        return table;
    }

    function createTableLegMesh(tableMesh, tableLegGeometry, tableLegMaterial, x, y, z) {
        const tableLegMesh = new THREE.Mesh(tableLegGeometry, tableLegMaterial);
        tableLegMesh.position.x = x;
        tableLegMesh.position.y = y;
        tableLegMesh.position.z = z;
        return tableLegMesh
    }

    function addLegToTable(tableMesh, tableLegGeometry, tableLegMaterial) {
        const tableLeg1 = createTableLegMesh(tableMesh, tableLegGeometry, tableLegMaterial, 4.5, -2, -2.7);
        const tableLeg2 = createTableLegMesh(tableMesh, tableLegGeometry, tableLegMaterial, -4.5, -2, -2.7);
        const tableLeg3 = createTableLegMesh(tableMesh, tableLegGeometry, tableLegMaterial, -4.5, 2, -2.7);
        const tableLeg4 = createTableLegMesh(tableMesh, tableLegGeometry, tableLegMaterial, 4.5, 2, -2.7);

        tableMesh.add(tableLeg1);
        tableMesh.add(tableLeg2);
        tableMesh.add(tableLeg3);
        tableMesh.add(tableLeg4);
    }
}
window.onload = init();

