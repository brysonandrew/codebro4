import * as THREE from 'three';
import { FRAGMENT_SHADER, VERTEX_SHADER } from '../../fixtures';

export class Rain {

    particleImagePath = "/images/spark3.png";
    cluster = new THREE.Group;
    gravity = 0.1;
    wind = Math.random() * 0.1;

    addCluster() {
        const amount = 100;
        const radius = 10;

        const positions = new Float32Array( amount * 3 );
        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xF0F8FF );

        positions.forEach((_, i) => {
            vertex.x = 0;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = 0;
            (vertex as any).toArray(positions, i);

            sizes[i] = 2 + 2 * Math.random();

            (color as any).toArray(colors, i * 3);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        const material = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( 0xF0F8FF ) },
                texture:   { value: new THREE.TextureLoader().load( this.particleImagePath ) }
            },
            vertexShader:   VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        } );

        const cluster = new THREE.Points( geometry, material );

        cluster.position.x = Math.random() * 240;
        cluster.position.y = 60;
        cluster.position.z = Math.random() * 240;

        cluster["life"] = 0;

        this.cluster.add(cluster);
    }

    fire() {

        this.cluster.children.forEach((spark, i) => {

            spark.position.x += spark["life"] * this.wind;
            spark.position.y -= spark["life"] * this.gravity;
            spark.position.z += spark["life"] * this.wind;

            if (spark["life"] === 50) {
                this.cluster.children.splice(i, 1);
            }

            spark["life"]++;
        });
    }

    animate() {
        this.addCluster();
        this.addCluster();
        this.addCluster();

        this.fire();
    }

    render() {
        return this.cluster;
    }

}
