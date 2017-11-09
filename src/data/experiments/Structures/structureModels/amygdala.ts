import * as THREE from "three";
export const VERTICAL_CYLINDER = {
    segments: 30,
    radius: 20,
    height: 600
};

export const ARM = {
    segments: 15,
    radius: 10,
    height: 100
};

export const NUMBER_OF_ARMS = 5;

export class Amygdala {

    main = new THREE.Group;
    background = new THREE.Group;
    arms = new THREE.Group;
    initiated = false;

    createBackground() {
        const geometry = new THREE.CylinderGeometry( VERTICAL_CYLINDER.radius, VERTICAL_CYLINDER.radius, VERTICAL_CYLINDER.height, VERTICAL_CYLINDER.segments );
        const material = new THREE.MeshPhongMaterial( {color: 0x000000} );
        let background = new THREE.Mesh( geometry, material );

        background.rotation.y = Math.PI;

        this.background.add(background);
    }

    createArm(i) {
        const geometry = new THREE.CylinderGeometry( ARM.radius, ARM.radius, ARM.height, ARM.segments );
        const material = new THREE.MeshPhongMaterial( {color: 0x000000} );
        let arm = new THREE.Mesh( geometry, material );

        const vertRotation = Math.PI * 2 / NUMBER_OF_ARMS * (i + 1);
        arm.rotation.z = Math.PI * 0.5;
        arm.rotation.y = vertRotation;

        arm.position.x = Math.cos(vertRotation) * ARM.height * 0.5;
        arm.position.z = Math.sin(-vertRotation) * ARM.height * 0.5;

        arm.position.y = (VERTICAL_CYLINDER.height * i / NUMBER_OF_ARMS)
            - (VERTICAL_CYLINDER.height * 0.5)
            + (VERTICAL_CYLINDER.height * 0.5  / NUMBER_OF_ARMS);

        this.arms.add(arm);
    }

    createArms() {
        Array.apply(null, new Array(NUMBER_OF_ARMS)).map((_, i) => {
            this.createArm(i);
        });
    }

    init() {
        this.createBackground();
        this.createArms();
    }

    // animate() {
    //     if (!this.initiated) {
    //         console.log("init");
    //         this.init();
    //         this.initiated = true;
    //     }
    //     console.log(this.background);
    // }

    render() {
        this.main.add(this.background);
        this.main.add(this.arms);

        return this.main;
    }

}
