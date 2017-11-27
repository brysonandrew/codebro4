import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '..';
import { UnderlineSwitch, ExternalLink } from '../../widgets';
import { EmailSvg, GithubSvg, UpworkSvg, CodepenSvg, YouTubeSvg } from '../icons';

@observer
export class Contact extends React.Component<{}, {}> {

    LINKS = [
        {
            name: "andrew@codebro.io",
            path: "mailto:andrew@codebro.io",
            icon: <EmailSvg/>
        },
        {
            name: "Github",
            path: "https://github.com/brysonandrew",
            icon: <GithubSvg/>
        },
        {
            name: "Upwork",
            path: "https://www.upwork.com/o/profiles/users/_~01bbcef9fbd4ce21aa/",
            icon: <UpworkSvg/>
        },
        {
            name: "Codepen",
            path: "https://codepen.io/codebro/",
            icon: <CodepenSvg/>
        },
        {
            name: "YouTube",
            path: "https://www.youtube.com/channel/UCF1SvsAZTJL4Bw9qj0hdNLA",
            icon: <YouTubeSvg/>
        }
    ];

    STYLES: IInlineStyles = {
        contact: prefixer({
            id: "contact",
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "left",
            padding: 20,
            transform: "translate(-50%, -50%)",
            cursor: "pointer"
        }),
        icon: {
            display: "inline-block",
            verticalAlign: "middle",
            height: 32,
            width: 32,
            marginRight: 4
        },
        name: {
            display: "inline-block",
            verticalAlign: "middle",
            fontSize: 20
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.contact}>
                {this.LINKS.map(link =>
                    <UnderlineSwitch
                        key={link.name}
                    >
                        <ExternalLink
                            path={link.path}
                        >
                            <span style={this.STYLES.item}>
                                 <span style={this.STYLES.icon}>
                                    {link.icon}
                                </span>
                                <span style={this.STYLES.name}>
                                    {link.name}
                                </span>
                            </span>
                        </ExternalLink>
                    </UnderlineSwitch>
                )}
            </div>
        );
    }
}
