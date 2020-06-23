const addMonitorBottom = () => {
    return new Promise(async resolve => {
        const monitorBottomGeometry = await createBoxGeometry(.3, .05, .2);
        const monitorMaterial = new THREE.MeshLambertMaterial({color: 0x555555});
        const monitorBottom = new THREE.Mesh(monitorBottomGeometry, monitorMaterial);

        resolve(monitorBottom);
    })
};

const addMonitorMiddleToBottom = (monitorBottom) => {
    return new Promise(async resolve => {
        const monitorMiddleGeometry = await createBoxGeometry(.07, .3, .07);
        const monitorMaterial = new THREE.MeshLambertMaterial({color: 0x333333});
        const monitorMiddle = new THREE.Mesh(monitorMiddleGeometry, monitorMaterial);
        monitorBottom.add(monitorMiddle);
        monitorMiddle.position.y = .1;
        monitorMiddle.position.z = .05;

        resolve({monitorBottom, monitorMiddle});
    })
};

const addTopToMiddle = ({monitorBottom, monitorMiddle}) => {
    return new Promise(async resolve => {
        const monitorTopGeometry = await createBoxGeometry(.6, .4, .05);
        const monitorMaterial = new THREE.MeshLambertMaterial({color: 0x333333});
        const monitorTop = new THREE.Mesh(monitorTopGeometry, monitorMaterial);

        monitorMiddle.add(monitorTop);
        monitorTop.position.y = .3;
        monitorMiddle.position.z = -.05;

        resolve({monitorBottom, monitorTop});
    })
};

const addDisplayToTop = ({monitorBottom, monitorTop}) => {
    return new Promise(async resolve => {
        const monitorDisplayGeometry = await createBoxGeometry(.5, .35, .03);
        const loader = new THREE.TextureLoader();
        const displayMaterial = new THREE.MeshLambertMaterial({map: loader.load('https://t1.daumcdn.net/cfile/tistory/24E61F335966F29A15')});
        const monitorDisplay = new THREE.Mesh(monitorDisplayGeometry, displayMaterial);

        monitorTop.add(monitorDisplay);
        monitorDisplay.position.z = .013;

        resolve(monitorBottom);
    })
};

const createMonitor = () => {
    return new Promise(async resolve => {
        let monitor = await addMonitorBottom();
        monitor = await addMonitorMiddleToBottom(monitor);
        monitor = await addTopToMiddle(monitor);
        monitor = await addDisplayToTop(monitor);
        monitor.position.set(0, .55, 0);
        monitor.rotation.y = Math.PI;
        mesh.monitor = monitor;
        resolve(monitor)
    })
};

const createMonitors = (scene, humanInfos, groupCount, userCountPerGroup, initialX, initialZ) => {
    return new Promise(async resolve => {
        const oneSideMaxCount = userCountPerGroup / 2;
        const monitorGroup = new THREE.Group();
        let humanCount = 0;
        for (let i = 0; i < groupCount; i++) {
            let groupZ = i * 3 + initialZ;

            for (let j = 0; j < userCountPerGroup; j++) {
                const humanInfo = humanInfos[humanCount] ? humanInfos[humanCount] : {};
                const x = (j % oneSideMaxCount) + initialX;
                let z = groupZ;

                if (Math.floor(j / oneSideMaxCount) === 1) {
                    z += .6;
                }

                if (!!humanInfo.name) {
                    const monitor = await createMonitor(x, .55, z, humanInfo.name);
                    if (j < oneSideMaxCount) monitor.rotation.y = Math.PI;
                    monitorGroup.add(monitor);
                }
                humanCount++;
            }
        }
        // monitorGroup.castShadow = true;
        // monitorGroup.receiveShadow = true;
        scene.add(monitorGroup);
        resolve();
    })
};

const createMonitor2 = ({group, info}) => {
    return new Promise(async resolve => {
        if (!!info.name) {
            if (!mesh.monitor) await createMonitor();
            if (!mesh.nameTag) await createNameTag(name);
            const monitor = mesh.monitor.clone();

            //TODO. nameTag
            // const nameTag = mesh.nameTag.clone();
            // monitor.add(nameTag);
            group.add(monitor);
        }

        resolve({group, info});
    });
};

const createNameTag = (name = '') => {
    return new Promise(resolve => {
        const loader = new THREE.SVGLoader();

        const nameTag = loader.load('/public/assets/nameTag.svg', async (data) => {
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
                        depth: .4,
                        bevelEnabled: false
                    });
                    const mesh = new THREE.Mesh(geometry, material);
                    group.add(mesh);
                }
            }

            await createName(group, name);
            group.scale.set(.002, .002, .002);
            group.position.x = -.9;
            group.position.y = .1;
            group.position.z = -.03;
            mesh.nameTag = group;
            return group;
            // scene.add(group);
        });

        resolve(nameTag);
    })
};

const createName = (scene, text) => {
    return new Promise(resolve => {
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
        resolve();
    });
};