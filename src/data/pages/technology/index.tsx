import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '../../';
import {
    backEndTechnologies, baseTechnologies, databaseTechnologies, frontEndTechnologies,
    styleTechnologies
} from '../../icons/technologies';
import {IIconSvgInfo} from '../../icons/index';
import {TechnologyCol} from './TechnologyCol';

export interface ITechnology {
    name: string
    backgroundColor: string
    technologies: IIconSvgInfo[]
}

const WIDTH = 800;
const HEIGHT = 480;

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

@observer
export class Technology extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        p: prefixer({
            id: "technology",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: WIDTH,
            height: HEIGHT,
            fontSize: 20,
            textAlign: "left",
            transform: "translate(-50%, -50%)"
        })
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                {COLUMNS.map((techCol, i) =>
                    <TechnologyCol
                        key={`colTech-${i}`}
                        techCol={techCol}
                    />)}
            </div>
        );
    }
}
