import {ITechnologyLabel} from '../index';
import {technologyIcon} from '../../icons/technology';

export const frontEndTechnologies: ITechnologyLabel[] = [
    {
        id     : "react-technologies-svg",
        title  : "React",
        score  : 9,
        link   : "https://reactjs.org/",
        icon: technologyIcon.react

    },
    {
        id     : "redux-technologies-svg",
        title  : "Redux",
        score  : 7,
        link   : "https://github.com/reactjs/redux",
        icon: technologyIcon.redux
    },
    {
        id     : "mobx-technologies-svg",
        title  : "MobX",
        score  : 4,
        link   : "https://github.com/mobxjs/mobx",
        icon: technologyIcon.mobx
    }
];
