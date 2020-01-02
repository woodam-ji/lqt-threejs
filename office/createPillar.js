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
    const pillarTextList = ['R10', 'R09', 'R08', 'R07', 'R06'];
    pillarTextList.forEach((pillarText, index) => {
        const pillar = createPillar(pillarText);
        pillar.position.x = -5;
        pillar.position.y = 13;
        pillar.position.z = 60 + (index * -30);
        scene.add(pillar);
    });
};