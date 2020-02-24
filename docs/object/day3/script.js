function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 25;
    camera.lookAt(scene.position);

    const ambiLight = new THREE.AmbientLight(0x464646);
    scene.add(ambiLight);

    const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
    spotLight.position.set(135,-40,150);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 5120;
    spotLight.shadow.mapSize.height = 5120;

    scene.add(spotLight);

    const pillar1 = createPillar(0xFFFFFF, 'R10');
    scene.add(pillar1);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    var renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);
    };

    function createBoxGeometry(width, height, depth, ...args) {
        return new THREE.BoxGeometry(width, height, depth, ...args );
    }

    function createPillar(color, pillarString) {
        const pillarGeometry = createBoxGeometry(5, 16,5);
        const pillarMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);

        const pillarTopGeometry = createBoxGeometry(5, 4,5);
        const pillarTopMaterial = new THREE.MeshLambertMaterial({color});
        const pillarTop = new THREE.Mesh(pillarTopGeometry, pillarTopMaterial);

        pillarTop.position.y = 10;
        pillar.add(pillarTop);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = "Bold 13px Arial";
        context.fillStyle = "rgba(0,0,0,1)";
        context.fillText(pillarString, 0, 60);

        // canvas contents will be used for a texture
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        const material = new THREE.MeshBasicMaterial({ map: texture });
        material.transparent = true;

        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 10),
            material
        );
        mesh.position.set(23, 9, 2.6);
        pillar.add(mesh);

        return pillar;
    }

}
window.onload = init();

