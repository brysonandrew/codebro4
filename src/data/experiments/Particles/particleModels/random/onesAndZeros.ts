import THREE = require('three');
import {FRAGMENT_SHADER, VERTEX_SHADER} from '../../fixtures';
const MAX = 100;

export class OnesAndZeros {

    cluster = new THREE.Group;

    addCluster() {
        const amount = 400;
        const radius = 2400;

        const positions = new Float32Array( amount * 3 );
        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0x000000 );

        positions.map((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            (vertex as any).toArray(positions, i);

            sizes[i] = 20;

            color.setHSL(0.15 * ( i / amount ) - 0.005, 0.8, 0.6);
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
                texture:   { value: new THREE.TextureLoader().load( `/images/${this.cluster.children.length % 2 === 0 ? 1 : 0}.png` ) }
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

    rotate() {
        this.cluster.rotation.y += 0.0002;
    }

    animate() {
        if (this.cluster.children.length < MAX) {
            this.addCluster();
        }
        this.rotate();
    }

    render() {
        return this.cluster;
    }
}
