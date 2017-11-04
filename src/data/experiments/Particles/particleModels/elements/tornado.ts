import THREE = require('three');
import {isFiring} from '../../../helpers/particles/keyboard';

export class Tornado {

    particleImagePath = "/images/spark3.png";
    cluster = new THREE.Group;
    maxLife = 400;

    addCluster() {
        const amount = 400;
        const radius = 20;

        const positions = new Float32Array( amount * 3 );
        const colors = new Float32Array( amount * 3 );
        const sizes = new Float32Array( amount );

        const vertex = new THREE.Vector3();
        const color = new THREE.Color( 0xffffff );

        positions.forEach((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius * 0.2;
            vertex.z = (Math.random() * 2 - 1) * radius;
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
                color:     { value: new THREE.Color( 0xffffff ) },
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

        cluster["life"] = 0;

        this.cluster.add(cluster);
    }

    RADIUS = 10;
    RADIUS_LOW = 50;
    RADIUS_HIGH = 160;
    THROTTLE = 0.1;
    EASE = 0.01;
    Z_FACTOR = 0.2;

    idle() {
        this.cluster.children.forEach((spark, i) => {

            if (this.RADIUS > this.RADIUS_LOW) {
                this.RADIUS -= this.EASE;
            }

            spark.position.x = Math.sin(spark["life"] * this.THROTTLE) * this.RADIUS;
            spark.position.z = Math.cos(spark["life"] * this.THROTTLE) * this.RADIUS * this.Z_FACTOR;

            if (spark["life"] === this.maxLife) {
                this.cluster.children.splice(i, 1);
            }
            spark["life"]++;
        });
    }

    fire() {
        this.cluster.children.forEach((spark, i) => {

            if (this.RADIUS < this.RADIUS_HIGH) {
                this.RADIUS += this.EASE;
            }

            spark.position.x = Math.sin(spark["life"] * this.THROTTLE) * this.RADIUS;
            spark.position.z = Math.cos(spark["life"] * this.THROTTLE) * this.RADIUS * this.Z_FACTOR;

            if (spark["life"] === this.maxLife) {
                this.cluster.children.splice(i, 1);
            }
            spark["life"]++;
        });
    }

    animate(keysPressed) {
        this.addCluster();

        if (isFiring(keysPressed)) {
            this.fire();
        } else {
            this.idle();
        }
    }

    render() {
        return this.cluster;
    }

}
