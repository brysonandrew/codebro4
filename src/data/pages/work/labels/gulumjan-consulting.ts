import {workIcon} from '../../../icons/work';
import {technologyIcon} from '../../../icons/technology';
import {EClientType, ETeamType, IWorkLabel} from './models';

export const gulumjanConsultingLabel: IWorkLabel = {
    id      : 'gulumjan-work-svg',
    title   : 'Gulumjan Consulting',
    icon: workIcon.gulumjanConsulting,
    link    : 'http://www.gulumjan-consulting.de/home/de',
    year    : "2017",
    color   : "#3F51B5",
    teamType: ETeamType.Individual,
    clientType: EClientType.Individual,
    tech: [
        technologyIcon.html,
        technologyIcon.css,
        technologyIcon.typescript,
        technologyIcon.react,
        technologyIcon.redux,
        technologyIcon.nodeJs
    ],
    description: [
        "This was a truly enjoyable challenge. I was asked to make a website by a client of mine, that had been with me for 5 years. He wished to separate his business identity to his personal identity. I knew him well, as I had had almost weekly Skype conversations for the purposes of training his English. This lent itself nicely to creating his website",
        // "I thought deep and hard about the style of the site, although he didn't require anything fancy and especially didn't wish for the ostentatious, I wanted to create something beautiful but at the same time serious and direct.",
        // "Finding a nice example from awwwards.com I proceeeded to get creating",
        // "It was a huge plus that he had hired a professional photographer, allowing me to climb on the shoulders of the talents of his photographer",
        // "The end result was a clean, crisp marketing site, with animation just where it's needed",
        // "We also used the services of an excellent and simple CMS Siteleaf.com"
    ]
};
