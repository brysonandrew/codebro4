import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, IWork, prefixer, colors } from '..';
import { UnderlineSwitch } from '../../widgets';

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
            background: "rgba(255,255,255, 0.88)",
            transform: "translate(-50%, -50%)"
        }),
        work__title: {
            margin: 0,
            fontSize: 14
        },
        text: {
            fontSize: 24,
            fontFamily: "'Inconsolata', 'arial', sans-serif",
            color: colors.blk,
            textDecoration: "none"
        },
        work__section: {
            marginTop: 20
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.work}>
                <div>
                    <h2 style={this.STYLES.work__title}>My work</h2>
                    {MY_WORK.map((work) =>
                        <UnderlineSwitch
                            key={work.name}
                            height={1}
                            underlineColor={colors.blk}
                        >
                            <a
                                style={this.STYLES.text}
                                href={work.link}
                                target="_blank"
                            >
                                {work.name}
                            </a>
                        </UnderlineSwitch>)}
                </div>
                <div style={this.STYLES.work__section}>
                    <h2 style={this.STYLES.work__title}>Team work</h2>
                    {TEAM_WORK.map((work) =>
                        <UnderlineSwitch
                            key={work.name}
                            height={1}
                            underlineColor={colors.blk}
                        >
                            <a
                                style={this.STYLES.text}
                                href={work.link}
                                target="_blank"
                            >
                                {work.name}
                            </a>
                        </UnderlineSwitch>
                    )}
                </div>
            </div>
        );
    }
}
