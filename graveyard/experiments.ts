// createMiddle() {
//     const geometry = new THREE.CylinderGeometry( VERTICAL_CYLINDER.radius, VERTICAL_CYLINDER.radius, VERTICAL_CYLINDER.height, VERTICAL_CYLINDER.segments );
//     const material = new THREE.MeshPhongMaterial( {color: 0x000000} );
//     let middle = new THREE.Mesh( geometry, material );
//
//     middle.rotation.y = Math.PI;
//
//     this.middle.add(middle);
// }
//
// createArm(i) {
//     const geometry = new THREE.CylinderGeometry( ARM.radius, ARM.radius, ARM.height, ARM.segments );
//     const material = new THREE.MeshPhongMaterial( {color: 0x000000} );
//     let arm = new THREE.Mesh( geometry, material );
//
//     const spreadRotation = Math.PI * 2 / NUMBER_OF_ARMS * (i + 1);
//     arm.rotation.z = Math.PI * 0.5;
//     arm.rotation.y = spreadRotation;
//
//     arm.position.x = Math.cos(spreadRotation) * ARM.height * 0.5;
//
//     arm.position.y = (VERTICAL_CYLINDER.height * i / NUMBER_OF_ARMS)
//         - (VERTICAL_CYLINDER.height * 0.5)
//         + (VERTICAL_CYLINDER.height * 0.5  / NUMBER_OF_ARMS);
//
//     arm.position.z = Math.sin(-spreadRotation) * ARM.height * 0.5;
//
//     this.arms.add(arm);
// }
