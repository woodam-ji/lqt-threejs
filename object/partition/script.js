function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0x111111);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    /**
     * PARTITION
     */

    const partition1 = createPartition(0, 0, 0);
    const partition2 = createPartition(10, 0, 0);
    const partition3 = createPartition(20, 0, 0);

    const partition4 = createPartition(0, 0, 30);
    const partition5 = createPartition(10, 0, 30);
    const partition6 = createPartition(20, 0, 30);

    function createPartition(x, y, z) {
        let partition = addPartitionBottom();
        partition = addDividerToBottom(partition);
        partition = addTopToDivider(partition);
        partition.position.x = x;
        partition.position.y = y;
        partition.position.z = z;

        scene.add(partition);
    }

    function addPartitionBottom() {
        const partitionBottomGeometry = createBoxGeometry( 10, 10, 1 );
        const partitionMaterial = new THREE.MeshLambertMaterial( { color: 0xBBBBBB } );
        const partitionBottom = new THREE.Mesh(partitionBottomGeometry, partitionMaterial);
        partitionBottomGeometry.castShadow = true;

        return partitionBottom;
    }

    function addDividerToBottom(partitionBottom) {
        const partitionDividerGeometry = createBoxGeometry(10, .3, 1);
        const partitionDividerMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
        const partitionDivider = new THREE.Mesh(partitionDividerGeometry, partitionDividerMaterial);
        partitionDivider.castShadow = true;
        partitionBottom.add(partitionDivider);
        partitionDivider.position.y = 5.15;

        return {partitionBottom, partitionDivider};
    }

    function addTopToDivider({partitionBottom, partitionDivider}) {
        const partitionTopGeometry = createBoxGeometry( 10, 2, 1 );
        const partitionMaterial = new THREE.MeshLambertMaterial( { color: 0xBBBBBB } );
        const partitionTop = new THREE.Mesh(partitionTopGeometry, partitionMaterial);
        partitionTop.castShadow = true;
        partitionDivider.add(partitionTop);
        partitionTop.position.y = 1.15;

        return partitionBottom;
    }

    /**
     * CAMERA
     */

    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);

    const controls = new THREE.OrbitControls(camera, renderer.domElement); // 카메라와 마우스 상호작용을 위해 OrbitControls를 설정합니다.
    controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
    controls.zoomSpeed = 1.5; // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
    controls.panSpeed = 100.0; // 패닝 속도 입니다. 기본값(Float)은 1입니다.

    /**
     * TABLE
     */

    const tableGeometry = createBoxGeometry( 10, 5, .45 );
    const table = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        0, 0.2, 3
    );
    const table2 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        10, 0.2, 3
    );

    const table3 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        20, 0.2, 3
    );

    const table4 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        0, 0.2, 27
    );

    const table5 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        10, 0.2, 27
    );

    const table6 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        20, 0.2, 27
    );

    table.rotateX(4.715);
    table2.rotateX(4.715);
    table3.rotateX(4.715);
    table4.rotateX(4.715);
    table5.rotateX(4.715);
    table6.rotateX(4.715);

    scene.add(table);
    scene.add(table2);
    scene.add(table3);
    scene.add(table4);
    scene.add(table5);
    scene.add(table6);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);

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

        return addLegToTable(table);
    }

    function createTableLegMesh(tableLegGeometry, tableLegMaterial, x, y, z) {
        const tableLegMesh = new THREE.Mesh(tableLegGeometry, tableLegMaterial);
        tableLegMesh.position.x = x;
        tableLegMesh.position.y = y;
        tableLegMesh.position.z = z;
        return tableLegMesh
    }

    function addLegToTable(tableMesh) {
        const tableLegGeometry = createBoxGeometry( 1, 1, 5 );
        const tableLegMaterial = new THREE.MeshLambertMaterial({color: 0xD0AF7A});

        const tableLeg1 = createTableLegMesh(tableLegGeometry, tableLegMaterial, 4.5, -2, -2.7);
        const tableLeg2 = createTableLegMesh(tableLegGeometry, tableLegMaterial, -4.5, -2, -2.7);
        const tableLeg3 = createTableLegMesh(tableLegGeometry, tableLegMaterial, -4.5, 2, -2.7);
        const tableLeg4 = createTableLegMesh(tableLegGeometry, tableLegMaterial, 4.5, 2, -2.7);

        tableMesh.add(tableLeg1);
        tableMesh.add(tableLeg2);
        tableMesh.add(tableLeg3);
        tableMesh.add(tableLeg4);

        return tableMesh;
    }

    /**
     * LIGHT
     */

    const ambiLight = new THREE.AmbientLight(0xFFFFFF, .3);
    scene.add(ambiLight);

    const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
    spotLight.position.set(30, 10, 150);
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

    function createBoxGeometry(width, height, depth, ...args) {
        return new THREE.BoxGeometry(width, height, depth, ...args );
    }

}
window.onload = init();

