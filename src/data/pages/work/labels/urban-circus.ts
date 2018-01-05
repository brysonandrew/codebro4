import {workIcon} from '../../../icons/work';
import {technologyIcon} from '../../../icons/technology';
import {EClientType, ETeamType, IWorkLabel} from './models';

export const urbanCircusLabel = {
    id     : 'urban-circus-work-svg',
    title  : 'Urban Circus',
    link   : 'http://urbancircus.com.au/',
    color  : "#F7921E",
    year   : "2017",
    teamType: ETeamType.TwoToFive,
    clientType: EClientType.Company,
    icon: workIcon.urbanCircus,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.javascript,
        technologyIcon.react,
        technologyIcon.redux
    ],
    description: [
        "Very interesting task involving implementing correctly various libraries that dealt with panoramas and other image effects. Also tidying up ruthless attempts at programming in react from previous parties."
    ]
};
