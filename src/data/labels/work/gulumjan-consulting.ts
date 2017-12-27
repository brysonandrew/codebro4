import {workIcon} from '../../icons/work';
import {EClientType, ETeamType} from '../index';
import {technologyIcon} from '../../icons/technology';

export const gulumjanConsultingLabel = {
    id      : 'gulumjan-work-svg',
    title   : 'Gulumjan Consulting',
    link    : 'http://www.gulumjan-consulting.de/home/de',
    color   : "#3F51B5",
    year    : "2017",
    teamType: ETeamType.Individual,
    clientType: EClientType.Individual,
    icon: workIcon.gulumjanConsulting,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.typescript,
        technologyIcon.react,
        technologyIcon.redux,
        technologyIcon.nodeJs
    ]
};
