import * as React from "react";
import { Intro } from './Intro';
import { Video } from './Video';
import { Lab } from './Lab';
import { Work } from './Work';
import { Contact } from './Contact';
import { IPage, PageMaker } from '..';

export const MAIN_PAGES: IPage[] = [
    new PageMaker(
        "Intro",
        <Intro/>
    ),
    new PageMaker(
        "Lab",
        <Lab/>
    ),
    new PageMaker(
        "Video",
        <Video/>
    ),
    new PageMaker(
        "Work",
        <Work/>
    ),
    new PageMaker(
        "Contact",
        <Contact/>
    )
];

export { Intro };
export { Video };
export { Lab };
export { Work };
export { Contact };
