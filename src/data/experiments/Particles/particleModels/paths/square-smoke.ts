import THREE = require('three');
import {VERTEX_SHADER, FRAGMENT_SHADER} from '../../fixtures';

const CLUSTER_AMOUNT = 10;
const CLUSTER_RADIUS = 2;
const CLUSTER_MAX_NUMBER = 400;
const SIDE_AMOUNT = CLUSTER_MAX_NUMBER * 0.25;
const SIZE = CLUSTER_MAX_NUMBER * CLUSTER_RADIUS * 0.25;
const MAX_LIFE = 10;
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

export class SquareSmoke {

    particleImagePath = "/images/spark3.png";
    cluster = new THREE.Group;
    count = 0;

    addCluster() {
        const positions = new Float32Array( CLUSTER_AMOUNT * 3 );
        const colors = new Float32Array( CLUSTER_AMOUNT * 3 );
        const sizes = new Float32Array( CLUSTER_AMOUNT );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0x000000 );

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
                color:     { value: new THREE.Color( 0x000000 ) },
                texture:   { value: new THREE.TextureLoader().load( this.particleImagePath ) }
            },
            vertexShader:   VERTEX_SHADER,
            fragmentShader: FRAGMENT_SHADER,
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
        } );

        let cluster = new THREE.Points( geometry, material );

        cluster["life"] = 0;
        console.log(this.cluster);

        this.cluster.add(cluster);
    }

    limit = SIDE_AMOUNT;

    fire() {
        this.count += 0.2;

        this.cluster.children.forEach((spark, sparkIndex) => {

            sparkIndex += this.count;
            if (sparkIndex > this.limit) {
                sparkIndex -= this.limit
            }

            COORDS.map((c, coordIndex) => {

                if (sparkIndex > this.limit * coordIndex && sparkIndex < this.limit * (coordIndex + 1)) {

                    spark.position.x = c.x + sparkIndex * c.dx / SIDE_AMOUNT - OFFSET.x;
                    spark.position.y = c.y + sparkIndex * c.dy / SIDE_AMOUNT + OFFSET.y + c["life"];
                }

                c["life"] += 0.1;
                if (MAX_LIFE < c["life"] ) {
                    this.cluster.splice(sparkIndex, 1)
                }

            });
        });
    }

    animate() {
        if (this.cluster.children.length < CLUSTER_MAX_NUMBER) {
            this.addCluster();
            this.addCluster();
            this.addCluster();

            this.addCluster();
            this.addCluster();
            this.addCluster();

            this.addCluster();
            this.addCluster();
            this.addCluster();
            this.addCluster();
        }
        this.fire();
    }

    render() {
        return this.cluster;
    }

}
