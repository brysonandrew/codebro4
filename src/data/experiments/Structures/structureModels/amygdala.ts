import * as THREE from "three";

export const VERTICAL_CYLINDER = {
    segments: 30,
    radius: 20,
    height: 2000
};

export const ARM = {
    segments: 5,
    radius: 2,
    height: 150,
    spread: 10
};

export const NUMBER_OF_ARMS = 5;

export const SCREEN = {
    width: 150,
    height: 100,
    radius: 155,
    openingBuffer: VERTICAL_CYLINDER.height / NUMBER_OF_ARMS
};

export class Amygdala {

    main = new THREE.Group;
    middle = new THREE.Group;
    arms = new THREE.Group;
    screens = new THREE.Group;

    initiated = false;

    createMiddle() {
        const geometry = new THREE.CylinderGeometry( VERTICAL_CYLINDER.radius, VERTICAL_CYLINDER.radius, VERTICAL_CYLINDER.height, VERTICAL_CYLINDER.segments );
        const material = new THREE.MeshPhongMaterial( {color: 0x000000} );
        let middle = new THREE.Mesh( geometry, material );

        middle.rotation.y = Math.PI;

        this.middle.add(middle);
    }

    createArm(i) {
        const geometry = new THREE.CylinderGeometry( ARM.radius, ARM.radius, ARM.height, ARM.segments );
        const material = new THREE.MeshPhongMaterial( {color: 0x000000} );
        let arm = new THREE.Mesh( geometry, material );

        const spreadRotation = Math.PI * 2 / NUMBER_OF_ARMS * (i + 1);
        arm.rotation.z = Math.PI * 0.5;
        arm.rotation.y = spreadRotation;

        arm.position.x = Math.cos(spreadRotation) * ARM.height * 0.5;

        arm.position.y = (VERTICAL_CYLINDER.height * i / NUMBER_OF_ARMS)
                            - (VERTICAL_CYLINDER.height * 0.5)
                            + (VERTICAL_CYLINDER.height * 0.5  / NUMBER_OF_ARMS);

        arm.position.z = Math.sin(-spreadRotation) * ARM.height * 0.5;

        this.arms.add(arm);
    }

    createScreen(i) {
        const geometry = new THREE.PlaneGeometry( SCREEN.width, SCREEN.height, 1 );
        const material = new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.DoubleSide } );
        let screen = new THREE.Mesh( geometry, material );

        const spreadRotation = Math.PI * 2 / NUMBER_OF_ARMS * (i + 1);

        screen.rotation.order = "YXZ";

        screen.rotation.y = spreadRotation;

        screen.rotation.z = Math.PI * 0.5;

        screen.position.x = Math.cos(spreadRotation) * SCREEN.radius * 0.5;

        screen.position.y = (VERTICAL_CYLINDER.height * i / NUMBER_OF_ARMS)
            - (VERTICAL_CYLINDER.height * 0.5)
            + (VERTICAL_CYLINDER.height * 0.5  / NUMBER_OF_ARMS);
        screen.position.y += ARM.radius;

        screen.position.z = Math.sin(-spreadRotation) * SCREEN.radius * 0.5;

        this.screens.add(screen);
    }

    createArms() {
        Array.apply(null, new Array(NUMBER_OF_ARMS)).map((_, i) => {
            this.createArm(i);
        });
    }

    createScreens() {
        Array.apply(null, new Array(NUMBER_OF_ARMS)).map((_, i) => {
            this.createScreen(i);
        });
    }

    init() {
        this.createMiddle();
        // this.createArms();
        this.createScreens();
    }

    animate(scrollPos) {
        const resetScroll = Math.abs(scrollPos - 1000);

        this.screens.children.map((screen, i) => {
            const min = SCREEN.openingBuffer * (NUMBER_OF_ARMS - i - 2);
            const max = SCREEN.openingBuffer * (NUMBER_OF_ARMS - i);

            if (min <= resetScroll && max >= resetScroll) {
                const rad = (resetScroll - min) / SCREEN.openingBuffer;
                const twist = Math.PI * 0.5;
                screen.rotation.x = Math.sin(-rad * Math.PI * 0.5) * twist;
            }
        })
    }

    render() {
        // this.main.add(this.middle);
        this.main.add(this.arms);
        this.main.add(this.screens);

        return this.main;
    }

}
