import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, IWork, prefixer, colors } from '..';
import { UnderlineSwitch, ExternalLink } from '../../widgets';

const WORK: IWork[] = [
    {
        name: "PhoneTradr",
        link: "https://www.phonetradr.com/"
    },
    {
        name: "Gulumjan Consulting",
        link: "http://www.gulumjan-consulting.de/home/de"
    },
    {
        name: "Eventerprise",
        link: "https://www.eventerprise.com/"
    },
    {
        name: "Urban Circus",
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
            color: colors.wht,
            fontSize: 20,
            transform: "translate(-50%, -50%)"
        })
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.work}>
                {WORK.map((work) =>
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
