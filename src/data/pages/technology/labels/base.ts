import {technologyIcon} from '../../../icons/technology';
import {ITechnologyLabel} from '..';

export const baseTechnologies: ITechnologyLabel[] = [
    {
        id     : "html5-technologies-svg",
        title  : "HTML",
        score  : 7,
        link   : "https://www.w3.org/TR/html51/",
        icon: technologyIcon.html
    },
    {
        id     : "javascript-technologies-svg",
        title  : "JavaScript",
        score  : 7,
        link   : "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        icon: technologyIcon.javascript
    },
    {
        id     : "typescript-technologies-svg",
        title  : "TypeScript",
        score  : 8,
        link   : "https://www.typescriptlang.org/",
        icon: technologyIcon.typescript
    },
    {
        id     : "heroku-technologies-svg",
        title  : "Heroku",
        score  : 6,
        link   : "https://heroku.com/",
        icon: null
    }
];
