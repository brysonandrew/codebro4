import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles } from '../../';
import {ITechnology} from './index';

interface IProps {
    techRow: ITechnology
    tech: any
}

@observer
export class TechnologyItem extends React.Component<IProps, {}> {

    STYLES: IInlineStyles = {
        p: {
            id: "tech",
            position: "relative",
            height: 32,
        },
        info: {
            id: "techInfo",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        },
        title: {
            id: "techTitle",
            display: "inline-block",
            verticalAlign: "middle",
            paddingRight: 5,
            lineHeight: 32
        },
        // svg: {
        //     id: "techSvg",
        //     display: "inline-block",
        //     verticalAlign: "middle",
        //     width: 26,
        //     height: "auto"
        // }
    };

    render(): JSX.Element {
        return (
            <div
                key={this.props.tech.id}
                style={{...this.STYLES.p, height: `${100 / this.props.techRow.technologies.length}%`}}
            >
                <a
                    style={{...this.STYLES.info, color: this.props.techRow.backgroundColor}}
                    href={this.props.tech.link}
                    target="_blank"
                >
                    <span
                        style={this.STYLES.title}
                    >
                        {this.props.tech.title}
                    </span>
                </a>
            </div>
        );
    }
}
