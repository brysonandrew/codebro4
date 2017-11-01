import {toPath} from '.';

export function PageMaker(name, component?) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}
