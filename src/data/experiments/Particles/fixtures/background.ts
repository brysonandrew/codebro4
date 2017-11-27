import * as THREE from 'three';
import { textureLoader } from "../../helpers";
const IMAGE_PATH = "/images/particles/whiteblack.jpg";

export const loadBackground = () => {
    return new Promise(resolve => {
        textureLoader( IMAGE_PATH ).then((texture) => {
            texture["mapping"] = THREE.UVMapping;
            // texture["wrapS"] = texture["wrapT"] = THREE.RepeatWrapping;
            // texture["repeat"].set(1000, 1000);

            const mesh = new THREE.Mesh(
                new THREE.SphereBufferGeometry( 1200, 32, 16 ),
                new THREE.MeshBasicMaterial( { map: texture } )
            );

            mesh.scale.y = -1;
            mesh.position.y += 800;
            resolve(mesh);
        });
    });
};
