const createPartitions = (scene, groupCount, partitionCountPerGroup, initialX, initialZ) => {
    return new Promise(async resolve => {
        const partitionGroup = new THREE.Group();
        const partitionMesh = await createPartition(0, .5, 0);
        for (let i = 0; i < groupCount; i++) {
            let groupZ = i * 3 + initialZ;
            for (let j = 0; j < partitionCountPerGroup; j++) {
                const x = (j % groupCount) + initialX;
                let z = groupZ;

                if (Math.floor(j / partitionCountPerGroup) === 1) {
                    z += .6;
                }

                const partition = partitionMesh.clone();
                partition.position.set(x, .5, z);
                partitionGroup.add(partition);
            }
        }

        scene.add(partitionGroup);
        resolve();
    })
};

const createPartition = (x, y, z) => {
    return new Promise(async resolve => {
        let partition = await addPartitionBottom();
        partition = await addDividerToBottom(partition);
        partition = await addTopToDivider(partition);
        partition.position.x = x;
        partition.position.y = y;
        partition.position.z = z;

        resolve(partition)
    });
};

const addPartitionBottom = () => {
    return new Promise(async resolve => {
        const partitionBottomGeometry = await createBoxGeometry(1, 1, .1);
        const partitionMaterial = new THREE.MeshLambertMaterial({color: 0xBBBBBB});
        const partitionBottom = new THREE.Mesh(partitionBottomGeometry, partitionMaterial);
        partitionBottomGeometry.castShadow = true;

        resolve(partitionBottom);
    })
};

const addDividerToBottom = partitionBottom => {
    return new Promise(async resolve => {
        const partitionDividerGeometry = await createBoxGeometry(1, .03, .1);
        const partitionDividerMaterial = new THREE.MeshLambertMaterial({color: 0x333333});
        const partitionDivider = new THREE.Mesh(partitionDividerGeometry, partitionDividerMaterial);
        partitionDivider.castShadow = true;
        partitionBottom.add(partitionDivider);
        partitionDivider.position.y = .515;

        resolve({partitionBottom, partitionDivider})
    })
};

const addTopToDivider = ({partitionBottom, partitionDivider}) => {
    return new Promise(async resolve => {
        const partitionTopGeometry = await createBoxGeometry(1, .2, .1);
        const partitionMaterial = new THREE.MeshLambertMaterial({color: 0xBBBBBB});
        const partitionTop = new THREE.Mesh(partitionTopGeometry, partitionMaterial);
        partitionTop.castShadow = true;
        partitionDivider.add(partitionTop);
        partitionTop.position.y = .115;

        resolve(partitionBottom)
    });
};
