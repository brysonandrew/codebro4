import * as React from "react";
import { toPath } from '../../helpers/toPath';
import { IDictionary, IPage } from '../../models/models';
import { HomeInner } from './HomeInner';
import { OriginalsInner } from './OriginalsInner';
import { CoversInner } from './CoversInner';
import { ContactInner } from './ContactInner';

function PortfolioProject(name, backgroundImagePath, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.backgroundImagePath = backgroundImagePath;
    this.component = component;
}

const imageRoot = "/images/Home/Pages/";

export const pageList: IPage[] = [
    new PortfolioProject(
        "Home",
        `${imageRoot}/13dark.jpg`,
        <HomeInner/>
    ),
    new PortfolioProject(
        "Originals",
        "",
        <OriginalsInner/>
    ),
    new PortfolioProject(
        "Covers",
        "",
        <CoversInner/>
    ),
    new PortfolioProject(
        "Contact",
        `${imageRoot}/6dark.jpg`,
        <ContactInner/>
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
