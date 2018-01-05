import {ITechnologyLabel} from '..';
import {technologyIcon} from '../../../icons';

export const styleTechnologies: ITechnologyLabel[] = [
    {
        id     : "css3-technologies-svg",
        title  : "CSS",
        score  : 10,
        link   : "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3",
        icon: technologyIcon.css
    },
    {
        id: "svg-technologies-svg",
        title: "SVG",
        score: 8,
        link: "https://www.w3.org/standards/techs/svg#w3c_all",
        icon: technologyIcon.svg

    },
    {
        id     : "threejs-technologies-svg",
        title  : "THREE",
        score  : 9,
        link   : "https://threejs.org/",
        icon: technologyIcon.three
    },
];
