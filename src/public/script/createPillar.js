const createPillar = pillarText => {
    const pillarGeometry = createBoxGeometry(5, 25, 5);
    const pillarMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = "Bold 13px Arial";
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillText(pillarText, 0, 60);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({map: texture});
    material.transparent = true;

    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 10),
        material
    );
    mesh.position.set(23, 9, 2.6);
    pillar.add(mesh);

    return pillar;
};

const createPillars = (scene, pillarList, x, initialZ) => {
    pillarList.forEach((pillarText, index) => {
        const pillar = createPillar(pillarText);
        pillar.position.x = x;
        pillar.position.y = 13;
        pillar.position.z = initialZ + (index * 60);
        scene.add(pillar);
    });
};

const createWalls = (scene, count, x, z) => {
    const wallGroup = new THREE.Group();

    for (let wallCount = 0; wallCount < count; wallCount++) {
        const wall = createWall();
        wall.position.x = x;
        wall.position.y = 13;
        wall.position.z = (wallCount * 60) + z;
        wallGroup.add(wall);
    }
    scene.add(wallGroup);
};

const createWall = () => {
    const wallGeometry = new THREE.BoxGeometry(2, 25, 25);
    const wallMaterials = [
        new THREE.MeshLambertMaterial({color: 0xffffff, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color: 0xffffff, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color: 0xe55b81, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color: 0xe55b81, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color: 0xe55b81, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color: 0xe55b81, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
    ];

    return new THREE.Mesh(wallGeometry, wallMaterials);
};