import { toPath, IDictionary, ILabProject } from "../../../../data";
import {Amygdala, NUMBER_OF_ARMS, VERTICAL_CYLINDER, ARM} from './amygdala';

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const STRUCTURES: ILabProject[] = [
    new Project(
        "Amygdala",
        new Amygdala
    )
];

export const STRUCTURES_DICT: IDictionary<ILabProject> = STRUCTURES.reduce((acc, curr) => {
    acc[curr.path] = curr;
    return acc;
}, {});

export {Amygdala, NUMBER_OF_ARMS, VERTICAL_CYLINDER, ARM};
