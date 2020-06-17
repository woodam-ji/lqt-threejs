const hairColors = ['#495942', '#71917b', '#3e1111', '#773e29', '#354693', '#000000', '#b69043', '#81DAF5', '#F5A9F2', '#B45F04'];
const pantsColors = ['#2E2E2E', '#FBBC03', '#3B0B2E', '#0101DF', '#04B4AE', '#AEB404', '#088A29', '#8A084B', '#3B170B', '#0B243B'];
const headMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
const headGeometry = new THREE.SphereGeometry(.2, 16, 16);
const hairGeometry = new THREE.SphereGeometry(.204, 16, 16, 0, 6.3, 0, 1.5);
const hairMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
const hairMesh = new THREE.Mesh(hairGeometry, hairMaterial);
const eyeGeometry = new THREE.SphereGeometry(.026, 16, 16);
const eyeMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
const neckGeometry = new THREE.CylinderGeometry(.05, .05, .05, 16);
const neckMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
const bodyGeometry = new THREE.CylinderGeometry(.15, .15, .25, 16);
const bodyMaterial = new THREE.MeshLambertMaterial({color: "#5882FA"});
const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
const armGeometry = new THREE.CylinderGeometry(0.035, 0.035, .25, 16);
const armMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
const armMesh = new THREE.Mesh(armGeometry, armMaterial);
const armShirtGeometry = new THREE.CylinderGeometry(.05, .05, .15, 16);
const armShirtMaterial = new THREE.MeshLambertMaterial({color: "#FFFFFF"});
const armShirtMesh = new THREE.Mesh(armShirtGeometry, armShirtMaterial);
const handGeometry = new THREE.SphereGeometry(.05, 16, 16);
const handMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
const handMesh = new THREE.Mesh(handGeometry, handMaterial);
const legGeometry = new THREE.CylinderGeometry(.035, .035, .5, 16);
const legMaterial = new THREE.MeshLambertMaterial({color: '#FFE4C4'});
const legMesh = new THREE.Mesh(legGeometry, legMaterial);
const footGeometry = new THREE.BoxGeometry(.125, .05, .175);
const footMaterial = new THREE.MeshLambertMaterial({color: '#000000'});
const footMesh = new THREE.Mesh(footGeometry, footMaterial);
const longHairGeometry = new THREE.SphereGeometry(.05, 16, 16);
const longHairMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
const longHairMesh = new THREE.Mesh(longHairGeometry, longHairMaterial);
const longHairTailGeometry = new THREE.CylinderGeometry(0.025, 0.04, .35, 16);
const longHairTailMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
const longHairTailMesh = new THREE.Mesh(longHairTailGeometry, longHairTailMaterial);
const pantsGeometry = new THREE.CylinderGeometry(.06, .06, .25, 16);
const pantsMaterial = new THREE.MeshLambertMaterial({color: '#fbbc03'});
const pantsMesh = new THREE.Mesh(pantsGeometry, pantsMaterial);
const skirtGeometry = new THREE.CylinderGeometry(.15, .18, .125, 16);
const skirtMaterial = new THREE.MeshLambertMaterial({color: "#FBEFFB"});

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
const {curry, once, reduce, L, C, log} = _;
const add = curry((a, b) => {
    console.log('add')
    return a + b
});
const f = once(a => {
    console.log(123);
    return a + 10;
});
log(f(5)); // 15
const add10 = add(10);
console.log(add10(10))
console.log(add10(20))


const makeHuman = (hairColor, isWoman, shirtColor, pantsColor, renderer, scene, camera, isChangeObjectDirection) => {
    return new Promise(async resolve => {
        const head = new THREE.Mesh(headGeometry, headMaterial);

        const hair = hairMesh.clone();
        if (hairColor) {
            hair.material = hair.material.clone();
            hair.material.color.set(hairColor);
        }
        head.add(hair);

        if (isWoman) await makeLongHair(head, hairColor);

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

        const neck = new THREE.Mesh(neckGeometry, neckMaterial);
        neck.position.y = -.2;
        head.add(neck);

        const body = bodyMesh.clone();
        if (shirtColor) {
            body.material = body.material.clone();
            body.material.color.set(shirtColor);
        }
        body.position.y = -.35;

        const leftArm = armMesh.clone();
        const rightArm = armMesh.clone();
        leftArm.position.x = -.18;
        leftArm.rotation.z = 150;
        rightArm.position.x = .18;
        rightArm.rotation.z = -150;

        const leftArmShirt = armShirtMesh.clone();
        const rightArmShirt = armShirtMesh.clone();
        leftArmShirt.position.y = .05;
        rightArmShirt.position.y = .05;
        leftArm.add(leftArmShirt);
        rightArm.add(rightArmShirt);


        const leftHand = handMesh.clone();
        const rightHand = handMesh.clone();
        leftHand.position.y = -.1;
        rightHand.position.y = -.1;
        leftArm.add(leftHand);
        rightArm.add(rightHand);

        body.add(rightArm);
        body.add(leftArm);


        const leftLeg = legMesh.clone();
        const rightLeg = legMesh.clone();
        leftLeg.position.x = -.07;
        leftLeg.position.y = -.15;
        rightLeg.position.x = .07;
        rightLeg.position.y = -.15;

        if (isWoman) await makeSkirt(body);
        else await makePants(leftLeg, rightLeg, pantsColor);

        const leftFoot = footMesh.clone();
        const rightFoot = footMesh.clone();
        leftFoot.position.z = .05;
        leftFoot.position.y = -.25;
        rightFoot.position.z = .05;
        rightFoot.position.y = -.25;
        leftLeg.add(leftFoot);
        rightLeg.add(rightFoot);

        body.add(leftLeg);
        body.add(rightLeg);

        head.add(body);
        head.position.y = .88;
        resolve(head);
    })
};

const makeLongHair = (head, color) => {
    return new Promise(resolve => {
        const longHair = longHairMesh.clone();
        longHair.material = longHairMesh.material.clone();
        longHair.material.color.set(color);
        longHair.position.z = -.23;

        const longHairTail = longHairTailMesh.clone();
        longHairTail.material = longHairTail.material.clone();
        longHairTail.material.color.set(color);
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
        const pants = pantsMesh.clone();
        pants.material = pantsMesh.material.clone();
        pants.material.color.set(pantsColor);
        const leftLegPants = pants.clone();
        const rightLegPants = pants.clone();
        leftLeg.add(leftLegPants);
        rightLeg.add(rightLegPants);
        resolve();
    })
};

const makeSkirt = (body) => {
    return new Promise(resolve => {
        const skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
        skirt.position.y = -.175;
        body.add(skirt);
        resolve();
    })
};