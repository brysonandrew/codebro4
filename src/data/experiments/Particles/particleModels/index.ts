import { toPath, IDictionary, ILabProject } from "../../../../data";
import {Fire, FireBlade, Frost, Rain, Snow} from "./elements";
import {BasicExplosion, RandomSparks} from "./explosions";
import {MultidirectionalBullets, VisualBullets} from "./projectiles";
import {Circle, Square, SmokeLine} from "./paths";
import {OnesAndZeros, VerticalLine} from './random';

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
    ),
    new Project(
        "Circle",
        new Circle
    ),
    new Project(
        "Square",
        new Square
    ),
    new Project(
        "Smoke Line",
        new SmokeLine
    ),
    new Project(
        "Ones And Zeros",
        new OnesAndZeros
    ),
    new Project(
        "Vertical Line",
        new VerticalLine
    )
];

export const PARTICLES_DICT: IDictionary<ILabProject> = PARTICLES.reduce((acc, curr) => {
    acc[curr.path] = curr;
    return acc;
}, {});

export {Fire, FireBlade, Frost, Rain, Snow, Square, Circle, BasicExplosion, RandomSparks, MultidirectionalBullets
    , VisualBullets};
