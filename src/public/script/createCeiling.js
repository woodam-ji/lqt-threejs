const createFloor = (officeWidth, officeHeight) => {
    return new Promise(resolve => {
        const floorGeometry = new THREE.BoxGeometry(officeWidth, .2, officeHeight);
        const floorMaterial = new THREE.MeshStandardMaterial({color: 0xc5c5c5});
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.castShadow = true;
        floor.receiveShadow = true;

        resolve(floor)
    })
};

const createCeiling = (officeWidth, officeHeight) => {
    return new Promise(resolve => {
        const ceilingGeometry = new THREE.BoxGeometry(officeWidth, .2, officeHeight);
        const ceilingMaterial = new THREE.MeshBasicMaterial({color: 0xc5c5c5});
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.position.y = 2.6;
        resolve(ceiling);
    });
};

const createCeilingLight = ({lightsInfo, lightGroup}) => {
    return new Promise(resolve => {
        if (!mesh.light) makeLightMesh();
        const light = mesh.light.clone();
        lightGroup.add(light);

        resolve({lightsInfo, lightGroup})
    })
};

const makeLightMesh = () => {
    return new Promise(resolve => {
        const ceilingLightGeometry = new THREE.BoxGeometry(1.2, .1, .3);
        const ceilingLightMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
        const ceilingLight = new THREE.Mesh(ceilingLightGeometry, ceilingLightMaterial);
        // const pointLight = new THREE.PointLight(0xFFFFFF, 1, 3);
        // ceilingLight.add(pointLight);

        mesh.light = ceilingLight;
        resolve(ceilingLight)
    })
};