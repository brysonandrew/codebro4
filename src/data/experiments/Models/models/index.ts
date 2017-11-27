import { toPath, IDictionary, ILabProject } from "../../../../data";
import {Amygdala, NUMBER_OF_ARMS, VERTICAL_CYLINDER, ARM} from './amygdala';
import {PhoneImport} from './phoneImport';
import {PhoneMaker} from './phoneMaker';

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const MODELS: ILabProject[] = [
    new Project(
        "Amygdala",
        new Amygdala
    ),
    new Project(
        "Phone Import",
        new PhoneImport
    ),
    new Project(
        "Phone Maker",
        new PhoneMaker
    )
];

export const MODELS_DICT: IDictionary<ILabProject> = MODELS.reduce((acc, curr) => {
    acc[curr.path] = curr;
    return acc;
}, {});

export {Amygdala, NUMBER_OF_ARMS, VERTICAL_CYLINDER, ARM};
