import * as React from "react";
import {contactIcon} from '../../icons/contact';
import {ILabelInfo} from '../../models';

export const contact = (iconColor: string): ILabelInfo[] => [
    {
        id     : "email-contact-svg",
        title  : "Email",
        link   : "mailto:andrew@codebro.io",
        icon   : contactIcon(iconColor).email
    },
    {
        id     : "github-contact-svg",
        title  : "Github",
        link   : "https://github.com/brysonandrew",
        icon   : contactIcon(iconColor).github
    },
    {
        id     : "upwork-contact-svg",
        title  : "Upwork",
        link   : "https://www.upwork.com/o/profiles/users/_~01bbcef9fbd4ce21aa/",
        icon   : contactIcon(iconColor).upwork
    },
    {
        id     : "codepen-contact-svg",
        title  : "Codepen",
        link   : "https://codepen.io/codebro/",
        icon   : contactIcon(iconColor).codepen
    },
    {
        id     : "youtube-contact-svg",
        title  : "Youtube",
        link   : "https://www.youtube.com/channel/UCF1SvsAZTJL4Bw9qj0hdNLA",
        icon   : contactIcon(iconColor).youtube
    },
];
