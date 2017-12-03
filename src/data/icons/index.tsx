import * as React from "react";

export interface ITechnologyIconSvgInfo extends IIconSvgInfo {
    score: number
}

export interface IIconSvgInfo {
    id: string
    title: string
    link: string
    content: JSX.Element
}

export {contact} from "./contact";
export {
    styleTechnologies,
    baseTechnologies,
    frontEndTechnologies,
    backEndTechnologies,
    databaseTechnologies
} from "./technologies";
