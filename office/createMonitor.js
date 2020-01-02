const addMonitorBottom = () => {
    const monitorBottomGeometry = createBoxGeometry(3, .5, 2);
    const monitorMaterial = new THREE.MeshLambertMaterial( { color: 0x555555 } );
    const monitorBottom = new THREE.Mesh(monitorBottomGeometry, monitorMaterial);
    monitorBottomGeometry.castShadow = true;

    return monitorBottom;
};

const addMonitorMiddleToBottom = (monitorBottom, count) => {
    const monitorMiddleGeometry = createBoxGeometry(.7, 5, .7);
    const monitorMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
    const monitorMiddle = new THREE.Mesh(monitorMiddleGeometry, monitorMaterial);
    monitorMiddleGeometry.castShadow = true;
    monitorBottom.add(monitorMiddle);
    monitorMiddle.position.x = 0;
    monitorMiddle.position.y = 1;
    if(count < 3) {
        monitorMiddle.position.z = .5;
    } else if(count >= 3) {
        monitorMiddle.position.z = -.5;
    }

    return {monitorBottom, monitorMiddle};
}

const addTopToMiddle = ({monitorBottom, monitorMiddle}, count) => {
    const monitorTopGeometry = createBoxGeometry(6, 4, .5);
    const monitorMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
    const monitorTop = new THREE.Mesh(monitorTopGeometry, monitorMaterial);
    monitorTopGeometry.castShadow = true;
    
    monitorMiddle.add(monitorTop);
    monitorTop.position.x = 0;
    monitorTop.position.y = 3;
    if(count < 3) {
        monitorTop.position.z = -.5;
    } else if(count >= 3) {
        monitorTop.position.z = .5;
    }

    return {monitorBottom, monitorTop};
}

const addDisplayToTop = ({monitorBottom, monitorTop}, count) => {
    const monitorDisplayGeometry = createBoxGeometry(5, 3.5, .3);
    const displayMaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
    const monitorDisplay = new THREE.Mesh(monitorDisplayGeometry, displayMaterial);
    monitorDisplayGeometry.castShadow = true;
    
    monitorTop.add(monitorDisplay);
    if(count < 3) {
        monitorDisplay.position.z = -.13;
    } else if(count >= 3) {
        monitorDisplay.position.z = .13;
    }
    
    monitorDisplay.position.y = 0;

    return monitorBottom;
}

const createMonitor = (x, y, z, count) => {
    let monitor = addMonitorBottom();
    monitor = addMonitorMiddleToBottom(monitor, count);
    monitor = addTopToMiddle(monitor, count);
    monitor = addDisplayToTop(monitor, count);
    monitor.position.x = x;
    monitor.position.y = y;
    monitor.position.z = z;

    return monitor;
};

const createMonitors = (scene) => {
    const monitorCountPerGroup = 6;
    const monitorGroupCount = 6;

    for (let i = 0; i < monitorGroupCount; i++) {
        let initialZ = i * -30 + 72;
        for(let j=0; j < monitorCountPerGroup; j++) {
            let x = 0;
            let z = initialZ;
            if (j % 3 === 1) {
                x = 10;
            } else if (j % 3 === 2) {
                x = -10
            }

            if (Math.floor(j / 3) === 1) {
                z += 6;
            }

            const monitor = createMonitor(x, 5.5, z, j);
            scene.add(monitor);
        }
    }
};