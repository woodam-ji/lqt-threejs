const createTextureMesh = (geometry, imageFile) => {
    return new Promise(resolve => {
        /**
         * material에 이미지를 load해서 사용가능 (texture)
         */
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshStandardMaterial({map: loader.load(imageFile)});

        resolve(new THREE.Mesh(geometry, material));
    })
};

const createBoxGeometry = (width, height, depth, ...args) => {
    return new Promise(resolve => {
        resolve(new THREE.BoxGeometry(width, height, depth, ...args));
    })
};

const createTable = (tableGeometry, image, x, y, z) => {
    return new Promise(async resolve => {
        const table = await createTextureMesh(tableGeometry, image);
        table.position.x = x;
        table.position.y = y;
        table.position.z = z;

        resolve(addLegToTable(table));
    })
};

const createTableLegMesh = (tableLegGeometry, tableLegMaterial, x, y, z) => {
    return new Promise(resolve => {
        const tableLegMesh = new THREE.Mesh(tableLegGeometry, tableLegMaterial);
        tableLegMesh.position.x = x;
        tableLegMesh.position.y = y;
        tableLegMesh.position.z = z;
        resolve(tableLegMesh);
    })
};

const addLegToTable = (tableMesh) => {
    return new Promise(async resolve => {
        const tableLegGeometry = await createBoxGeometry(0.05, .5, 0.05);
        const tableLegMaterial = new THREE.MeshStandardMaterial({color: '#444242'});

        const tableLeg1 = await createTableLegMesh(tableLegGeometry, tableLegMaterial, 0.45, -.24, -.22);
        const tableLeg2 = await createTableLegMesh(tableLegGeometry, tableLegMaterial, -.45, -.24, -.22);
        const tableLeg3 = await createTableLegMesh(tableLegGeometry, tableLegMaterial, -.45, -.24, .22);
        const tableLeg4 = await createTableLegMesh(tableLegGeometry, tableLegMaterial, .45, -.24, .22);

        tableMesh.add(tableLeg1);
        tableMesh.add(tableLeg2);
        tableMesh.add(tableLeg3);
        tableMesh.add(tableLeg4);

        resolve(tableMesh);
    })
};

const createTables = (scene, groupCount, userCountPerGroup, initialX = 0, initialZ = 0) => {
    return new Promise(async resolve => {
        const tableGeometry = await createBoxGeometry(1, 0.05, .5);
        const oneSideMaxCount = userCountPerGroup / 2;
        const tableGroup = new THREE.Group();
        const tableMesh = await createTable(
            tableGeometry,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
            0, .5, 0
        );

        for (let i = 0; i < groupCount; i++) {
            const groupZ = i * 3 + initialZ;
            for (let j = 0; j < userCountPerGroup; j++) {
                const x = 1 * (j % oneSideMaxCount) + initialX;
                const isLastItem = Math.floor(j / oneSideMaxCount) === 1;
                let z = groupZ;
                if (isLastItem) z += .6;
                const table = tableMesh.clone();
                table.position.set(x, .5, z);

                tableGroup.add(table);
            }
        }
        tableGroup.receiveShadow = true;
        // table.castShadow = true;
        scene.add(tableGroup);
        resolve();
    })
};
