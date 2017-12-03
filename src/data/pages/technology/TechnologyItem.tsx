import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IInlineStyles } from '../..';
import { ITechnology } from '.';
import { ITechnologyIconSvgInfo } from '../../icons';
import { Store } from '../../Store';

interface IProps {
    store?: Store
    techRow: ITechnology
    tech: ITechnologyIconSvgInfo
}

@inject('store')
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
            display: "block",
            position: "absolute",
            top: "50%",
            left: "50%",
            height: 32,
            transform: "translate(-50%, -50%)",
            color: this.props.techRow.backgroundColor,
            textDecoration: "none"
        },
        score: {
            position: "absolute",
            left: "20%",
            top: "calc(50% + 16px)",
            width: "60%",
            height: 2,
            background: "rgba(0,0,0, 0.22)"
        },
        scoreLabel: {
            position: "absolute",
            right: 0,
            fontSize: 12,
            color: "rgba(0,0,0, 0.22)"
        },
        scoreBar: {
            position: "absolute",
            left: 0,
            top: 0,
            height: 2,
            width: "100%",
            background: this.props.techRow.backgroundColor,
            transformOrigin: "0 0",
            transition: "transform 400ms ease 400ms"
        }
        // svg: {
        //     id: "techSvg",
        //     display: "inline-block",
        //     verticalAlign: "middle",
        //     width: 26,
        //     height: "auto"
        // }
    };

    private scoreBarScale = (): string => {
        if (this.props.store.isAwake && this.props.store.currentIndex === 0) {
            return `scaleX(${this.props.tech.score / 10})`
        } else {
            return "scaleX(0)"
        }
    };

    render(): JSX.Element {
        return (
            <div
                key={this.props.tech.id}
                style={{...this.STYLES.p, height: `

                ${100 / this.props.techRow.technologies.length}%`}}
            >
                <a
                    style={this.STYLES.info}
                    href={this.props.tech.link}
                    target="_blank"
                >
                    {this.props.tech.title}
                </a>
                <div style={this.STYLES.score}>
                    <div style={{...this.STYLES.scoreLabel, color: this.props.techRow.backgroundColor}}>
                        {this.props.tech.score}
                    </div>
                    <div style={{...this.STYLES.scoreBar, transform: this.scoreBarScale()}}/>
                </div>
            </div>
        );
    }
}
