function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0x77FFFF);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const partitionBottomGeometry = createBoxGeometry( 20, 10, 1 );
    const partitionMaterial = new THREE.MeshLambertMaterial( { color: 0xBBBBBB } );
    const partitionBottom = new THREE.Mesh(partitionBottomGeometry, partitionMaterial);
    partitionBottomGeometry.castShadow = true;
    scene.add(partitionBottom);

    const partitionDividerGeometry = createBoxGeometry(20, .3, 1);
    const partitionDividerMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
    const partitionDivider = new THREE.Mesh(partitionDividerGeometry, partitionDividerMaterial);
    partitionDivider.castShadow = true;
    partitionBottom.add(partitionDivider);
    partitionDivider.position.y = 5.15;

    const partitionTopGeometry = createBoxGeometry( 20, 2, 1 );
    const partitionTop = new THREE.Mesh(partitionTopGeometry, partitionMaterial);
    partitionTop.castShadow = true;
    partitionDivider.add(partitionTop);
    partitionTop.position.y = 1.15;

    /**
     * CAMERA
     */

    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);

    const controls = new THREE.OrbitControls(camera, renderer.domElement); // 카메라와 마우스 상호작용을 위해 OrbitControls를 설정합니다.
    controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
    controls.zoomSpeed = 1.5; // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
    controls.panSpeed = 100.0; // 패닝 속도 입니다. 기본값(Float)은 1입니다.

    /**
     * LIGHT
     */

    const ambiLight = new THREE.AmbientLight(0xFFFFFF, .3);
    scene.add(ambiLight);

    const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
    spotLight.position.set(30, 10, 150);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 5120;
    spotLight.shadow.mapSize.height = 5120;

    scene.add(spotLight);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);

    var renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);
        // scene.rotation.x += 0.01;
        // scene.rotation.y += 0.01;
        // scene.rotation.z += 0.01;
        renderer.render(scene,camera);
    };

    function createBoxGeometry(width, height, depth, ...args) {
        return new THREE.BoxGeometry(width, height, depth, ...args );
    }

}
window.onload = init();

