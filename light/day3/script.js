function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    camera.position.x = 0;
    camera.position.y = -20;
    camera.position.z = 10;
    camera.lookAt(scene.position);

    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    const ambiLight = new THREE.AmbientLight(0x464646);
    scene.add(ambiLight);

    const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
    spotLight.position.set(10, 5, 100);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 5120;
    spotLight.shadow.mapSize.height = 5120;

    scene.add(spotLight);

    var width = 20;
    var height = 10;
    var intensity = 10;
    var rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight.position.set( 0, 0, 20 );
    rectLight.lookAt( 0, 0, 0 );
    scene.add( rectLight );
    // no shadow support
    // Only MeshStandardMaterial and MeshPhysicalMaterial are supported.

    rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
    rectLight.add( rectLightHelper );

    var planeGeometry = new THREE.PlaneGeometry(60,30,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0x9e9e9e});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // plane.rotation.x = -0.5 * Math.PI;
    plane.position.z = -5;
    scene.add(plane);

    //Let's make a sphere
    const tableGeometry = createBoxGeometry( 10, 5, 0.5 );
    const table = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        0, 0, 0
    );
    const table2 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        10, 0, 0
    );
    const table3 = createTable(
        tableGeometry,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVh0h0YesiweR4FTsNvg0BJwnCWoxxEK-yiy6VWnOb7Jxo_hM9vA&s",
        -10, 0, 0
    );

    scene.add(table);
    scene.add(table2);
    scene.add(table3);

    document.getElementById("threejs_scene").appendChild(renderer.domElement);

    document.getElementById('toggleLight').addEventListener('click', () => {
        const currentIntensity = rectLight.intensity;
        const updateIntensity = currentIntensity > 0 ? 0 : intensity;
        const updateColor = currentIntensity > 0 ? 0x000000 : 0xffffff;
        // ambiLight.intensity = intensity;
        // rectLight = updateIntensity;
        // rectLight.color = '#000';
        // rectLight
        console.log(rectLight.color)
        rectLight.color = new THREE.Color(updateColor);
        rectLight.intensity = updateIntensity;

    });

    var renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);
        controls.update();
        renderer.render(scene,camera);
    };

    // var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    //
    // var textureLoader = new THREE.TextureLoader();
    //
    // var textureFlare0 = textureLoader.load( "./lensflare0.png" );
    // var textureFlare1 = textureLoader.load( "./lensflare2.png" );
    // var textureFlare2 = textureLoader.load( "./lensflare3.png" );
    //
    // var lensflare = new THREE.Lensflare();
    //
    // lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 0 ) );
    // lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 0 ) );
    // lensflare.addElement( new THREE.LensflareElement( textureFlare2, 60, 0.6 ) );
    //
    // light.add( lensflare );

    function createTextureMesh(geometry, imageFile) {
        /**
         * material에 이미지를 load해서 사용가능 (texture)
         */
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshStandardMaterial({map: loader.load(imageFile)});

        return new THREE.Mesh(geometry, material);
    }

    function createBoxGeometry(width, height, depth, ...args) {
        return new THREE.BoxGeometry(width, height, depth, ...args );
    }

    function createTable(tableGeometry, image, x, y, z) {
        const table = createTextureMesh(tableGeometry, image);
        table.position.x = x;
        table.position.y = y;
        table.position.z = z;
        table.castShadow = true;

        return addLegToTable(table);
    }

    function createTableLegMesh(tableLegGeometry, tableLegMaterial, x, y, z) {
        const tableLegMesh = new THREE.Mesh(tableLegGeometry, tableLegMaterial);
        tableLegMesh.position.x = x;
        tableLegMesh.position.y = y;
        tableLegMesh.position.z = z;
        return tableLegMesh
    }

    function addLegToTable(tableMesh) {
        const tableLegGeometry = createBoxGeometry( 1, 1, 5 );
        const tableLegMaterial = new THREE.MeshStandardMaterial({color: 0xD0AF7A});

        const tableLeg1 = createTableLegMesh(tableLegGeometry, tableLegMaterial, 4.5, -2, -2.7);
        const tableLeg2 = createTableLegMesh(tableLegGeometry, tableLegMaterial, -4.5, -2, -2.7);
        const tableLeg3 = createTableLegMesh(tableLegGeometry, tableLegMaterial, -4.5, 2, -2.7);
        const tableLeg4 = createTableLegMesh(tableLegGeometry, tableLegMaterial, 4.5, 2, -2.7);

        tableMesh.add(tableLeg1);
        tableMesh.add(tableLeg2);
        tableMesh.add(tableLeg3);
        tableMesh.add(tableLeg4);

        return tableMesh;
    }
}
window.onload = init();

