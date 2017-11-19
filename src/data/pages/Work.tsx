import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, IWork, prefixer, colors } from '..';
import { UnderlineSwitch, ExternalLink } from '../../widgets';

const MY_WORK: IWork[] = [
    {
        name: "gulumjan-consulting.de",
        link: "http://www.gulumjan-consulting.de/home/de"
    }
];

const TEAM_WORK: IWork[] = [
    {
        name: "phonetradr.com",
        link: "https://www.phonetradr.com/"
    },
    {
        name: "eventerprise.com",
        link: "https://www.eventerprise.com/"
    },
    {
        name: "urbancircus.com.au",
        link: "http://urbancircus.com.au/"
    }
];

@observer
export class Work extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        work: prefixer({
            id: "work",
            position: "absolute",
            top: "50%",
            left: "50%",
            padding: 20,
            color: colors.wht,
            transform: "translate(-50%, -50%)"
        })
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.work}>
                {MY_WORK.concat(TEAM_WORK).map((work) =>
                    <UnderlineSwitch
                        key={work.name}
                    >
                        <ExternalLink
                            path={work.link}
                        >
                            {work.name}
                        </ExternalLink>
                    </UnderlineSwitch>
                )}
            </div>
        );
    }
}
