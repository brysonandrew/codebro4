import * as React from "react";
import { Video } from './Video';
import { Experiments } from './Experiments';
import { MyWork } from './MyWork';
import { TeamWork } from './TeamWork';
import { Contact } from './Contact';
import { IPage, PageMaker, IDictionary, arrayToDictionary } from '..';

export const MAIN_PAGES: IPage[] = [
    new PageMaker(
        "Experiments",
        <Experiments/>
    ),
    new PageMaker(
        "Video",
        <Video/>
    ),
    new PageMaker(
        "My Work",
        <MyWork/>
    ),
    new PageMaker(
        "Team Work",
        <TeamWork/>
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
export { MyWork };
export { TeamWork };
export { Contact };
