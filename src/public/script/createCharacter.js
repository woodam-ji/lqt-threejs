const hairColors = ['#495942', '#71917b', '#3e1111', '#773e29', '#354693', '#000000', '#b69043', '#81DAF5', '#F5A9F2', '#B45F04'];
const pantsColors = ['#2E2E2E', '#FBBC03', '#3B0B2E', '#0101DF', '#04B4AE', '#AEB404', '#088A29', '#8A084B', '#3B170B', '#0B243B'];

const createHuman = ({group, info}) => {
    return new Promise(async resolve => {
        if (!!info.name) {
            const human = await makeHumanMesh(info);
            group.add(human);
        }

        resolve({group, info})
    })
};

const makeHumanMesh = (info) => {
    return new Promise(async resolve => {
        if (!mesh.head) await makeHead();
        if (!mesh.hair) await makeHair();
        if (!mesh.eye) await makeEye();
        if (!mesh.neck) await makeNeck();
        if (!mesh.body) await makeBody();
        if (!mesh.arm) await makeArm();
        if (!mesh.armShirt) await makeArmShirt();
        if (!mesh.hand) await makeHand();
        if (!mesh.leg) await makeLeg();
        if (!mesh.foot) await makeFoot();
        if (!mesh.longHair) await makeLongHair();
        if (!mesh.pants) await makePantsMesh();
        if (!mesh.skirt) await makeSkirtMesh();
        const isFemale = info.gender === Genders.FEMALE;
        const random = Math.random();
        const hairColor = hairColors[Math.floor(random * hairColors.length)];
        const pantsColor = pantsColors[Math.floor(random * pantsColors.length)];
        const shirtColor = DepartmentColors[info.department];
        const head = mesh.head.clone();
        const hair = mesh.hair.clone();
        hair.material = mesh.hair.material.clone();
        hair.material.color.set(hairColor);
        head.add(hair);

        if (isFemale) {
            const longHair = mesh.longHair.clone();
            // longHair.material = mesh.longHair.children.map(child => {
            //     const cloneChild = child.clone();
            //     cloneChild.material = child.material.clone();
            //     cloneChild.material.color.set(hairColor);
            //     return cloneChild;
            // });
            longHair.children = longHair.children.map(child => {
                const cloneChild = child.clone();
                cloneChild.material = child.material.clone();
                cloneChild.material.color.set(hairColor);
                return cloneChild;
            });
            console.log(longHair)
            head.add(longHair);
        }

        const leftEye = mesh.eye.clone();
        const rightEye = mesh.eye.clone();

        leftEye.position.x = -.06;
        leftEye.position.y = -.05;
        leftEye.position.z = .16;

        rightEye.position.x = .06;
        rightEye.position.y = -.05;
        rightEye.position.z = .16;
        head.add(leftEye);
        head.add(rightEye);

        const neck = mesh.neck.clone();
        neck.position.y = -.2;
        head.add(neck);

        const body = mesh.body.clone();
        body.material = body.material.clone();
        body.material.color.set(shirtColor);
        body.position.y = -.35;

        const leftArm = mesh.arm.clone();
        const rightArm = mesh.arm.clone();
        leftArm.position.x = -.18;
        leftArm.rotation.z = 150;
        rightArm.position.x = .18;
        rightArm.rotation.z = -150;

        const leftArmShirt = mesh.armShirt.clone();
        const rightArmShirt = mesh.armShirt.clone();
        leftArmShirt.position.y = .05;
        rightArmShirt.position.y = .05;
        leftArm.add(leftArmShirt);
        rightArm.add(rightArmShirt);

        const leftHand = mesh.hand.clone();
        const rightHand = mesh.hand.clone();
        leftHand.position.y = -.1;
        rightHand.position.y = -.1;
        leftArm.add(leftHand);
        rightArm.add(rightHand);

        body.add(rightArm);
        body.add(leftArm);

        const leftLeg = mesh.leg.clone();
        const rightLeg = mesh.leg.clone();
        leftLeg.position.x = -.07;
        leftLeg.position.y = -.15;
        rightLeg.position.x = .07;
        rightLeg.position.y = -.15;

        if (isFemale) await makeSkirt(body, pantsColor);
        else await makePants(leftLeg, rightLeg, pantsColor);

        const leftFoot = mesh.foot.clone();
        const rightFoot = mesh.foot.clone();
        leftFoot.position.z = .05;
        leftFoot.position.y = -.25;
        rightFoot.position.z = .05;
        rightFoot.position.y = -.25;
        leftLeg.add(leftFoot);
        rightLeg.add(rightFoot);

        body.add(leftLeg);
        body.add(rightLeg);

        head.add(body);
        head.position.set(0, .88, -.5);
        resolve(head);
    })
};

const makeHead = () => {
    const headMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
    const headGeometry = new THREE.SphereGeometry(.2, 16, 16);
    mesh.head = new THREE.Mesh(headGeometry, headMaterial);
}
const makeHair = () => {
    const hairGeometry = new THREE.SphereGeometry(.204, 16, 16, 0, 6.3, 0, 1.5);
    const hairMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
    mesh.hair = new THREE.Mesh(hairGeometry, hairMaterial);
}
const makeEye = () => {
    const eyeGeometry = new THREE.SphereGeometry(.026, 16, 16);
    const eyeMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
    mesh.eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
}

const makeLongHair = () => {
    const longHairGroup = new THREE.Group();
    const longHairGeometry = new THREE.SphereGeometry(.05, 16, 16);
    const longHairMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
    const longHair = new THREE.Mesh(longHairGeometry, longHairMaterial);

    const longHairTailGeometry = new THREE.CylinderGeometry(0.025, 0.04, .35, 16);
    const longHairTailMaterial = new THREE.MeshLambertMaterial({color: "#424242"});
    const longHairTail = new THREE.Mesh(longHairTailGeometry, longHairTailMaterial);

    longHair.position.z = -.23;
    longHairTail.position.z = -.27;
    longHairTail.position.y = -.2;
    longHairTail.rotation.x = -50;
    longHairGroup.add(longHairTail);
    longHairGroup.add(longHair);
    mesh.longHair = longHairGroup;
};

const makePants = (leftLeg, rightLeg, pantsColor) => {
    return new Promise(resolve => {
        const pants = mesh.pants.clone();
        pants.material = mesh.pants.material.clone();
        pants.material.color.set(pantsColor);
        const leftLegPants = pants.clone();
        const rightLegPants = pants.clone();
        leftLeg.add(leftLegPants);
        rightLeg.add(rightLegPants);
        resolve();
    })
};

const makeSkirt = (body, pantsColor) => {
    return new Promise(resolve => {
        const skirt = mesh.skirt.clone();
        skirt.material = mesh.skirt.material.clone();
        skirt.material.color.set(pantsColor);
        skirt.position.y = -.175;
        body.add(skirt);
        resolve();
    })
};

const makeNeck = () => {
    const neckGeometry = new THREE.CylinderGeometry(.05, .05, .05, 16);
    const neckMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
    mesh.neck = new THREE.Mesh(neckGeometry, neckMaterial);
}
const makeBody = () => {
    const bodyGeometry = new THREE.CylinderGeometry(.15, .15, .25, 16);
    const bodyMaterial = new THREE.MeshLambertMaterial({color: "#5882FA"});
    mesh.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
}
const makeArm = () => {
    const armGeometry = new THREE.CylinderGeometry(0.035, 0.035, .25, 16);
    const armMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
    mesh.arm = new THREE.Mesh(armGeometry, armMaterial);
}
const makeArmShirt = () => {
    const armShirtGeometry = new THREE.CylinderGeometry(.05, .05, .15, 16);
    const armShirtMaterial = new THREE.MeshLambertMaterial({color: "#FFFFFF"});
    mesh.armShirt = new THREE.Mesh(armShirtGeometry, armShirtMaterial);
}
const makeHand = () => {
    const handGeometry = new THREE.SphereGeometry(.05, 16, 16);
    const handMaterial = new THREE.MeshLambertMaterial({color: "#FFE4C4"});
    mesh.hand = new THREE.Mesh(handGeometry, handMaterial);
}
const makeLeg = () => {
    const legGeometry = new THREE.CylinderGeometry(.035, .035, .5, 16);
    const legMaterial = new THREE.MeshLambertMaterial({color: '#FFE4C4'});
    mesh.leg = new THREE.Mesh(legGeometry, legMaterial);
}
const makeFoot = () => {
    const footGeometry = new THREE.BoxGeometry(.125, .05, .175);
    const footMaterial = new THREE.MeshLambertMaterial({color: '#000000'});
    mesh.foot = new THREE.Mesh(footGeometry, footMaterial);
}
const makePantsMesh = () => {
    const pantsGeometry = new THREE.CylinderGeometry(.06, .06, .25, 16);
    const pantsMaterial = new THREE.MeshLambertMaterial({color: '#fbbc03'});
    mesh.pants = new THREE.Mesh(pantsGeometry, pantsMaterial);
}
const makeSkirtMesh = () => {
    const skirtGeometry = new THREE.CylinderGeometry(.15, .18, .125, 16);
    const skirtMaterial = new THREE.MeshLambertMaterial({color: "#FBEFFB"});
    mesh.skirt = new THREE.Mesh(skirtGeometry, skirtMaterial);
}