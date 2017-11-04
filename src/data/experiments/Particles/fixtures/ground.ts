import THREE = require('three');
import { loadTexture } from "../../helpers";
const IMAGE_PATH = "/images/particles/blackspotted.jpg";

export const loadGround = () => {
    return new Promise((resolve) => {
        loadTexture( IMAGE_PATH ).then((texture) => {
            // texture["wrapS"] = texture["wrapT"] = THREE.RepeatWrapping;
            // texture["anisotropy"] = 16;
            // texture["repeat"].set(4, 4);
            const geometry = new THREE.PlaneGeometry( 500, 500, 1 );
            const material = new THREE.MeshPhongMaterial( {emissive: 0x000000, map: texture} );
            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.y = -2.5;
            mesh.rotation.x = Math.PI * 1.5;
            resolve(mesh);
        });
    });

};
