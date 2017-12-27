import {EClientType, ETeamType, IWorkLabel} from '../labels';
import {svgsToIconSize} from '.';

interface IDetails {
    id: string
    name: string
    info: ETeamType | EClientType | string | JSX.Element[]
}

export const workDetails = (work: IWorkLabel): IDetails[] => {
  return [
      {
          id: "details-team",
          name: "TEAM",
          info: work.teamType
      },
      {
          id: "details-client",
          name: "CLIENT",
          info: work.clientType
      },
      {
          id: "details-time",
          name: "YEAR",
          info: work.year
      },
      {
          id: "details-tech",
          name: "TECH",
          info: svgsToIconSize(work.tech)
      }
  ];
};
