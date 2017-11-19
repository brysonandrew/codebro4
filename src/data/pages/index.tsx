import * as React from "react";
import { Video } from './Video';
import { Experiments } from './Experiments';
import { Work } from './Work';
import { Contact } from './Contact';
import { IPage, PageMaker, IDictionary, arrayToDictionary } from '..';

export const MAIN_PAGES: IPage[] = [
    new PageMaker(
        "Selected Work",
        <Work/>
    ),
    new PageMaker(
        "codebro Labs",
        <Experiments/>
    ),
    new PageMaker(
        "codebro Tuts",
        <Video/>
    ),
    new PageMaker(
        "Contact",
        <Contact/>
    )
];

export const MAIN_PAGES_PATHS: string[] = MAIN_PAGES.map(experiment => experiment.path);
export const MAIN_PAGES_DICT: IDictionary<IPage> = arrayToDictionary(MAIN_PAGES, "path");

export { Video };
export { Experiments };
export { Work };
export { Contact };
