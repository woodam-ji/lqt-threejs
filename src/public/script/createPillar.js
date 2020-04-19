const createPillar = pillarText => {
    return new Promise(async resolve => {
        const pillarGeometry = await createBoxGeometry(.5, 2.5, .5);
        const pillarMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = "Bold 13px Arial";
        context.fillStyle = "rgba(0,0,0,1)";
        context.fillText(pillarText, 0, 6);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        const material = new THREE.MeshBasicMaterial({map: texture});
        material.transparent = true;

        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 1),
            material
        );
        mesh.position.set(2.3, .9, .26);
        pillar.add(mesh);

        resolve(pillar);
    })
};

const createPillars = (scene, pillarList, x, initialZ) => {
    return new Promise( async resolve => {
        await asyncForEach(pillarList, async (pillarText, index) => {
            const pillar = await createPillar(pillarText);
            pillar.position.x = x;
            pillar.position.y = 1.3;
            pillar.position.z = initialZ + (index * 6);
            scene.add(pillar);
        });
        resolve();
    });
};

const createWalls = (scene, count, x, z) => {
    return new Promise(async resolve => {
        const wallGroup = new THREE.Group();

        for (let wallCount = 0; wallCount < count; wallCount++) {
            const wall = await createWall();
            wall.position.x = x;
            wall.position.y = 1.3;
            wall.position.z = (wallCount * 6) + z;
            wallGroup.add(wall);
        }
        scene.add(wallGroup);
        resolve();
    })
};

const createWall = () => {
    return new Promise(resolve => {
        const wallGeometry = new THREE.BoxGeometry(.2, 2.5, 2);
        const wallMaterials = [
            new THREE.MeshLambertMaterial({color: 0xffffff, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0xffffff, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0xe55b81, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0xe55b81, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0xe55b81, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0xe55b81, transparent: false, opacity: 0.8, side: THREE.DoubleSide}),
        ];
        const mesh = new THREE.Mesh(wallGeometry, wallMaterials);
        resolve(mesh);
    })
};