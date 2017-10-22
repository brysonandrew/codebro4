import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, IWork, colors } from '..';

const WORK: IWork[] = [
    {
        name: "Porizi Software",
        link: "http://www.porizi.com/"
    },
    {
        name: "Co-workz Coworking Spaces",
        link: "https://cb-coworking.herokuapp.com/"
    },
    {
        name: "Roman Gulumjan Consulting",
        link: "http://www.gulumjan-consulting.de/home/de"
    },
    {
        name: "phonetradr",
        link: "https://www.phonetradr.com/"
    }
];

@observer
export class Work extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        work: {
            id: "work",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        },
        work__link: {
            color: colors.blk,
            textDecoration: "none"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.work}>
                {WORK.map((work) =>
                    <div key={work.name}>
                        <a
                            style={this.STYLES.work__link}
                            href={work.link}
                            target="_blank"
                        >
                            {work.name}
                    </a>
                    </div>)}
            </div>
        );
    }
}
