import * as React from "react";
import { toPath } from '../helpers/toPath';
import { IDictionary, IPage } from '../models';
import { Home } from './Home';
import { Video } from './Video';
import { Work } from './Work';
import { Contact } from './Contact';

function Page(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const pageList: IPage[] = [
    new Page(
        "Home",
        <Home/>
    ),
    new Page(
        "Video",
        <Video/>
    ),
    new Page(
        "Work",
        <Work/>
    ),
    new Page(
        "Contact",
        <Contact/>
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});

export { Home } from './Home';
export { Video } from './Video';
export { Work } from './Work';
export { Contact } from './Contact';
