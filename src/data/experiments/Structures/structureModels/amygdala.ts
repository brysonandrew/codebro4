import * as THREE from "three";

export const VERTICAL_CYLINDER = {
    segments: 1,
    radius: 2,
    height: 2000
};

export const ARM = {
    segments: 1,
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

const OPACITY = {
    min: 0.1,
    max: 1,
    inc: 0.02
};

export class Amygdala {

    main = new THREE.Group;
    screens = new THREE.Group;

    initiated = false;

    spreadRotation = (i: number) => Math.PI * 2 / NUMBER_OF_ARMS * (i + 1);

    createScreen(i) {
        const geometry = new THREE.PlaneGeometry( SCREEN.width, SCREEN.height, 1 );
        const material = new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.DoubleSide, transparent: true } );
        let screen = new THREE.Mesh( geometry, material );

        screen.rotation.order = "YXZ";

        screen.rotation.y = this.spreadRotation(i);

        screen.rotation.z = Math.PI * 0.5;

        screen.position.x = Math.cos(this.spreadRotation(i)) * SCREEN.radius * 0.5;

        screen.position.y = (VERTICAL_CYLINDER.height * i / NUMBER_OF_ARMS)
            - (VERTICAL_CYLINDER.height * 0.5)
            + (VERTICAL_CYLINDER.height * 0.5  / NUMBER_OF_ARMS);
        screen.position.y += ARM.radius;

        screen.position.z = Math.sin(-this.spreadRotation(i)) * SCREEN.radius * 0.5;

        this.screens.add(screen);
    }

    createScreens() {
        Array.apply(null, new Array(NUMBER_OF_ARMS)).map((_, i) => {
            this.createScreen(i);
        });
    }

    init() {
        this.createScreens();
    }

    animate(scrollPos, isAnimating) {
        // Card transitions
        const resetScroll = Math.abs(scrollPos - 1000);

        this.screens.children.map((screen, i) => {
            if (isAnimating) {
                screen.material.opacity = OPACITY.min;
            } else if (screen.material.opacity < OPACITY.max) {
                screen.material.opacity += OPACITY.inc;
            }
            const min = SCREEN.openingBuffer * (NUMBER_OF_ARMS - i - 2);
            const max = SCREEN.openingBuffer * (NUMBER_OF_ARMS - i);

            if (min <= resetScroll && max >= resetScroll) {
                const rad = (resetScroll - min) / SCREEN.openingBuffer;
                const twist = Math.PI * 0.5;
                screen.rotation.x = Math.sin(-rad * Math.PI * 0.5) * twist;
            }
        });
    }

    render() {
        this.main.add(this.screens);

        return this.main;
    }

}
