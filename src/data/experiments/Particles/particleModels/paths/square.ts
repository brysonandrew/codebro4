import THREE = require('three');
import {VERTEX_SHADER, FRAGMENT_SHADER} from '../../fixtures';

const CLUSTER_AMOUNT = 10;
const CLUSTER_RADIUS = 2;
const CLUSTER_MAX_NUMBER = 400;
const SIDE_AMOUNT = CLUSTER_MAX_NUMBER * 0.25;
const SIZE = CLUSTER_MAX_NUMBER * CLUSTER_RADIUS * 0.25;
const OFFSET = {
    x: SIDE_AMOUNT * 0.5,
    y: SIDE_AMOUNT * 0.5,
};
const COORDS = [
    {
        x: 0,
        y: 0,
        dx: SIDE_AMOUNT,
        dy: 0
    },
    {
        x: SIDE_AMOUNT,
        y: SIDE_AMOUNT,
        dx: 0,
        dy: -SIDE_AMOUNT
    },
    {
        x: SIDE_AMOUNT * 3,
        y: -SIDE_AMOUNT,
        dx: -SIDE_AMOUNT,
        dy: 0
    },
    {
        x: 0,
        y: -SIDE_AMOUNT * 4,
        dx: 0,
        dy: SIDE_AMOUNT
    }
];

export class Square {

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
            vertexShader:   VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        } );

        const cluster = new THREE.Points( geometry, material );
        cluster["life"] = 0;

        this.cluster.add(cluster);
    }

    fire() {
        this.cluster.children.forEach((spark, sparkIndex) => {
            spark["life"]++;

            if (spark["life"] > CLUSTER_MAX_NUMBER) {
                spark["life"] = 0;
            }

            COORDS.map((coord, coordIndex) => {
                if (spark["life"] > SIDE_AMOUNT * coordIndex && spark["life"] < SIDE_AMOUNT * (coordIndex + 1)) {

                    spark.position.x = coord.x + spark["life"] * coord.dx / SIDE_AMOUNT - OFFSET.x;
                    spark.position.y = coord.y + spark["life"] * coord.dy / SIDE_AMOUNT + OFFSET.y;
                }
            });
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
