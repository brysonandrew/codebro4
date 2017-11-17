import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, IWork, prefixer } from '..';
import { UnderlineSwitch, ExternalLink } from '../../widgets';

const MY_WORK: IWork[] = [
    {
        name: "porizi.com",
        link: "http://www.porizi.com/"
    },
    {
        name: "co-workz.de",
        link: "https://cb-coworking.herokuapp.com/"
    },
    {
        name: "gulumjan-consulting.de",
        link: "http://www.gulumjan-consulting.de/home/de"
    }
];

@observer
export class MyWork extends React.Component<{}, {}> {

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
                {MY_WORK.map((work) =>
                    <UnderlineSwitch
                        key={work.name}
                    >
                        <ExternalLink
                            path={work.link}
                        >
                            {work.name}
                        </ExternalLink>
                    </UnderlineSwitch>)}
            </div>
        );
    }
}
