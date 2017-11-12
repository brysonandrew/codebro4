import * as THREE from "three";
import {FRAGMENT_SHADER, VERTEX_SHADER} from '../../Particles/fixtures';

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

const MAX_PARTICLES = 200;

export class Amygdala {

    main = new THREE.Group;
    middle = new THREE.Group;
    arms = new THREE.Group;
    screens = new THREE.Group;

    initiated = false;
    cluster = new THREE.Group;

    addCluster() {
        const amount = 100;
        const radius = VERTICAL_CYLINDER.height * 0.5;

        const positions = new Float32Array( amount * 3 );
        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xFFFFFF );

        positions.map((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            (vertex as any).toArray(positions, i);

            sizes[i] = 20;

            color.setHSL(360 * Math.random(), 0.5, 0.5);
            (color as any).toArray(colors, i * 3);
            return vertex
        });

        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                texture:   { value: new THREE.TextureLoader().load( `/images/spark3.png` ) }
            },
            vertexShader:   VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        } );

        const cluster = new THREE.Points( geometry, material );
        this.cluster.add(cluster);
    }

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
        this.createArms();
        this.createScreens();
    }

    animate(scrollPos) {
        // Card transitions
        const resetScroll = Math.abs(scrollPos - 1000);

        this.screens.children.map((screen, i) => {
            const min = SCREEN.openingBuffer * (NUMBER_OF_ARMS - i - 2);
            const max = SCREEN.openingBuffer * (NUMBER_OF_ARMS - i);

            if (min <= resetScroll && max >= resetScroll) {
                const rad = (resetScroll - min) / SCREEN.openingBuffer;
                const twist = Math.PI * 0.5;
                screen.rotation.x = Math.sin(-rad * Math.PI * 0.5) * twist;
            }
        });

        // Particles
        // if (this.cluster.children.length < MAX_PARTICLES) {
        //     this.addCluster();
        // }
        // this.rotateParticles();
    }

    rotateParticles() {
        this.cluster.rotation.y += 0.0002;
    }

    render() {
        this.main.add(this.middle);
        this.main.add(this.arms);
        this.main.add(this.screens);
        // this.main.add(this.cluster);

        return this.main;
    }

}
