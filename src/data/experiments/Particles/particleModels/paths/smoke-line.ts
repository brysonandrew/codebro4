import * as THREE from 'three';
import {VERTEX_SHADER, FRAGMENT_SHADER} from '../../fixtures';

const CLUSTER_AMOUNT = 40;
const CLUSTER_RADIUS = 10;
const CLUSTER_MAX_NUMBER = 400;
const SIDE_AMOUNT = CLUSTER_MAX_NUMBER * 0.25;
const SIZE = CLUSTER_MAX_NUMBER * CLUSTER_RADIUS * 0.25;
const RISE_SPEED = 0.6;
const MAX_LIFE = 2;
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

export class SmokeLine {

    particleImagePath = "/images/spark3.png";
    main = new THREE.Group;
    background = new THREE.Group;
    cluster = new THREE.Group;
    count = 0;
    isInit = false;

    init() {
        // const geometry = new THREE.PlaneGeometry( SIDE_AMOUNT, SIDE_AMOUNT, 1 );
        // const material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} );
        // let main = new THREE.Mesh( geometry, material );
        //
        // main.rotation.y = Math.PI;
        //
        // this.background.add(main);
    }

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
        cluster["randX"] = Math.random() * CLUSTER_MAX_NUMBER;
        cluster["randY"] = Math.random() * CLUSTER_MAX_NUMBER;

        this.cluster.add(cluster);
    }

    fire() {
        this.cluster.children.forEach((spark, sparkIndex) => {

            spark["life"] += 0.1;

            spark.material.opacity = spark["life"]  * 0.1;

            COORDS.map((coord, coordIndex) => {

                if (spark["life"] > SIDE_AMOUNT * coordIndex && spark["life"] < SIDE_AMOUNT * (coordIndex + 1)) {
                    spark.position.x = coord.x + spark["randX"] * coord.dx / SIDE_AMOUNT - OFFSET.x + spark["life"];
                    spark.position.y = coord.y + spark["randY"] * coord.dy / SIDE_AMOUNT + OFFSET.y + spark["life"];
                }

            });

            if (spark["life"] >= MAX_LIFE) {
                this.cluster.children.splice(1, sparkIndex);
            }

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
            this.addCluster();
        }

        if (!this.isInit) {
            this.init();
            this.isInit = true;
        }

        this.fire();
    }

    render() {
        this.main.add(this.background);
        this.main.add(this.cluster);

        return this.main;
    }

}
