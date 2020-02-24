const createPartitions = (scene, groupCount, partitionCountPerGroup, initialX, initialZ) => {
    const partitionGroup = new THREE.Group();
    for (let i = 0; i < groupCount; i++) {
        let groupZ = i * 30 + initialZ;
        for (let j = 0; j < partitionCountPerGroup; j++) {
            const x = 10 * (j % groupCount) + initialX;
            let z = groupZ;

            if (Math.floor(j / partitionCountPerGroup) === 1) {
                z += 6;
            }

            const partition = createPartition(x, 5, z);
            partitionGroup.add(partition);
        }
    }
    scene.add(partitionGroup);
};

function createPartition(x, y, z) {
    let partition = addPartitionBottom();
    partition = addDividerToBottom(partition);
    partition = addTopToDivider(partition);
    partition.position.x = x;
    partition.position.y = y;
    partition.position.z = z;

    return partition;
}

function addPartitionBottom() {
    const partitionBottomGeometry = createBoxGeometry(10, 10, 1);
    const partitionMaterial = new THREE.MeshLambertMaterial({color: 0xBBBBBB});
    const partitionBottom = new THREE.Mesh(partitionBottomGeometry, partitionMaterial);
    partitionBottomGeometry.castShadow = true;

    return partitionBottom;
}

function addDividerToBottom(partitionBottom) {
    const partitionDividerGeometry = createBoxGeometry(10, .3, 1);
    const partitionDividerMaterial = new THREE.MeshLambertMaterial({color: 0x333333});
    const partitionDivider = new THREE.Mesh(partitionDividerGeometry, partitionDividerMaterial);
    partitionDivider.castShadow = true;
    partitionBottom.add(partitionDivider);
    partitionDivider.position.y = 5.15;

    return {partitionBottom, partitionDivider};
}

function addTopToDivider({partitionBottom, partitionDivider}) {
    const partitionTopGeometry = createBoxGeometry(10, 2, 1);
    const partitionMaterial = new THREE.MeshLambertMaterial({color: 0xBBBBBB});
    const partitionTop = new THREE.Mesh(partitionTopGeometry, partitionMaterial);
    partitionTop.castShadow = true;
    partitionDivider.add(partitionTop);
    partitionTop.position.y = 1.15;

    return partitionBottom;
}
