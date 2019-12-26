function createCeiling(scene) {
    const floorGeometry = new THREE.BoxGeometry( 50, 2, 170 );
    const floorMaterial = new THREE.MeshLambertMaterial( {color: 0xc5c5c5} );
    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.position.z = 75;
    floor.position.y = -5;
    scene.add( floor );
    const ceilingGeometry = new THREE.BoxGeometry( 50, 2, 170 );
    const ceilingMaterial = new THREE.MeshBasicMaterial( {color: 0xc5c5c5} );
    const ceiling = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
    ceiling.position.z = 75;
    ceiling.position.y = 20;
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
    document.getElementById('toggleLight').addEventListener('click', () => {
        updateCeilingLight(ceilingLights);
    });
}
function updateCeilingLight(ceilingLights) {
    ceilingLights.forEach(ceilingLight => {
        const isVisible = ceilingLight.visible;
        ceilingLight.visible = !isVisible;
    })
}
function createCeilingLight (x, y, z) {
    const ceilingLightGeometry = new THREE.BoxGeometry(6,1,3);
    const ceilingLightMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    const ceilingLight = new THREE.Mesh( ceilingLightGeometry, ceilingLightMaterial );
    ceilingLight.position.set(x, y, z);
    const pointLight = new THREE.PointLight( 0xffffff, 1, 20 );
    pointLight.position.set( 5, -10, -3);
    ceilingLight.add( pointLight );
    return ceilingLight;
}