const createFloor = (officeWidth, officeHeight) => {
    return new Promise(resolve => {
        const floorGeometry = new THREE.BoxGeometry(officeWidth, .2, officeHeight);
        const floorMaterial = new THREE.MeshStandardMaterial({color: 0xc5c5c5});
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.castShadow = true;

        resolve(floor)
    })
};

const createCeiling = (officeWidth, officeHeight) => {
    return new Promise(resolve => {
        const ceilingGeometry = new THREE.BoxGeometry(officeWidth, .2, officeHeight);
        const ceilingMaterial = new THREE.MeshBasicMaterial({color: 0xc5c5c5});
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.position.y = 2.6;
        // const pointLight = new THREE.PointLight(0xFFFFFF, 1, officeWidth);
        // ceiling.add(pointLight);
        const light = new THREE.AmbientLight( 0xFFFFFF, .8 ); // soft white light
        ceiling.add( light )
        resolve(ceiling);
    });

};

const createCeilingLights = (ceiling, groupCount, initialX, initialZ) => {
    return new Promise(async resolve => {
        const ceilingCountPerGroup = 4;
        const lightGroup = new THREE.Object3D();
        const ceilingLight = await createCeilingLight();
        const ceilingLightGroup = new THREE.Group();

        for (let j = 0; j < ceilingCountPerGroup; j++) {
            const x = 4.2 * (j % ceilingCountPerGroup) + initialX;
            const newCeilingLight = ceilingLight.clone();
            newCeilingLight.position.set(x, -.1, 0);
            ceilingLightGroup.add(newCeilingLight);
        }

        for (let i = 0; i < groupCount; i++) {
            let z = i * 3 + initialZ;
            const newCeilingLights = ceilingLightGroup.clone();
            newCeilingLights.position.setZ(z);
            lightGroup.add(newCeilingLights);
        }

        const ceilingAmbientLight = new THREE.AmbientLight(0xFFFFFF, .5);
        lightGroup.castShadow = true;
        lightGroup.add(ceilingAmbientLight);
        ceiling.add(lightGroup);

        document.getElementById('toggleLight').addEventListener('click', () => {
            const isVisible = lightGroup.visible;
            lightGroup.visible = !isVisible;
        });

        resolve();
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
    return new Promise(resolve => {console.log(1)
        const ceilingLightGeometry = new THREE.BoxGeometry(1.2, .1, .3);
        const ceilingLightMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
        const ceilingLight = new THREE.Mesh(ceilingLightGeometry, ceilingLightMaterial);
        // const pointLight = new THREE.PointLight(0xFFFFFF, 1, 3);
        // ceilingLight.add(pointLight);

        mesh.light = ceilingLight;
        resolve(ceilingLight)
    })
};