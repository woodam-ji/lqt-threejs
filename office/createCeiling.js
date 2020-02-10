const createFloor = (officeWidth, officeHeight) => {
    const floorGeometry = new THREE.BoxGeometry( officeWidth, 2, officeHeight );
    const floorMaterial = new THREE.MeshStandardMaterial( {color: 0xc5c5c5} );
    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.castShadow = true;

    return floor
};

function createCeiling(scene, officeWidth, officeHeight) {
    const ceilingGeometry = new THREE.BoxGeometry( officeWidth, 2, officeHeight );
    const ceilingMaterial = new THREE.MeshBasicMaterial( {color: 0xc5c5c5} );
    const ceiling = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
    ceiling.position.y = 26;
    scene.add( ceiling );
    createCeilingLights(ceiling);
}

function createCeilingLights(ceiling) {
    const ceilingCountPerGroup = 2;
    const ceilingGroupCount = 6;
    const ceilingLights = [];
    for (let i = 0; i < ceilingGroupCount; i++) {
        let initialZ = i * -30 + 78;
        for(let j=0; j < ceilingCountPerGroup; j++) {
            let x = -5;
            let z = initialZ;
            if (j % 2 === 1) {
                x = 5;
            }
            const ceilingLight = createCeilingLight(x, -1, z);
            ceilingLights.push(ceilingLight);
            ceiling.add(ceilingLight);
        }
    }
    const ceilingAmbientLight = new THREE.AmbientLight(0xFFFFFF, .5);
    ceiling.add(ceilingAmbientLight);
    document.getElementById('toggleLight').addEventListener('click', () => {
        updateCeilingLight(ceilingLights);
        updateAmbientLight(ceilingAmbientLight);
    });
}
function updateCeilingLight(ceilingLights) {
    ceilingLights.forEach(ceilingLight => {
        const isVisible = ceilingLight.visible;
        ceilingLight.visible = !isVisible;
    })
}
const updateAmbientLight = ambientLight => {
    const isVisible = ambientLight.visible;
    ambientLight.visible = !isVisible;
};
function createCeilingLight (x, y, z) {
    const ceilingLightGeometry = new THREE.BoxGeometry(6,1,3);
    const ceilingLightMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    const ceilingLight = new THREE.Mesh( ceilingLightGeometry, ceilingLightMaterial );
    ceilingLight.position.set(x, y, z);

    const pointLight = new THREE.PointLight( 0xffffff, 1, 30 );
    pointLight.position.set( 5, -10, -3);
    pointLight.castShadow = true;
    ceilingLight.add( pointLight );

    return ceilingLight;
}