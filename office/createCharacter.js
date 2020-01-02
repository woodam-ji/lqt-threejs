const makeHuman = (hairColor, isWoman, renderer, scene, camera, isChangeObjectDirection) => {
    const headGeometry = new THREE.SphereGeometry(4,32,32);
    const headMaterial = new THREE.MeshBasicMaterial({color: "#FFE4C4"});
    const head = new THREE.Mesh(headGeometry, headMaterial);

    const hairGeometry = new THREE.SphereGeometry(4.01,32,32,0,6.3,0,1.5);
    const hairMaterial = new THREE.MeshBasicMaterial({color: hairColor || "#424242"});
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    head.add(hair);

    if (isWoman) makeLongHair(head, hairColor);

    const eyeGeometry = new THREE.SphereGeometry(0.5,32,32);
    const eyeMaterial = new THREE.MeshBasicMaterial({color: "#424242"});
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
    const neckMaterial = new THREE.MeshBasicMaterial( {color: "#FFE4C4"} );
    const neck = new THREE.Mesh( neckGeometry, neckMaterial );
    neck.position.y = -4;
    head.add(neck);

    const bodyGeometry = new THREE.CylinderGeometry( 3, 3, 5, 32 );
    const bodyMaterial = new THREE.MeshBasicMaterial( {color: "#5882FA"} );
    const body = new THREE.Mesh( bodyGeometry, bodyMaterial );
    body.position.y = -7;

    const armGeometry = new THREE.CylinderGeometry( 0.7, 0.7, 5, 32 );
    const armMaterial = new THREE.MeshBasicMaterial( {color: "#FFE4C4"} );
    const leftArm = new THREE.Mesh( armGeometry, armMaterial );
    leftArm.position.x = -3.5;
    leftArm.rotation.z = 150;

    const rightArm = new THREE.Mesh( armGeometry, armMaterial );
    rightArm.position.x = 3.5;
    rightArm.rotation.z = -150;

    const armShirtGeometry = new THREE.CylinderGeometry( 1, 1, 3, 32 );
    const armShirtMaterial = new THREE.MeshBasicMaterial( {color: "#FFFFFF"} );
    const leftArmShirt = new THREE.Mesh( armShirtGeometry, armShirtMaterial );
    leftArmShirt.position.x = 0;
    leftArmShirt.position.y = 1;
    leftArm.add(leftArmShirt);

    const rightArmShirt = new THREE.Mesh( armShirtGeometry, armShirtMaterial );
    rightArmShirt.position.x = 0;
    rightArmShirt.position.y = 1;
    rightArm.add(rightArmShirt);

    const handGeometry = new THREE.SphereGeometry(1,32,32);
    const handMaterial = new THREE.MeshBasicMaterial({color: "#FFE4C4"});
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.x = 0;
    leftHand.position.y = -2;
    leftArm.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.x = 0;
    rightHand.position.y = -2;
    rightArm.add(rightHand);

    const legGeometry = new THREE.CylinderGeometry(0.7, 0.7, 10, 32);
    const legMaterial = new THREE.MeshBasicMaterial({color: '#FFE4C4'});
    const leg = new THREE.Mesh( legGeometry, legMaterial );
    const leftLeg = leg.clone();
    const rightLeg = leg.clone();
    leftLeg.position.x = -1.4;
    leftLeg.position.y = -3;
    rightLeg.position.x = 1.4;
    rightLeg.position.y = -3;

    if (isWoman) makeSkirt(body);
    else makePants(leftLeg, rightLeg);

    const footGeometry = new THREE.BoxGeometry(2.5, 1, 3.5);
    const footMaterial = new THREE.MeshBasicMaterial({color: '#000000'});
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
    //     // if (leftArm.rotation.x > 0.3 || leftArm.rotation.x < -0.3) isChangeObjectDirection = !isChangeObjectDirection;
    //     //
    //     // if (isChangeObjectDirection) {
    //     //     leftArm.rotation.x += 0.01;
    //     //     rightArm.rotation.x -= 0.01;
    //     //     leftLeg.rotation.x -= 0.01;
    //     //     rightLeg.rotation.x -= -0.01;
    //     // } else {
    //     //     leftArm.rotation.x -= 0.01;
    //     //     rightArm.rotation.x += 0.01;
    //     //     leftLeg.rotation.x += 0.01;
    //     //     rightLeg.rotation.x += -0.01;
    //     // }
    //     //
    //     // head.position.z += 0.1;
    //
    //     renderer.render(scene,camera);
    // };

    head.position.y = 9;
    head.scale.set(0.5, 0.5, 0.5);
    return head;
};

const makeLongHair = (head, color) => {
    const longHairGeometry = new THREE.SphereGeometry(1, 32, 32);
    const longHairMaterial = new THREE.MeshBasicMaterial({color: color || "#424242"});
    const longHair = new THREE.Mesh(longHairGeometry, longHairMaterial);
    longHair.position.z = -4.5;

    const longHairTailGeometry = new THREE.CylinderGeometry(0.5, 0.8, 7, 32);
    const longHairTailMaterial = new THREE.MeshBasicMaterial({color: color || "#424242"});
    const longHairTail = new THREE.Mesh(longHairTailGeometry, longHairTailMaterial);
    longHairTail.position.z = -5.5;
    longHairTail.position.y = -4;
    longHairTail.rotation.x = -50;
    head.add(longHairTail);
    head.add(longHair);
};

const makePants = (leftLeg, rightLeg) => {
    const pantsGeometry = new THREE.CylinderGeometry(1.2, 1.2, 5, 32);
    const pantsMaterial = new THREE.MeshBasicMaterial({color: '#fbbc03'});
    const pants = new THREE.Mesh( pantsGeometry, pantsMaterial );
    const leftLegPants = pants.clone();
    const rightLegPants = pants.clone();
    leftLeg.add(leftLegPants);
    rightLeg.add(rightLegPants);
};

const makeSkirt = (body) => {
    const skirtGeometry = new THREE.CylinderGeometry(3, 3.2, 2.5, 32);
    const skirtMaterial = new THREE.MeshBasicMaterial({color: "#FBEFFB"});
    const skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
    skirt.position.y = -3.5;
    body.add(skirt)
};