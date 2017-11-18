import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, IWork, prefixer } from '..';
import { UnderlineSwitch, ExternalLink } from '../../widgets';

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
export class TeamWork extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        work: prefixer({
            id: "work",
            position: "absolute",
            top: "50%",
            left: "50%",
            padding: 20,
            transform: "translate(-50%, -50%)"
        })
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.work}>
                {TEAM_WORK.map((work) =>
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