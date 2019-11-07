const createTextureMesh = (geometry, imageFile) => {
    /**
     * material에 이미지를 load해서 사용가능 (texture)
     */
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshLambertMaterial({map: loader.load(imageFile)});

    return new THREE.Mesh(geometry, material);
};

const createBoxGeometry = (width, height, depth, ...args) => {
    return new THREE.BoxGeometry(width, height, depth, ...args );
};

const createTable = (tableGeometry, image, x, y, z) => {
    const table = createTextureMesh(tableGeometry, image);
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
    table.castShadow = true;

    return addLegToTable(table);
};

const createTableLegMesh = (tableLegGeometry, tableLegMaterial, x, y, z) => {
    const tableLegMesh = new THREE.Mesh(tableLegGeometry, tableLegMaterial);
    tableLegMesh.position.x = x;
    tableLegMesh.position.y = y;
    tableLegMesh.position.z = z;
    return tableLegMesh
};

const addLegToTable = (tableMesh) => {
    const tableLegGeometry = createBoxGeometry( 0.5, 5, 0.5 );
    const tableLegMaterial = new THREE.MeshPhysicalMaterial({color: '#444242'});

    const tableLeg1 = createTableLegMesh(tableLegGeometry, tableLegMaterial, 4.5, -2.4, -2.2);
    const tableLeg2 = createTableLegMesh(tableLegGeometry, tableLegMaterial, -4.5, -2.4, -2.2);
    const tableLeg3 = createTableLegMesh(tableLegGeometry, tableLegMaterial, -4.5, -2.4, 2.2);
    const tableLeg4 = createTableLegMesh(tableLegGeometry, tableLegMaterial, 4.5, -2.4, 2.2);

    tableMesh.add(tableLeg1);
    tableMesh.add(tableLeg2);
    tableMesh.add(tableLeg3);
    tableMesh.add(tableLeg4);

    return tableMesh;
};

const createTables = scene => {
    const tableGeometry = createBoxGeometry( 10, 0.5, 5 );
    const tableGroupCount = 6;
    const tableCountPerGroup = 6;
    for (let i = 0; i < tableGroupCount; i++) {
        let initialZ = i * 30;
        for(let j=0; j < tableCountPerGroup; j++) {
            let x = 0;
            let z = initialZ;
            if (j % 3 === 1) {
                x = 10;
            } else if (j % 3 === 2) {
                x = -10
            }

            if (Math.floor(j / 3) === 1) {
                z += 6;
            }
            const table = createTable(
                tableGeometry,
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
                x, 0, z
            );

            scene.add(table);
        }
    }
};
