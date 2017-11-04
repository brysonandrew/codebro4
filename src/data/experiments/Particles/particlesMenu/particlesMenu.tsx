import { toPath, IDictionary, ILabProject } from "../../../../data";
import { BasicExplosion, RandomSparks, Fire, FireBlade, Frost, Rain, Snow } from "../particleModels";

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const particlesMenuItemList: ILabProject[] = [
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

export const particlesMenuDictionary: IDictionary<ILabProject> = particlesMenuItemList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
