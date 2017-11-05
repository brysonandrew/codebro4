import THREE = require('three');
import {isFiring} from '../../../helpers/particles/keyboard';

const CLUSTER_AMOUNT = 500;
const CLUSTER_RADIUS = 20;
const CLUSTER_MAX_NUMBER = 100;
const CIRCUMFERENCE = CLUSTER_AMOUNT * CLUSTER_RADIUS;
const RADIUS = CIRCUMFERENCE / (Math.PI * 80);
const Y_SHIFT = 5;

const INC_MAX = 600;
const INC_MIN = 0;

export class Tornado {

    particleImagePath = "/images/spark3.png";
    cluster = new THREE.Group;
    count = 0;
    inc = INC_MIN;

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
            vertexShader:   `uniform float amplitude;
                                attribute float size;
                                attribute vec3 customColor;
                                varying vec3 vColor;
                            void main() {
                                vColor = customColor;
                                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                                gl_PointSize = size * ( 300.0 / -mvPosition.z );
                                gl_Position = projectionMatrix * mvPosition;
                            }`,
            fragmentShader: `uniform vec3 color;
                                uniform sampler2D texture;
                                varying vec3 vColor;
                            void main() {
                                gl_FragColor = vec4( color * vColor, 1.0 );
                                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
                            }`,
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

    fire(isFiring: boolean) {
        this.count += 0.01;

        if (isFiring && this.inc < INC_MAX) {
            this.inc += 10;
        } else if (this.inc > INC_MIN) {
            this.inc -= 10;
        }

        const radius = RADIUS + this.inc;

        this.cluster.children.forEach((spark, i) => {
            spark.position.x = Math.sin(i * Math.PI * 2 / CLUSTER_MAX_NUMBER + this.count) * radius;
            spark.position.y = Math.sin(i * Math.PI * 2 / CLUSTER_MAX_NUMBER + this.count * this.inc) * Y_SHIFT;
            spark.position.z = Math.cos(i * Math.PI * 2 / CLUSTER_MAX_NUMBER + this.count) * radius;
        });
    }

    animate(keysPressed) {
        if (this.cluster.children.length < CLUSTER_MAX_NUMBER) {
            this.addCluster();
        }
        this.fire(isFiring(keysPressed));
    }

    render() {
        return this.cluster;
    }

}
