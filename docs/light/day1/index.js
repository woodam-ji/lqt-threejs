function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 10;

    const scene = new THREE.Scene();

    // light
    const lightColor = 0xFFFFFF;
    const intensity = 1;

    const ambientLight = new THREE.AmbientLight(lightColor, .3);
    // scene 의 전역에 빛을 비춰줌. 이 빛은 방향이 없기 때문에 그림자를 그릴 수 없음.
    // scene.add(ambientLight);

    const light = new THREE.DirectionalLight(lightColor, intensity);
    // 특정 방향으로 발산되는 빛. 이 빛은 그림자를 그릴 수 있음.
    light.position.set(-10, 10, 4);
    // scene.add(light);

    // 빛의 방향 기준

    const hemisphereLight = new THREE.HemisphereLight(lightColor, .3);
    // 하늘색/지상색 장면 바로 위에서 광원을 방출. 그림자가 생기지 않음.
    // HemisphereLight( skyColor : Integer, groundColor : Integer, intensity : Float )
    // scene.add(hemisphereLight);
    // * 더 자세하게

    const pointLight = new THREE.PointLight(lightColor, 1, 10);
    pointLight.position.set(10, -100, 10);
    // PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
    // 전구처럼 지정된 위치에서 모든 방향에 균등하게 빛을 비추는 것
    // scene.add(pointLight);

    const rectAreaLight = new THREE.RectAreaLight(lightColor, 1, 10, 10);
    rectAreaLight.position.set( 5, 5, 0 );
    rectAreaLight.lookAt( 0, 0, 0 );
    // scene.add( rectAreaLight );

    rectLightHelper = new THREE.RectAreaLightHelper( rectAreaLight );
    // rectAreaLight.add( rectLightHelper );


    // 직사각형 평면에 균일하게 빛을 방출.
    // RectAreaLight( color : Integer, intensity : Float, width : Float, height : Float )
    // scene.add(rectAreaLight);

    const spotLight = new THREE.SpotLight(lightColor, 1);
    // 한 지점에서 한 방향으로 빛을 쏘는 것. 그림자가 생길 수 있음.

    scene.add(spotLight);

    // 태양, 전구, 그림자
    /*
    * AmbientLight scene 의 전역에 빛을 비춰주는 것. 이 빛은 그림자가 생기지 않음.
    * DirectionLight 태양처럼 특정 방향으로 빛을 비춰주는 것. 이 빛은 그림자가 생길 수 있음.
    * HemisphereLight 하늘색/지상색 장면 바로 위에서 광원을 방출. 그림자가 생기지 않음.
    * PointLight 전구처럼 지정된 위치에서 모든 방향에 균등하게 빛을 비추는 것
    * RectAreaLight 직사각형 평면에 균일하게 빛을 방출.
    * SpotLight 한 지점에서 한 방향으로 빛을 쏘는 것. 그림자가 생길 수 있음.
    *
    * https://en.wikipedia.org/wiki/Euclidean_distance
    * */


    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, material, x) {
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        cube.rotation.x = 10;
        cube.rotation.y = 10;
        return cube;
    }

    const meshPhongMaterial = new THREE.MeshPhongMaterial({color: 0x44aa88});
    // 금속같이 빛을 받는 부분도 반짝이고, 반사되는 부분도 있어야 할때 사용
    const meshLambertMaterial = new THREE.MeshLambertMaterial({color: 0x8844aa});
    // 빛에 의한 명암만 있음 (반사되거나 반짝이지 않음)
    const meshBasicMaterial = new THREE.MeshStandardMaterial({color: 0xaa8844});
    // 명암도 없고, 아무것도 반사하지 않고, 단색만 나타내는 재질

    const cubes = [
        makeInstance(geometry, meshPhongMaterial,  0),
        makeInstance(geometry, meshLambertMaterial, -2),
        makeInstance(geometry, meshBasicMaterial,  2),
    ];

    function render(time) {
        time *= 0.001;  // convert time to seconds

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            // cube.rotation.x = rot;
            // cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    canvas.appendChild(renderer.domElement);
}
// https://discoverthreejs.com/book/first-steps/camera-controls/
main();
