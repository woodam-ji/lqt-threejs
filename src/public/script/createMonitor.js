const addMonitorBottom = () => {
    const monitorBottomGeometry = createBoxGeometry(3, .5, 2);
    const monitorMaterial = new THREE.MeshLambertMaterial({color: 0x555555});
    const monitorBottom = new THREE.Mesh(monitorBottomGeometry, monitorMaterial);
    monitorBottom.castShadow = true;

    return monitorBottom;
};

const addMonitorMiddleToBottom = (monitorBottom) => {
    const monitorMiddleGeometry = createBoxGeometry(.7, 3, .7);
    const monitorMaterial = new THREE.MeshLambertMaterial({color: 0x333333});
    const monitorMiddle = new THREE.Mesh(monitorMiddleGeometry, monitorMaterial);
    monitorMiddle.castShadow = true;
    monitorBottom.add(monitorMiddle);
    monitorMiddle.position.x = 0;
    monitorMiddle.position.y = 1;
    monitorMiddle.position.z = .5;

    return {monitorBottom, monitorMiddle};
};

const addTopToMiddle = ({monitorBottom, monitorMiddle}) => {
    const monitorTopGeometry = createBoxGeometry(6, 4, .5);
    const monitorMaterial = new THREE.MeshLambertMaterial({color: 0x333333});
    const monitorTop = new THREE.Mesh(monitorTopGeometry, monitorMaterial);
    monitorTop.castShadow = true;

    monitorMiddle.add(monitorTop);
    monitorTop.position.x = 0;
    monitorTop.position.y = 3;
    monitorMiddle.position.z = -.5;

    return {monitorBottom, monitorTop};
};

const addDisplayToTop = ({monitorBottom, monitorTop}) => {
    const monitorDisplayGeometry = createBoxGeometry(5, 3.5, .3);
    const loader = new THREE.TextureLoader();
    const displayMaterial = new THREE.MeshLambertMaterial({map: loader.load('https://t1.daumcdn.net/cfile/tistory/24E61F335966F29A15')});
    const monitorDisplay = new THREE.Mesh(monitorDisplayGeometry, displayMaterial);

    monitorTop.add(monitorDisplay);
    monitorDisplay.position.z = .13;
    monitorDisplay.position.y = 0;

    return monitorBottom;
};

const createMonitor = (x, y, z, name) => {
    let monitor = addMonitorBottom();
    monitor = addMonitorMiddleToBottom(monitor);
    monitor = addTopToMiddle(monitor);
    monitor = addDisplayToTop(monitor);
    monitor.position.x = x;
    monitor.position.y = y;
    monitor.position.z = z;
    createNameTag(monitor, name);

    return monitor;
};

const createMonitors = (scene, humanInfos, groupCount, userCountPerGroup, initialX, initialZ) => {
    const oneSideMaxCount = userCountPerGroup / 2;
    const monitorGroup = new THREE.Group();
    let humanCount = 0;
    for (let i = 0; i < groupCount; i++) {
        let groupZ = i * 30 + initialZ;

        for (let j = 0; j < userCountPerGroup; j++) {
            const humanInfo = humanInfos[humanCount] ? humanInfos[humanCount] : {};
            const x = 10 * (j % oneSideMaxCount) + initialX;
            let z = groupZ;

            if (Math.floor(j / oneSideMaxCount) === 1) {
                z += 6;
            }

            if (!!humanInfo.name){
                const monitor = createMonitor(x, 5.5, z, humanInfo.name);
                if (j < oneSideMaxCount) monitor.rotation.y = Math.PI;
                monitorGroup.add(monitor);
            }
            humanCount++;
        }
    }
    // monitorGroup.castShadow = true;
    // monitorGroup.receiveShadow = true;
    scene.add(monitorGroup);
};

const createNameTag = (scene, name = '') => {
    const loader = new THREE.SVGLoader();

    loader.load('/public/assets/nameTag.svg', (data) => {
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

        createName(group, name);
        group.scale.set(0.02, 0.02, 0.02);
        group.position.x = -9;
        group.position.y = 1;
        group.position.z = -.3;
        scene.add(group);
    });
};

const createName = (scene, text) => {
    const loader = new THREE.FontLoader();

    loader.load('/public/assets/font.typeface.json', function (font) {
        const geometry = new THREE.TextGeometry(text, {
            font: font,
            size: 26,
            height: 1,
            // curveSegments: 12,
            // bevelEnabled: true,
            // bevelThickness: 10,
            // bevelSize: 8,
            // bevelOffset: 0,
            // bevelSegments: 5
        });
        const material = new THREE.MeshLambertMaterial({
            color: '#fff'
        });
        const name = new THREE.Mesh(geometry, material);
        name.position.x = text.length > 2 ? 273 : 290;
        name.position.y = 282;
        name.position.z = 4;
        scene.add(name)
    });
};