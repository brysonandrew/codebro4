import * as React from "react";

export enum ETeamType {
    Individual = "Lone Wolf",
    TwoToFive = "2 - 5",
    FiveToTen = "5 - 10"
}

export enum EClientType {
    StartUp = "Start Up",
    Company = "Company",
    Individual = "Private"
}

export interface ITechnologyLabel extends ILabelInfo {
    score: number
}

export interface IWorkLabel extends ILabelInfo {
    year: string
    color: string
    teamType: ETeamType
    clientType: EClientType
    tech: JSX.Element[]
    description: string[]
}

export interface ILabelInfo {
    id: string
    title: string
    link: string
    icon: JSX.Element
}

export {
    styleTechnologies,
    baseTechnologies,
    frontEndTechnologies,
    backEndTechnologies,
    databaseTechnologies
} from "./technology";

export {WORK_LABELS} from "./work";

export {contact} from "./contact";