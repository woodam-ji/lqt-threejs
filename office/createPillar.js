const createPillar = pillarText => {
    const pillarGeometry = createBoxGeometry(5, 25,5);
    const pillarMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = "Bold 13px Arial";
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillText(pillarText, 0, 60);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    material.transparent = true;

    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 10),
        material
    );
    mesh.position.set(23, 9, 2.6);
    pillar.add(mesh);

    return pillar;
};

const createPillars = scene => {
    const pillarTextList = ['R04', 'R03', 'R02', 'R01'];
    pillarTextList.forEach((pillarText, index) => {
        const pillar = createPillar(pillarText);
        pillar.position.x = -5;
        pillar.position.y = 13;
        pillar.position.z = 60 + (index * -30);
        scene.add(pillar);
    });
};

const createWall = scene => {
    const wallGeometry = new THREE.BoxGeometry(2, 25, 25);
    const wallMaterials = [
        new THREE.MeshLambertMaterial({color:0xffffff, transparent:false, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color:0xffffff, transparent:false, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color:0xe55b81, transparent:false, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color:0xe55b81, transparent:false, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color:0xe55b81, transparent:false, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshLambertMaterial({color:0xe55b81, transparent:false, opacity:0.8, side: THREE.DoubleSide}),
    ];
    // [front, back, top,  bottom, left, right]
    const wall = new THREE.Mesh(wallGeometry, wallMaterials);
    wall.position.x = 3;
    wall.position.y = 13;
    wall.position.z = -70;
    scene.add(wall);
};