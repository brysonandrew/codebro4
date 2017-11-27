import * as THREE from "three";
import {textureLoader} from '../../helpers/game/loaders';

export const BODY = {
    height: 24,
    width: 8,
    depth: 1
};

export class PhoneMaker {

    main = new THREE.Group;
    body = new THREE.Group;

    addToScene(scene) {
        return Promise.all([
            textureLoader('/images/models/iphone5-flat/iphone-5s-silver.png'),
            textureLoader('/images/models/iphone5-flat/iphone-5s-silver-back.png')
        ]).then((meshes) => {
            const materials = [
                new THREE.MeshPhongMaterial( { color: 0x757575 } ),
                new THREE.MeshPhongMaterial( { color: 0x757575 } ),
                new THREE.MeshPhongMaterial( { color: 0x757575 } ),
                new THREE.MeshPhongMaterial( { color: 0x757575 } ),
                new THREE.MeshPhongMaterial({
                    map: meshes[0]
                }),
                new THREE.MeshPhongMaterial({
                    map: meshes[1]
                })
            ];
            const geometry = new THREE.BoxGeometry( BODY.width, BODY.height, BODY.depth );
            this.body = new THREE.Mesh( geometry, materials );

            scene.add(this.body);
        }).catch(error => console.log(error));

    }

    animate() {
        this.body.rotation.x += 0.002;
        this.body.rotation.y += 0.001;
    }

}
