import * as THREE from 'three';
import {VERTEX_SHADER, FRAGMENT_SHADER} from '../../fixtures';
const CLUSTER_AMOUNT = 20;
const CLUSTER_RADIUS = 2;
const CLUSTER_MAX_NUMBER = 400;
const CIRCUMFERENCE = CLUSTER_MAX_NUMBER * CLUSTER_RADIUS;
const RADIUS = CIRCUMFERENCE / (Math.PI * 2);
const Y_SHIFT = 40;

export class Circle {

    particleImagePath = "/images/spark3.png";
    cluster = new THREE.Group;
    count = 0;

    addCluster() {
        const positions = new Float32Array( CLUSTER_AMOUNT * 3 );
        const colors = new Float32Array( CLUSTER_AMOUNT * 3 );
        const sizes = new Float32Array( CLUSTER_AMOUNT );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xFFFFFF );

        positions.forEach((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * CLUSTER_RADIUS;
            vertex.y = (Math.random() * 2 - 1) * CLUSTER_RADIUS;
            vertex.z = (Math.random() * 2 - 1) * CLUSTER_RADIUS;
            (vertex as any).toArray(positions, i);

            sizes[i] = 5 + 5 * Math.random() * 0.00001;

            color.setHSL(0, 1, 1);
            (color as any).toArray(colors, i * 3);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( 0xFFFFFF ) },
                texture:   { value: new THREE.TextureLoader().load( this.particleImagePath ) }
            },
            vertexShader:  VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        } );

        const cluster = new THREE.Points( geometry, material );

        cluster.position.x = Math.random() * 120 - 60;
        cluster.position.y = Math.random() * 10;
        cluster.position.z = Math.random() * 120 - 60;

        this.cluster.add(cluster);
    }

    fire() {
        this.count += 0.01;

        // if (isFiring && this.inc < INC_MAX) {
        //     this.inc += 10;
        // } else if (this.inc > INC_MIN) {
        //     this.inc -= 10;
        // }

        this.cluster.children.forEach((spark, i) => {
            spark.position.x = Math.sin(i * Math.PI * 2 / CLUSTER_MAX_NUMBER + this.count) * RADIUS;
            spark.position.z = Math.cos(i * Math.PI * 2 / CLUSTER_MAX_NUMBER + this.count) * RADIUS;
        });
    }

    animate() {
        if (this.cluster.children.length < CLUSTER_MAX_NUMBER) {
            this.addCluster();
        }
        this.fire();
    }

    render() {
        return this.cluster;
    }

}
