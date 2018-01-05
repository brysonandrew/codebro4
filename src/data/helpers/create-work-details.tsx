import * as React from "react";
import {svgsToIconSize} from '.';
import {EClientType, ETeamType, IWorkLabel} from '../pages/work/labels/models';
import {ExternalLink} from '../../widgets/ExternalLink';

interface IDetails {
    id: string
    name: string
    info: ETeamType | EClientType | string | string[] | JSX.Element[] | JSX.Element
}

export const workDetails = (work: IWorkLabel): IDetails[] => {
  return [
      {
          id: "details-team",
          name: "TEAM",
          info: work.teamType
      },
      {
          id: "details-link",
          name: "LIVE LINK",
          info: <ExternalLink path={work.link}>{work.link}</ExternalLink>
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
      },
      {
          id: "details-description",
          name: "",
          info: work.description
      }
  ];
};
