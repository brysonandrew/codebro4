import {workIcon} from '../../icons/work';
import {EClientType, ETeamType} from '../index';
import {technologyIcon} from '../../icons/technology';

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
    ]
};
