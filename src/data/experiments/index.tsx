import * as React from "react";
import { observer } from 'mobx-react';
import { MascotControls } from './Mascot';
import { Hamburgers } from './Hamburgers';
import { Loaders } from './Loaders';
import { PageMaker, IPage, IInlineStyles, IDictionary, arrayToDictionary, colors } from '..';
import { InternalLink, UnderlineSwitch } from '../../widgets';
import { Particles, PARTICLES, PARTICLES_DICT } from './Particles';
import { Models, Amygdala, VERTICAL_CYLINDER, NUMBER_OF_ARMS, ARM, SCREEN, MODELS } from './Models';
import { TextExperiments } from './TextExperiments';
import {Buttons} from './Buttons/index';

const MENU_NAME = "Lab Menu";

@observer
export class LabMenu extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        p: {
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            minWidth: 180,
            transform: "translate(-50%, -50%)"
        }
    };

    render(): JSX.Element {
        return (
            <div style={this.STYLES.p}>
                {EXPERIMENTS.map((experiment, i) =>
                experiment.name !== MENU_NAME
                    ?   <div key={`link-${i}`}>
                            <UnderlineSwitch
                                underlineColor={colors.blk}
                            >
                                <InternalLink
                                    path={experiment.path}
                                    color={colors.blk}
                                >
                                    {experiment.name}
                                </InternalLink>
                            </UnderlineSwitch>
                        </div>
                    :   null
                )}
            </div>
        );
    }
}

export const EXPERIMENTS: IPage[] = [
    new PageMaker(
        MENU_NAME,
        <LabMenu/>
    ),
    new PageMaker(
        "Mascot",
        <MascotControls/>
    ),
    new PageMaker(
        "Hamburgers",
        <Hamburgers/>
    ),
    new PageMaker(
        "Buttons",
        <Buttons/>
    ),
    new PageMaker(
        "Loaders",
        <Loaders/>
    ),
    new PageMaker(
        "Particles",
        <Particles/>
    ),
    new PageMaker(
        "Models",
        <Models/>
    ),
    new PageMaker(
        "Text Experiments",
        <TextExperiments/>
    )
];

export const EXPERIMENTS_PATHS: string[] = EXPERIMENTS.map(experiment => experiment.path);
export const EXPERIMENTS_DICT: IDictionary<IPage> = arrayToDictionary(EXPERIMENTS, "path");

export { Particles, PARTICLES, PARTICLES_DICT, Amygdala, MascotControls, VERTICAL_CYLINDER, NUMBER_OF_ARMS, ARM, SCREEN, MODELS };
export { GrowingCircleLoader } from "./Loaders";
