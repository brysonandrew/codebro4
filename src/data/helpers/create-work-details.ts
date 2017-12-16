import {IWorkLabel} from '../labels';

export const workDetails = (work: IWorkLabel) => {
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
      }
  ];
};
