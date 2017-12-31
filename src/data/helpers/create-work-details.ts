import {EClientType, ETeamType, IWorkLabel} from '../labels';
import {svgsToIconSize} from '.';

interface IDetails {
    id: string
    name: string
    info: ETeamType | EClientType | string | JSX.Element[]
    description: string[]
}

export const workDetails = (work: IWorkLabel): IDetails[] => {
  return [
      {
          id: "details-team",
          name: "TEAM",
          info: work.teamType,
          description: work.description
      },
      {
          id: "details-client",
          name: "CLIENT",
          info: work.clientType,
          description: work.description
      },
      {
          id: "details-time",
          name: "YEAR",
          info: work.year,
          description: work.description
      },
      {
          id: "details-tech",
          name: "TECH",
          info: svgsToIconSize(work.tech),
          description: work.description
      }
  ];
};
