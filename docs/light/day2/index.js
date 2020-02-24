function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.x = 2;
    camera.position.y = 4;
    camera.position.z = 5;
    controls.update();

    const scene = new THREE.Scene();

    const lightColor = 0xFFFFFF;
    const intensity = 1;

    const ambientLight = new THREE.AmbientLight(lightColor, .5);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(lightColor, intensity);
    light.position.set( -40, 60, -10 ); 			//default; light shining from top
    light.castShadow = true;

    light.shadow.mapSize.width = 5120;  // default
    light.shadow.mapSize.height = 5120; // default
    light.shadow.camera.near = 50;    // default
    light.shadow.camera.far = 100;     // default
    scene.add(light);
    // var helper = new THREE.CameraHelper( light.shadow.camera );
    // scene.add( helper );

    const hemisphereLight = new THREE.HemisphereLight(lightColor, .3);
    // HemisphereLight( skyColor : Integer, groundColor : Integer, intensity : Float )
    // scene.add(hemisphereLight);
    // * 더 자세하게

    // const pointLight = new THREE.PointLight(lightColor, 1, 10);
    // pointLight.position.set(10, -100, 10);
    // PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
    // scene.add(pointLight);

    // const rectAreaLight = new THREE.RectAreaLight(lightColor, 1, 10, 10);
    // rectAreaLight.position.set( 5, 5, 0 );
    // rectAreaLight.lookAt( 0, 0, 0 );
    // scene.add( rectAreaLight );

    // rectLightHelper = new THREE.RectAreaLightHelper( rectAreaLight );
    // rectAreaLight.add( rectLightHelper );
    // RectAreaLight( color : Integer, intensity : Float, width : Float, height : Float )
    // scene.add(rectAreaLight);

    // const spotLight = new THREE.SpotLight(lightColor, 1);
    // spotLight.position.set(-40, 60, -10);
    // spotLight.castShadow = true;
    // scene.add(spotLight);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, material, x) {
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        // cube.rotation.x = 10;
        // cube.rotation.y = 10;
        cube.castShadow = true;
        return cube;
    }

    const meshPhongMaterial = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const meshLambertMaterial = new THREE.MeshLambertMaterial({color: 0x8844aa});
    const meshBasicMaterial = new THREE.MeshStandardMaterial({color: 0xaa8844});

    const cubes = [
        makeInstance(geometry, meshPhongMaterial,  0),
        makeInstance(geometry, meshLambertMaterial, -2),
        makeInstance(geometry, meshBasicMaterial,  2),
    ];

    // const floorGeometry = new THREE.BoxGeometry(10, 0, 10);
    // const floorMesh = new THREE.MeshLambertMaterial({color: 0xe2b240});
    // const floor = new THREE.Mesh(floorGeometry, floorMesh);
    // scene.add(floor);
    // floor.receiveShadow = true;
    // floor.position.y = -1;
    // floor.rotation.x = -40;
    // floor.rotation.y = 0;
    // ground.rotation.z = 10;

    var planeGeometry = new THREE.PlaneGeometry(60,30,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xCCCCCC});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0.5;
    scene.add(plane);

    function render(time) {
        time *= 0.001;  // convert time to seconds

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            // cube.rotation.x = rot;
            // cube.rotation.y = rot;
        });
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    canvas.appendChild(renderer.domElement);
}
// https://discoverthreejs.com/book/first-steps/camera-controls/
main();
