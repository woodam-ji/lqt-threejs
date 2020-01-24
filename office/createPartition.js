function createPartitions(scene) {
    const partitionCountPerGroup = 3;
    const partitionGroupCount = 6;

    for (let i = 0; i < partitionGroupCount; i++) {
        let initialZ = i * -30 + 75;
        for(let j=0; j < partitionCountPerGroup; j++) {
            let x = 0;
            let z = initialZ;
            if (j % 3 === 1) {
                x = 10;
            } else if (j % 3 === 2) {
                x = -10
            }

            if (Math.floor(j / 3) === 1) {
                z += 6;
            }

            const partition = createPartition(x, 5, z);
            scene.add(partition);
        }
    }
}

function createPartition(x, y, z) {
    let partition = addPartitionBottom();
    partition = addDividerToBottom(partition);
    partition = addTopToDivider(partition);
    partition.position.x = x;
    partition.position.y = y;
    partition.position.z = z;

    createNameTag(partition);
    return partition;
}

function addPartitionBottom() {
    const partitionBottomGeometry = createBoxGeometry( 10, 10, 1 );
    const partitionMaterial = new THREE.MeshLambertMaterial( { color: 0xBBBBBB } );
    const partitionBottom = new THREE.Mesh(partitionBottomGeometry, partitionMaterial);
    partitionBottomGeometry.castShadow = true;

    return partitionBottom;
}

function addDividerToBottom(partitionBottom) {
    const partitionDividerGeometry = createBoxGeometry(10, .3, 1);
    const partitionDividerMaterial = new THREE.MeshLambertMaterial( { color: 0x333333 } );
    const partitionDivider = new THREE.Mesh(partitionDividerGeometry, partitionDividerMaterial);
    partitionDivider.castShadow = true;
    partitionBottom.add(partitionDivider);
    partitionDivider.position.y = 5.15;

    return {partitionBottom, partitionDivider};
}

function addTopToDivider({partitionBottom, partitionDivider}) {
    const partitionTopGeometry = createBoxGeometry( 10, 2, 1 );
    const partitionMaterial = new THREE.MeshLambertMaterial( { color: 0xBBBBBB } );
    const partitionTop = new THREE.Mesh(partitionTopGeometry, partitionMaterial);
    partitionTop.castShadow = true;
    partitionDivider.add(partitionTop);
    partitionTop.position.y = 1.15;

    return partitionBottom;
}

const createNameTag = scene => {
    const loader = new THREE.SVGLoader();

    loader.load('./assets/nameTag_small.svg', (data) => {
        const paths = data.paths;
        const group = new THREE.Group();

        for ( let i = 0; i < paths.length; i++ ) {

            const path = paths[ i ];

            const material = new THREE.MeshBasicMaterial( {
                color: '#ff3478',
                side: THREE.DoubleSide,
                depthWrite: false
            } );

            const shapes = path.toShapes( true );

            for ( var j = 0; j < shapes.length; j ++ ) {
                const shape = shapes[ j ];
                // const geometry = new THREE.ShapeBufferGeometry( shape );
                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 20,
                    bevelEnabled: false
                });
                const mesh = new THREE.Mesh( geometry, material );
                group.add( mesh );
            }
        }

        // group.position.x = 10;
        // group.position.y = 10;
        // group.position.z = 10;
        scene.add( group );
    });
};

function transformSVGPath(pathStr) {

    var paths = [];
    var path = new THREE.Shape();

    var idx = 1, len = pathStr.length, activeCmd,
        x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
        x1 = 0, x2 = 0, y1 = 0, y2 = 0,
        rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

    function eatNum() {
        var sidx, c, isFloat = false, s;
        // eat delims
        while (idx < len) {
            c = pathStr.charCodeAt(idx);
            if (c !== COMMA && c !== SPACE)
                break;
            idx++;
        }
        if (c === MINUS)
            sidx = idx++;
        else
            sidx = idx;
        // eat number
        while (idx < len) {
            c = pathStr.charCodeAt(idx);
            if (DIGIT_0 <= c && c <= DIGIT_9) {
                idx++;
                continue;
            }
            else if (c === PERIOD) {
                idx++;
                isFloat = true;
                continue;
            }

            s = pathStr.substring(sidx, idx);
            return isFloat ? parseFloat(s) : parseInt(s);
        }

        s = pathStr.substring(sidx);
        return isFloat ? parseFloat(s) : parseInt(s);
    }

    function nextIsNum() {
        var c;
        // do permanently eat any delims...
        while (idx < len) {
            c = pathStr.charCodeAt(idx);
            if (c !== COMMA && c !== SPACE)
                break;
            idx++;
        }
        c = pathStr.charCodeAt(idx);
        return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9));
    }

    var canRepeat;
    var enteredSub = false;
    var zSeen = false;
    activeCmd = pathStr[0];

    while (idx <= len) {
        canRepeat = true;
        switch (activeCmd) {
            // moveto commands, become lineto's if repeated
            case 'M':
                enteredSub = false;
                x = eatNum();
                y = eatNum();
                path.moveTo(x, y);
                activeCmd = 'L';
                break;
            case 'm':
                x += eatNum();
                y += eatNum();
                path.moveTo(x, y);
                activeCmd = 'l';
                break;
            case 'Z':
            case 'z':
                // z is a special case. This ends a segment and starts
                // a new path. Since the three.js path is continuous
                // we should start a new path here. This also draws a
                // line from the current location to the start location.
                canRepeat = false;
                if (x !== firstX || y !== firstY)
                    path.lineTo(firstX, firstY);

                paths.push(path);

                // reset the elements
                firstX = null;
                firstY = null;

                // avoid x,y being set incorrectly
                enteredSub = true;

                path = new THREE.Shape();

                zSeen = true;

                break;
            // - lines!
            case 'L':
            case 'H':
            case 'V':
                nx = (activeCmd === 'V') ? x : eatNum();
                ny = (activeCmd === 'H') ? y : eatNum();
                path.lineTo(nx, ny);
                x = nx;
                y = ny;
                break;
            case 'l':
            case 'h':
            case 'v':
                nx = (activeCmd === 'v') ? x : (x + eatNum());
                ny = (activeCmd === 'h') ? y : (y + eatNum());
                path.lineTo(nx, ny);
                x = nx;
                y = ny;
                break;
            // - cubic bezier
            case 'C':
                x1 = eatNum(); y1 = eatNum();
            case 'S':
                if (activeCmd === 'S') {
                    x1 = 2 * x - x2; y1 = 2 * y - y2;
                }
                x2 = eatNum();
                y2 = eatNum();
                nx = eatNum();
                ny = eatNum();
                path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                x = nx; y = ny;
                break;
            case 'c':
                x1 = x + eatNum();
                y1 = y + eatNum();
            case 's':
                if (activeCmd === 's') {
                    x1 = 2 * x - x2;
                    y1 = 2 * y - y2;
                }
                x2 = x + eatNum();
                y2 = y + eatNum();
                nx = x + eatNum();
                ny = y + eatNum();
                path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                x = nx; y = ny;
                break;
            // - quadratic bezier
            case 'Q':
                x1 = eatNum(); y1 = eatNum();
            case 'T':
                if (activeCmd === 'T') {
                    x1 = 2 * x - x1;
                    y1 = 2 * y - y1;
                }
                nx = eatNum();
                ny = eatNum();
                path.quadraticCurveTo(x1, y1, nx, ny);
                x = nx;
                y = ny;
                break;
            case 'q':
                x1 = x + eatNum();
                y1 = y + eatNum();
            case 't':
                if (activeCmd === 't') {
                    x1 = 2 * x - x1;
                    y1 = 2 * y - y1;
                }
                nx = x + eatNum();
                ny = y + eatNum();
                path.quadraticCurveTo(x1, y1, nx, ny);
                x = nx; y = ny;
                break;
            // - elliptical arc
            case 'A':
                rx = eatNum();
                ry = eatNum();
                xar = eatNum() * DEGS_TO_RADS;
                laf = eatNum();
                sf = eatNum();
                nx = eatNum();
                ny = eatNum();
                if (rx !== ry) {
                    console.warn("Forcing elliptical arc to be a circular one :(",
                        rx, ry);
                }
                // SVG implementation notes does all the math for us! woo!
                // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
                // step1, using x1 as x1'
                x1 = Math.cos(xar) * (x - nx) / 2 + Math.sin(xar) * (y - ny) / 2;
                y1 = -Math.sin(xar) * (x - nx) / 2 + Math.cos(xar) * (y - ny) / 2;
                // step 2, using x2 as cx'
                var norm = Math.sqrt(
                    (rx*rx * ry*ry - rx*rx * y1*y1 - ry*ry * x1*x1) /
                    (rx*rx * y1*y1 + ry*ry * x1*x1));
                if (laf === sf)
                    norm = -norm;
                x2 = norm * rx * y1 / ry;
                y2 = norm * -ry * x1 / rx;
                // step 3
                cx = Math.cos(xar) * x2 - Math.sin(xar) * y2 + (x + nx) / 2;
                cy = Math.sin(xar) * x2 + Math.cos(xar) * y2 + (y + ny) / 2;

                var u = new THREE.Vector2(1, 0),
                    v = new THREE.Vector2((x1 - x2) / rx,
                        (y1 - y2) / ry);
                var startAng = Math.acos(u.dot(v) / u.length() / v.length());
                if (u.x * v.y - u.y * v.x < 0)
                    startAng = -startAng;

                // we can reuse 'v' from start angle as our 'u' for delta angle
                u.x = (-x1 - x2) / rx;
                u.y = (-y1 - y2) / ry;

                var deltaAng = Math.acos(v.dot(u) / v.length() / u.length());
                // This normalization ends up making our curves fail to triangulate...
                if (v.x * u.y - v.y * u.x < 0)
                    deltaAng = -deltaAng;
                if (!sf && deltaAng > 0)
                    deltaAng -= Math.PI * 2;
                if (sf && deltaAng < 0)
                    deltaAng += Math.PI * 2;

                path.absarc(cx, cy, rx, startAng, startAng + deltaAng, sf);
                x = nx;
                y = ny;
                break;

            case ' ':
                // if it's an empty space, just skip it, and see if we can find a real command
                break;

            default:
                throw new Error("weird path command: " + activeCmd);
        }
        if (firstX === null && !enteredSub) {
            firstX = x;
            firstY = y;
        }

        // just reissue the command
        if (canRepeat && nextIsNum())
            continue;
        activeCmd = pathStr[idx++];
    }

    if (zSeen) {
        return paths;
    } else {
        paths.push(path);
        return paths;
    }
}