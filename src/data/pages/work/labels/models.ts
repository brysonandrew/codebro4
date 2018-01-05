import {ILabelInfo} from '../../../models';

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

export interface IWorkLabel extends ILabelInfo {
    year: string
    color: string
    link: string
    teamType: ETeamType
    clientType: EClientType
    tech: JSX.Element[]
    description: string[]
}
