const hairColors = ['#495942', '#71917b', '#3e1111', '#773e29', '#354693', '#000000', '#b69043', '#81DAF5', '#F5A9F2', '#B45F04'];
const pantsColors = ['#2E2E2E', '#FBBC03', '#3B0B2E', '#0101DF', '#04B4AE', '#AEB404', '#088A29', '#8A084B', '#3B170B', '#0B243B'];
const createHumans = (renderer, scene, camera, humanInfos, groupCount, userCountPerGroup, initialX, initialZ) => {
    return new Promise(async resolve => {
        const oneSideMaxCount = userCountPerGroup / 2;
        const humanGroup = new THREE.Group();
        let humanCount = 0;
        for (let i = 0; i < groupCount; i++) {
            let groupZ = i * 3 + initialZ;

            for (let j = 0; j < userCountPerGroup; j++) {
                const humanInfo = humanInfos[humanCount] ? humanInfos[humanCount] : {};
                const x = 1 * (j % oneSideMaxCount) + initialX;
                let z = groupZ;
                let rotateY = 0;

                if (Math.floor(j / oneSideMaxCount) === 1) {
                    z += 1.6;
                }
                if (j >= oneSideMaxCount) {
                    rotateY = Math.PI;
                }

                if (!!humanInfo.name) {
                    const human = await makeHuman(hairColors[parseInt(Math.random() * pantsColors.length)], humanInfo.isWoman, departmentColor[humanInfo.department], pantsColors[parseInt(Math.random() * pantsColors.length)], renderer, scene, camera, true);
                    human.position.x = x;
                    human.position.z = z;
                    human.rotation.y = rotateY;
                    humanGroup.add(human);
                }
                humanCount++;
            }
        }
        scene.add(humanGroup);
        resolve()
    })
};

const makeHuman = (hairColor, isWoman, shirtColor, pantsColor, renderer, scene, camera, isChangeObjectDirection) => {
    return new Promise(async resolve => {
        const headGeometry = new THREE.SphereGeometry(.2, 16, 16);
        const headMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
        const head = new THREE.Mesh(headGeometry, headMaterial);

        const hairGeometry = new THREE.SphereGeometry(.204, 16, 16, 0, 6.3, 0, 1.5);
        const hairMaterial = new THREE.MeshLambertMaterial({color: hairColor || "#424242"});
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        head.add(hair);

        if (isWoman) await makeLongHair(head, hairColor);

        const eyeGeometry = new THREE.SphereGeometry(.026, 16, 16);
        const eyeMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);

        leftEye.position.x = -.06;
        leftEye.position.y = -.05;
        leftEye.position.z = .16;

        rightEye.position.x = .06;
        rightEye.position.y = -.05;
        rightEye.position.z = .16;
        head.add(leftEye);
        head.add(rightEye);

        const neckGeometry = new THREE.CylinderGeometry(.05, .05, .05, 16);
        const neckMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
        const neck = new THREE.Mesh(neckGeometry, neckMaterial);
        neck.position.y = -.2;
        head.add(neck);

        const bodyGeometry = new THREE.CylinderGeometry(.15, .15, .25, 16);
        const bodyMaterial = new THREE.MeshLambertMaterial({color: shirtColor || "#5882FA"});
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = -.35;

        const armGeometry = new THREE.CylinderGeometry(0.035, 0.035, .25, 16);
        const armMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.x = -.18;
        leftArm.rotation.z = 150;

        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.x = .18;
        rightArm.rotation.z = -150;

        const armShirtGeometry = new THREE.CylinderGeometry(.05, .05, .15, 16);
        const armShirtMaterial = new THREE.MeshLambertMaterial({color: "#FFFFFF"});
        const leftArmShirt = new THREE.Mesh(armShirtGeometry, armShirtMaterial);
        leftArmShirt.position.y = .05;
        leftArm.add(leftArmShirt);

        const rightArmShirt = new THREE.Mesh(armShirtGeometry, armShirtMaterial);
        rightArmShirt.position.y = .05;
        rightArm.add(rightArmShirt);

        const handGeometry = new THREE.SphereGeometry(.05, 16, 16);
        const handMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
        const leftHand = new THREE.Mesh(handGeometry, handMaterial);
        leftHand.position.y = -.1;
        leftArm.add(leftHand);

        const rightHand = new THREE.Mesh(handGeometry, handMaterial);
        rightHand.position.y = -.1;
        rightArm.add(rightHand);

        body.add(rightArm);
        body.add(leftArm);

        const legGeometry = new THREE.CylinderGeometry(.035, .035, .5, 16);
        const legMaterial = new THREE.MeshLambertMaterial({color: '#FFE4C4'});
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        const leftLeg = leg.clone();
        const rightLeg = leg.clone();
        leftLeg.position.x = -.07;
        leftLeg.position.y = -.15;
        rightLeg.position.x = .07;
        rightLeg.position.y = -.15;

        if (isWoman) await makeSkirt(body);
        else await makePants(leftLeg, rightLeg, pantsColor);

        const footGeometry = new THREE.BoxGeometry(.125, .05, .175);
        const footMaterial = new THREE.MeshLambertMaterial({color: '#000000'});
        const foot = new THREE.Mesh(footGeometry, footMaterial);
        const leftFoot = foot.clone();
        const rightFoot = foot.clone();
        leftFoot.position.z = .05;
        leftFoot.position.y = -.25;
        rightFoot.position.z = .05;
        rightFoot.position.y = -.25;
        leftLeg.add(leftFoot);
        rightLeg.add(rightFoot);

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

        head.position.y = .88;
        resolve(head);
    })
};

const makeLongHair = (head, color) => {
    return new Promise(resolve => {
        const longHairGeometry = new THREE.SphereGeometry(.05, 16, 16);
        const longHairMaterial = new THREE.MeshLambertMaterial({color: color || "#424242"});
        const longHair = new THREE.Mesh(longHairGeometry, longHairMaterial);
        longHair.position.z = -.23;

        const longHairTailGeometry = new THREE.CylinderGeometry(0.025, 0.04, .35, 16);
        const longHairTailMaterial = new THREE.MeshLambertMaterial({color: color || "#424242"});
        const longHairTail = new THREE.Mesh(longHairTailGeometry, longHairTailMaterial);
        longHairTail.position.z = -.275;
        longHairTail.position.y = -.2;
        longHairTail.rotation.x = -50;
        head.add(longHairTail);
        head.add(longHair);
        resolve();
    })
};

const makePants = (leftLeg, rightLeg, pantsColor) => {
    return new Promise(resolve => {
        const pantsGeometry = new THREE.CylinderGeometry(.06, .06, .25, 16);
        const pantsMaterial = new THREE.MeshLambertMaterial({color: pantsColor || '#fbbc03'});
        const pants = new THREE.Mesh(pantsGeometry, pantsMaterial);
        const leftLegPants = pants.clone();
        const rightLegPants = pants.clone();
        leftLeg.add(leftLegPants);
        rightLeg.add(rightLegPants);
        resolve();
    })
};

const makeSkirt = (body) => {
    return new Promise(resolve => {
        const skirtGeometry = new THREE.CylinderGeometry(.15, .18, .125, 16);
        const skirtMaterial = new THREE.MeshLambertMaterial({color: "#FBEFFB"});
        const skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
        skirt.position.y = -.175;
        body.add(skirt);
        resolve();
    })
};