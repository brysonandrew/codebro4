import * as React from "react";
import { MascotControls } from './Mascot';
import { PageMaker, IPage, toPath, IDictionary, arrayToDictionary } from '..';

export const EXPERIMENTS: IPage[] = [
    new PageMaker(
        "Mascot",
        <MascotControls/>
    )
];

export const EXPERIMENTS_PATHS: string[] = EXPERIMENTS.map(experiment => experiment.path);
export const EXPERIMENTS_DICT: IDictionary<IPage> = arrayToDictionary(EXPERIMENTS, "path");

export { MascotControls }
