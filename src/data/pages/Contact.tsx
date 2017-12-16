import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '..';
import { UnderlineSwitch, ExternalLink } from '../../widgets';
import { contact } from '..';

@observer
export class Contact extends React.Component<{}, {}> {

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
                {contact.map(link =>
                    <UnderlineSwitch
                        key={link.id}
                    >
                        <ExternalLink
                            path={link.link}
                        >
                            <span style={this.STYLES.item}>
                                 <span style={this.STYLES.icon}>
                                    {link.icon}
                                </span>
                                <span style={this.STYLES.name}>
                                    {link.title}
                                </span>
                            </span>
                        </ExternalLink>
                    </UnderlineSwitch>
                )}
            </div>
        );
    }
}
