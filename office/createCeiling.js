const createFloor = (officeWidth, officeHeight) => {
    const floorGeometry = new THREE.BoxGeometry(officeWidth, 2, officeHeight);
    const floorMaterial = new THREE.MeshStandardMaterial({color: 0xc5c5c5});
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.castShadow = true;

    return floor
};

function createCeiling(scene, officeWidth, officeHeight, groupCount, initialX, initialZ) {
    const ceilingGeometry = new THREE.BoxGeometry(officeWidth, 2, officeHeight);
    const ceilingMaterial = new THREE.MeshBasicMaterial({color: 0xc5c5c5});
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.y = 26;
    scene.add(ceiling);
    createCeilingLights(ceiling, groupCount, initialX, initialZ);
}

function createCeilingLights(ceiling, groupCount, initialX, initialZ) {
    const ceilingCountPerGroup = 4;
    const lightGroup = new THREE.Object3D();

    for (let i = 0; i < groupCount; i++) {
        let z = i * 30 + initialZ;

        for (let j = 0; j < ceilingCountPerGroup; j++) {
            const x = 24 * (j % ceilingCountPerGroup) + initialX;
            const ceilingLight = createCeilingLight(x, -1, z);
            lightGroup.add(ceilingLight);
        }
    }
    const ceilingAmbientLight = new THREE.AmbientLight(0xFFFFFF, .5);
    lightGroup.castShadow = true;
    lightGroup.add(ceilingAmbientLight);
    ceiling.add(lightGroup);
    document.getElementById('toggleLight').addEventListener('click', () => {
        const isVisible = lightGroup.visible;
        lightGroup.visible = !isVisible;
    });
}

function createCeilingLight(x, y, z) {
    const ceilingLightGeometry = new THREE.BoxGeometry(6, 1, 3);
    const ceilingLightMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    const ceilingLight = new THREE.Mesh(ceilingLightGeometry, ceilingLightMaterial);
    ceilingLight.position.set(x, y, z);

    const pointLight = new THREE.PointLight(0xFFFFFF, 1, 30);
    pointLight.position.set(5, -10, -3);
    // pointLight.castShadow = true;
    ceilingLight.add(pointLight);

    return ceilingLight;
}