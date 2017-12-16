import {ITechnologyLabel} from '../index';
import {technologyIcon} from '../../icons/technology';

export const databaseTechnologies: ITechnologyLabel[] = [
    {
        id     : "mongodb-technologies-svg",
        title  : "MongoDB",
        score  : 4,
        link   : "https://www.mongodb.com/",
        icon: technologyIcon.mongoDb
    },
    {
        id     : "firebase",
        title  : "Firebase",
        score  : 3,
        link   : "https://firebase.google.com/",
        icon: technologyIcon.firebase
    }
];
