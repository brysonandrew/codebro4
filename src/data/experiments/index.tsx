import * as React from "react";
import { MascotControls } from './Mascot';
import { PageMaker, IPage } from '..';

export const EXPERIMENTS: IPage[] = [
    new PageMaker(
        "Mascot",
        <MascotControls/>
    )
];

export { MascotControls }
