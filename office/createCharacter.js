const shirtColors = ['#9FF781', '#5882FA', '#8258FA', '#FAAC58', '#FA5858', '#81DAF5', '#F5A9F2', '#B45F04', '#F781F3', '#5882FA'];
const pantsColors = ['#2E2E2E', '#FBBC03', '#3B0B2E', '#0101DF', '#04B4AE', '#AEB404', '#088A29', '#8A084B', '#3B170B', '#0B243B'];
const createHumans = (renderer, scene, camera, groupCount, userCountPerGroup) => {
    const humanType = [
        {
            isWoman: true,
            hairColor: '#FF00BF',
            shirtColor: shirtColors[parseInt(Math.random() * shirtColors.length)],
            pantsColor: pantsColors[parseInt(Math.random() * pantsColors.length)],
        },
        {
            isWoman: false,
            hairColor: '#000000',
            shirtColor: shirtColors[parseInt(Math.random() * shirtColors.length)],
            pantsColor: pantsColors[parseInt(Math.random() * pantsColors.length)],
        },
        {
            isWoman: true,
            hairColor: '#ffc771',
            shirtColor: shirtColors[parseInt(Math.random() * shirtColors.length)],
            pantsColor: pantsColors[parseInt(Math.random() * pantsColors.length)],
        },
        {
            isWoman: true,
            hairColor: '#290607',
            shirtColor: shirtColors[parseInt(Math.random() * shirtColors.length)],
            pantsColor: pantsColors[parseInt(Math.random() * pantsColors.length)],
        },
        {
            isWoman: false,
            hairColor: '#49330d',
            shirtColor: shirtColors[parseInt(Math.random() * shirtColors.length)],
            pantsColor: pantsColors[parseInt(Math.random() * pantsColors.length)],
        },
        {
            isWoman: false,
            hairColor: '#504e0f',
            shirtColor: shirtColors[parseInt(Math.random() * shirtColors.length)],
            pantsColor: pantsColors[parseInt(Math.random() * pantsColors.length)],
        },
        {
            isWoman: true,
            hairColor: '#290607',
            shirtColor: shirtColors[parseInt(Math.random() * shirtColors.length)],
            pantsColor: pantsColors[parseInt(Math.random() * pantsColors.length)],
        },
        {
            isWoman: true,
            hairColor: '#290607',
            shirtColor: shirtColors[parseInt(Math.random() * shirtColors.length)],
            pantsColor: pantsColors[parseInt(Math.random() * pantsColors.length)],
        }
    ];
    const oneSideMaxCount = userCountPerGroup / 2;
    const humanGroup = new THREE.Group();
    for (let i = 0; i < groupCount; i++) {
        let initialZ = i * -30 + 67;
        for(let j=0; j < userCountPerGroup; j++) {
            const x = 10 * (j % oneSideMaxCount);
            let z = initialZ;
            let rotateY = 0;

            if (Math.floor(j / oneSideMaxCount) === 1) {
                z += 16;
            }
            if (j >= oneSideMaxCount){
                rotateY = Math.PI;
            }
            const human = makeHuman(humanType[j].hairColor, humanType[j].isWoman, humanType[j].shirtColor, humanType[j].pantsColor, renderer, scene, camera, true);
            human.position.x = x;
            human.position.z = z;
            human.rotation.y = rotateY;
            humanGroup.add(human);
        }
    }
    scene.add(humanGroup);
};

const makeHuman = (hairColor, isWoman, shirtColor, pantsColor, renderer, scene, camera, isChangeObjectDirection) => {
    const headGeometry = new THREE.SphereGeometry(4,32,32);
    const headMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
    const head = new THREE.Mesh(headGeometry, headMaterial);

    const hairGeometry = new THREE.SphereGeometry(4.01,32,32,0,6.3,0,1.5);
    const hairMaterial = new THREE.MeshLambertMaterial({color: hairColor || "#424242"});
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    head.add(hair);

    if (isWoman) makeLongHair(head, hairColor);

    const eyeGeometry = new THREE.SphereGeometry(0.5,32,32);
    const eyeMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);

    leftEye.position.x = -1.2;
    leftEye.position.y = -1;
    leftEye.position.z = 3.3;

    rightEye.position.x = 1.2;
    rightEye.position.y = -1;
    rightEye.position.z = 3.3;
    head.add(leftEye);
    head.add(rightEye);

    const neckGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32 );
    const neckMaterial = new THREE.MeshLambertMaterial( {color: "#FFE4C4"} );
    const neck = new THREE.Mesh( neckGeometry, neckMaterial );
    neck.position.y = -4;
    head.add(neck);

    const bodyGeometry = new THREE.CylinderGeometry( 3, 3, 5, 32 );
    const bodyMaterial = new THREE.MeshLambertMaterial( {color: shirtColor || "#5882FA"} );
    const body = new THREE.Mesh( bodyGeometry, bodyMaterial );
    body.position.y = -7;

    const armGeometry = new THREE.CylinderGeometry( 0.7, 0.7, 5, 32 );
    const armMaterial = new THREE.MeshLambertMaterial( {color: "#FFE4C4"} );
    const leftArm = new THREE.Mesh( armGeometry, armMaterial );
    leftArm.position.x = -3.5;
    leftArm.rotation.z = 150;

    const rightArm = new THREE.Mesh( armGeometry, armMaterial );
    rightArm.position.x = 3.5;
    rightArm.rotation.z = -150;

    const armShirtGeometry = new THREE.CylinderGeometry( 1, 1, 3, 32 );
    const armShirtMaterial = new THREE.MeshLambertMaterial( {color: "#FFFFFF"} );
    const leftArmShirt = new THREE.Mesh( armShirtGeometry, armShirtMaterial );
    leftArmShirt.position.x = 0;
    leftArmShirt.position.y = 1;
    leftArm.add(leftArmShirt);

    const rightArmShirt = new THREE.Mesh( armShirtGeometry, armShirtMaterial );
    rightArmShirt.position.x = 0;
    rightArmShirt.position.y = 1;
    rightArm.add(rightArmShirt);

    const handGeometry = new THREE.SphereGeometry(1,32,32);
    const handMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.x = 0;
    leftHand.position.y = -2;
    leftArm.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.x = 0;
    rightHand.position.y = -2;
    rightArm.add(rightHand);

    const legGeometry = new THREE.CylinderGeometry(0.7, 0.7, 10, 32);
    const legMaterial = new THREE.MeshLambertMaterial({color: '#FFE4C4'});
    const leg = new THREE.Mesh( legGeometry, legMaterial );
    const leftLeg = leg.clone();
    const rightLeg = leg.clone();
    leftLeg.position.x = -1.4;
    leftLeg.position.y = -3;
    rightLeg.position.x = 1.4;
    rightLeg.position.y = -3;

    if (isWoman) makeSkirt(body);
    else makePants(leftLeg, rightLeg, pantsColor);

    const footGeometry = new THREE.BoxGeometry(2.5, 1, 3.5);
    const footMaterial = new THREE.MeshLambertMaterial({color: '#000000'});
    const foot = new THREE.Mesh( footGeometry, footMaterial );
    const leftFoot = foot.clone();
    const rightFoot = foot.clone();
    leftFoot.position.z = 1;
    leftFoot.position.y = -5;
    rightFoot.position.z = 1;
    rightFoot.position.y = -5;
    leftLeg.add(leftFoot);
    rightLeg.add(rightFoot);

    body.add(rightArm);
    body.add(leftArm);
    body.add(leftLeg);
    body.add(rightLeg);

    head.add(body);

    // new function renderScene() {
    //     requestAnimationFrame(renderScene);
    //     if (leftArm.rotation.x > 0.3 || leftArm.rotation.x < -0.3) isChangeObjectDirection = !isChangeObjectDirection;
    //
    //     if (isChangeObjectDirection) {
    //         leftArm.rotation.x += 0.01;
    //         rightArm.rotation.x -= 0.01;
    //         leftLeg.rotation.x -= 0.01;
    //         rightLeg.rotation.x -= -0.01;
    //     } else {
    //         leftArm.rotation.x -= 0.01;
    //         rightArm.rotation.x += 0.01;
    //         leftLeg.rotation.x += 0.01;
    //         rightLeg.rotation.x += -0.01;
    //     }
    //
    //     head.position.z += 0.1;
    //
    //     renderer.render(scene,camera);
    // };

    head.position.y = 8.8;
    head.scale.set(0.5, 0.5, 0.5);
    return head;
};

const makeLongHair = (head, color) => {
    const longHairGeometry = new THREE.SphereGeometry(1, 32, 32);
    const longHairMaterial = new THREE.MeshLambertMaterial({color: color || "#424242"});
    const longHair = new THREE.Mesh(longHairGeometry, longHairMaterial);
    longHair.position.z = -4.5;

    const longHairTailGeometry = new THREE.CylinderGeometry(0.5, 0.8, 7, 32);
    const longHairTailMaterial = new THREE.MeshLambertMaterial({color: color || "#424242"});
    const longHairTail = new THREE.Mesh(longHairTailGeometry, longHairTailMaterial);
    longHairTail.position.z = -5.5;
    longHairTail.position.y = -4;
    longHairTail.rotation.x = -50;
    head.add(longHairTail);
    head.add(longHair);
};

const makePants = (leftLeg, rightLeg, pantsColor) => {
    const pantsGeometry = new THREE.CylinderGeometry(1.2, 1.2, 5, 32);
    const pantsMaterial = new THREE.MeshLambertMaterial({color: pantsColor || '#fbbc03'});
    const pants = new THREE.Mesh( pantsGeometry, pantsMaterial );
    const leftLegPants = pants.clone();
    const rightLegPants = pants.clone();
    leftLeg.add(leftLegPants);
    rightLeg.add(rightLegPants);
};

const makeSkirt = (body) => {
    const skirtGeometry = new THREE.CylinderGeometry(3, 3.2, 2.5, 32);
    const skirtMaterial = new THREE.MeshLambertMaterial({color: "#FBEFFB"});
    const skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
    skirt.position.y = -3.5;
    body.add(skirt)
};