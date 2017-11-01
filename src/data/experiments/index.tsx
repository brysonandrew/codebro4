import * as React from "react";
import { MascotControls } from './Mascot';
import {toPath, IPage} from '..';

function Page(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const EXPERIMENTS: IPage[] = [
    new Page(
        "Mascot",
        <MascotControls/>
    )
];

export { MascotControls }
