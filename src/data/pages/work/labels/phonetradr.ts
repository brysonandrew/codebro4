import {workIcon} from '../../../icons/work';
import {technologyIcon} from '../../../icons/technology';
import {EClientType, ETeamType, IWorkLabel} from './models';

export const phonetradrLabel = {
    id      : 'phonetradr-work-svg',
    title   : 'Phonetradr',
    link    : 'https://www.phonetradr.com/',
    color   : "#12CCAF",
    year    : "2017",
    teamType: ETeamType.TwoToFive,
    clientType: EClientType.StartUp,
    icon: workIcon.phonetrader,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.svg,
        technologyIcon.typescript,
        technologyIcon.react,
        technologyIcon.redux,
        technologyIcon.nodeJs,
        technologyIcon.mongoDb,
        technologyIcon.firebase
    ],
    description: [
        "This has been the more insteresting job so far working with a team of 5 it has been very challenging and rewarding to meet the goals of the project manager."
    ]
};
