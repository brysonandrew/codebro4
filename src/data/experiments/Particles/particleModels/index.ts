import { toPath, IDictionary, ILabProject } from "../../../../data";
import {Fire, FireBlade, Frost, Rain, Snow} from "./elements";
import {BasicExplosion, RandomSparks} from "./explosions";
import {MultidirectionalBullets, VisualBullets} from "./projectiles";

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const PARTICLES: ILabProject[] = [
    new Project(
        "Basic",
        new BasicExplosion
    ),
    new Project(
        "Embers",
        new RandomSparks
    ),
    new Project(
        "Fire Blade",
        new FireBlade
    ),
    new Project(
        "Fire",
        new Fire
    ),
    new Project(
        "Snow",
        new Snow
    ),
    new Project(
        "Rain",
        new Rain
    ),
    new Project(
        "Frost",
        new Frost
    )
];

export const PARTICLES_DICT: IDictionary<ILabProject> = PARTICLES.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});

export {Fire, FireBlade, Frost, Rain, Snow};
export {BasicExplosion, RandomSparks};
export {MultidirectionalBullets, VisualBullets};
