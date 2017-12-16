import * as React from "react";
import {ILabelInfo} from '.';
import {contactIcon} from '../icons/contact';

export const contact: ILabelInfo[] = [
    {
        id     : "email-contact-svg",
        title  : "Email",
        link   : "mailto:andrew@codebro.io",
        icon   : contactIcon.email
    },
    {
        id     : "github-contact-svg",
        title  : "Github",
        link   : "https://github.com/brysonandrew",
        icon   : contactIcon.github
    },
    {
        id     : "upwork-contact-svg",
        title  : "Upwork",
        link   : "https://www.upwork.com/o/profiles/users/_~01bbcef9fbd4ce21aa/",
        icon   : contactIcon.upwork
    },
    {
        id     : "codepen-contact-svg",
        title  : "Codepen",
        link   : "https://codepen.io/codebro/",
        icon   : contactIcon.codepen
    },
    {
        id     : "youtube-contact-svg",
        title  : "Youtube",
        link   : "https://www.youtube.com/channel/UCF1SvsAZTJL4Bw9qj0hdNLA",
        icon   : contactIcon.youtube
    },
];
