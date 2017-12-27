import {workIcon} from '../../icons/work';
import {EClientType, ETeamType, IWorkLabel} from '../index';
import {technologyIcon} from '../../icons/technology';

export const eventerpriseLabel: IWorkLabel = {
    id     : 'eventerprise-work-svg',
    title  : 'Eventerprise',
    link   : 'https://www.eventerprise.com/',
    color  : "#0071BA",
    year   : "2016 - 2017",
    teamType: ETeamType.FiveToTen,
    clientType: EClientType.StartUp,
    icon: workIcon.eventerprise,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.javascript,
        technologyIcon.react,
        technologyIcon.redux,
        technologyIcon.nodeJs
    ]
};
