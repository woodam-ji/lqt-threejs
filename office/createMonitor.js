const addMonitorBottom = () => {
    const monitorBottomGeometry = createBoxGeometry(3, .5, 2);
    const monitorMaterial = new THREE.MeshLambertMaterial( { color: 0x555555 } );
    const monitorBottom = new THREE.Mesh(monitorBottomGeometry, monitorMaterial);
    monitorBottom.castShadow = true;

    return monitorBottom;
};

const addMonitorMiddleToBottom = (monitorBottom, count) => {
    const monitorMiddleGeometry = createBoxGeometry(.7, 3, .7);
    const monitorMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
    const monitorMiddle = new THREE.Mesh(monitorMiddleGeometry, monitorMaterial);
    monitorMiddle.castShadow = true;
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
    monitorTop.castShadow = true;
    
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
    const loader = new THREE.TextureLoader();
    const displayMaterial = new THREE.MeshLambertMaterial( {map: loader.load('https://t1.daumcdn.net/cfile/tistory/24E61F335966F29A15')} );
    const monitorDisplay = new THREE.Mesh(monitorDisplayGeometry, displayMaterial);

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
    createNameTag(monitor, count);
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
                x = -10;
            }

            if (Math.floor(j / 3) === 1) {
                z += 6;
            }

            const monitor = createMonitor(x, 5.5, z, j);
            monitor.castShadow = true;
            monitor.receiveShadow = false;

            scene.add(monitor);
        }
    }
};

const createNameTag = (scene, count) => {
    const loader = new THREE.SVGLoader();

    loader.load('./assets/nameTag.svg', (data) => {
        const paths = data.paths;
        const group = new THREE.Group();

        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const material = new THREE.MeshLambertMaterial({
                color: '#ff3478',
                side: THREE.DoubleSide,
                // depthWrite: false, // 투명하게 해주는 옵션
            });
            const shapes = path.toShapes(true);

            for (let j = 0; j < shapes.length; j++) {
                const shape = shapes[j];
                // const geometry = new THREE.ShapeBufferGeometry( shape );
                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 4,
                    bevelEnabled: false
                });
                const mesh = new THREE.Mesh(geometry, material);
                group.add(mesh);
            }
        }

        createName(group,'이인희');
        group.scale.set(0.02, 0.02, 0.02);
        group.position.x = -9;
        group.position.y = 1;
        group.position.z = count > 3 ? 0.3 : -0.3;
        scene.add(group);
    });
};

const createName = (scene, text) => {
    const loader = new THREE.FontLoader();

    loader.load( 'assets/font.typeface.json', function ( font ) {

        const geometry = new THREE.TextGeometry( text, {
            font: font,
            size: 30,
            height: 5,
            // curveSegments: 12,
            // bevelEnabled: true,
            // bevelThickness: 10,
            // bevelSize: 8,
            // bevelOffset: 0,
            // bevelSegments: 5
        } );
        const material = new THREE.MeshLambertMaterial({
            color: '#000'
        });
        const name = new THREE.Mesh(geometry, material);
        name.position.x = 267;
        name.position.y = 280;
        name.position.z = 0;
        scene.add(name)
    } );
};