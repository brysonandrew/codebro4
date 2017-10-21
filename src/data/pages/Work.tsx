import * as React from 'react';
import { observer } from 'mobx-react';
import {IInlineStyles, IWork} from '../models';

const STYLES: IInlineStyles = {
    work: {
        id: "work",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    work__link: {
        textDecoration: "none"
    }
};

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

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div style={STYLES.work}>
                {WORK.map((work) =>
                    <div key={work.name}>
                        <a
                            style={STYLES.work__link}
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
