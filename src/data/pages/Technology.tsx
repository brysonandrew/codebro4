import * as React from 'react';
import { observer } from 'mobx-react';
import { IInlineStyles, prefixer } from '..';
import {
    backEndTechnologies, baseTechnologies, databaseTechnologies, frontEndTechnologies,
    styleTechnologies
} from '../icons/technologies';
import {IIconSvgInfo} from '../icons/index';

interface ITechnology {
    name: string
    technologies: IIconSvgInfo[]
}

const WIDTH = 800;
const HEIGHT = 480;

const COLUMNS: ITechnology[][] = [
    [
        {
            name: "BASIC",
            technologies: baseTechnologies
        },
    ],
    [
        {
            name: "FRONT-END",
            technologies: frontEndTechnologies
        },
        {
            name: "BACK-END",
            technologies: backEndTechnologies
        },
    ],
    [
        {
            name: "STYLE",
            technologies: styleTechnologies
        },

        {
            name: "DATABASE",
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
        }),
        col: {
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            width: "33%",
            height: HEIGHT,
            fontSize: 15
        },
        row: {
            position: "relative"
        },
        tech: {
            position: "relative"
        },
        techRowName: {
            position: "absolute",
            left: "25%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.22
        },
        techInfo: {
            position: "absolute",
            top: "50%",
            left: "75%",
            transform: "translate(-50%, -50%)",
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                {COLUMNS.map((colTech, i) =>
                    <div
                        key={`col-${i}`}
                        style={this.STYLES.col}
                    >
                        {colTech.map((rowTech, i) =>
                            <div
                                key={rowTech.name}
                                style={{...this.STYLES.row, height: `${100 / colTech.length}%`}}
                            >
                                <div style={this.STYLES.techRowName}>
                                    {rowTech.name}
                                </div>
                                {rowTech.technologies.map(tech =>
                                    <div
                                        key={tech.id}
                                        style={{...this.STYLES.tech, height: `${100 / rowTech.technologies.length}%`}}
                                    >
                                        <div
                                            style={this.STYLES.techInfo}
                                        >
                                            {tech.title}
                                        </div>
                                    </div>)}
                            </div>)}
                    </div>)}
            </div>
        );
    }
}
