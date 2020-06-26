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

const makeMonitorMesh = () => {
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

const createMonitor = ({group, info}) => {
    return new Promise(async resolve => {
        if (!!info.name) {
            if (!mesh.monitor) await makeMonitorMesh();
            if (!mesh.nameTag) await createNameTag();
            if (!loaders.font) loaders.font = await loadFont('/public/assets/font.typeface.json');
            const monitor = mesh.monitor.clone();
            const nameTag = mesh.nameTag.clone();
            const name = await createName(info.name);
            nameTag.add(name);
            monitor.add(nameTag);
            group.add(monitor);
        }

        resolve({group, info});
    });
};

function loadSVG(url) {
    return new Promise(resolve => {
        new THREE.SVGLoader().load(url, resolve);
    });
}

function loadFont(url) {
    return new Promise(resolve => {
        new THREE.FontLoader().load(url, resolve);
    });
}

const createNameTag = () => {
    return new Promise(async resolve => {
        const nameTag = await loadSVG('/public/assets/nameTag.svg');
        const paths = nameTag.paths;
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

        group.scale.set(.002, .002, .002);
        group.position.x = -.9;
        group.position.y = .1;
        group.position.z = .001;
        mesh.nameTag = group;
        resolve(nameTag);
    })
};

const nameMaterial = new THREE.MeshLambertMaterial({
    color: '#fff'
});
const createName = (text = '') => {
    return new Promise(async resolve => {
        const nameGeometry = new THREE.TextBufferGeometry(
            text,
            {
                font: loaders.font,
                bevelEnabled: false,
                curveSegments: 8,
                bevelThickness: 1,
                bevelSize: 0,
                size: 26,
                height: 1
            }
        );
        const name = new THREE.Mesh(nameGeometry, nameMaterial);
        name.position.x = text.length > 2 ? 273 : 292;
        name.position.y = 282;
        name.position.z = 1;
        resolve(name);
    });
};