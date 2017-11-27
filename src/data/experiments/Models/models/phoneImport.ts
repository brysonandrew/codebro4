import {objectLoader} from '../../helpers/game/loaders';

export class PhoneImport {
    addToScene(scene) {
        return objectLoader("/images/models/iphone-5-3D/iphone-5s.json").then(obj => {
            obj["name"] = "models";
            scene.add(obj);
        });
    }
}
