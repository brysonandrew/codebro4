import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '../..';
import {
    backEndTechnologies,
    baseTechnologies,
    databaseTechnologies,
    frontEndTechnologies,
    styleTechnologies
} from '../../labels/technology';
import { ITechnologyLabel } from '../../labels';
import { TechnologyCol } from './TechnologyCol';
import { Store } from '../..';

export interface ITechnology {
    name: string
    backgroundColor: string
    technologies: ITechnologyLabel[]
}

export const TECH_HEIGHT = 480;

const COLUMNS: ITechnology[][] = [
    [
        {
            name: "BASIC",
            backgroundColor: "#AB47BC",
            technologies: baseTechnologies
        },
    ],
    [
        {
            name: "FRONT-END",
            backgroundColor: "#EF5350",
            technologies: frontEndTechnologies
        },
        {
            name: "BACK-END",
            backgroundColor: "#42A5F5",
            technologies: backEndTechnologies
        },
    ],
    [
        {
            name: "STYLE",
            backgroundColor: "#EF5350",
            technologies: styleTechnologies
        },

        {
            name: "DATABASE",
            backgroundColor: "#42A5F5",
            technologies: databaseTechnologies
        }
    ]
];

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Technology extends React.Component<IProps, {}> {

    techWidth = (): number => {
        const { isMobile, isTablet } = this.props.store;
        return isMobile ? 320 : isTablet ? 600 : 800;
    };

    fontSize = (): number => {
        const { isMobile, isTablet } = this.props.store;
        return isMobile ? 12 : isTablet ? 15 : 20;
    };

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "technology",
            position: "absolute",
            top: "50%",
            left: "50%",
            height: TECH_HEIGHT,
            textAlign: "left",
            transform: "translate(-50%, -50%)"
        })
    };

    render(): JSX.Element {

        return (
            <div style={{...this.STYLES.p, width: this.techWidth(), fontSize: this.fontSize()}}>
                {COLUMNS.map((techCol, i) =>
                    <TechnologyCol
                        key={`colTech-${i}`}
                        techCol={techCol}
                    />)}
            </div>
        );
    }
}
