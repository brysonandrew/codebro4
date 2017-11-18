import * as React from "react";
import { observer } from 'mobx-react';
import { MascotControls } from './Mascot';
import { Hamburgers } from './Hamburgers';
import { Loaders } from './Loaders';
import { PageMaker, IPage, IInlineStyles, IDictionary, arrayToDictionary, colors } from '..';
import { InternalLink, UnderlineSwitch } from '../../widgets';
import { Particles, PARTICLES, PARTICLES_DICT } from './Particles';
import { Structures, Amygdala, VERTICAL_CYLINDER, NUMBER_OF_ARMS, ARM, SCREEN } from './Structures';
import { Background } from '../background';
import { Random } from './Random';

const MENU_NAME = "Lab Menu";

@observer
export class LabMenu extends React.Component<{}, {}> {

    STYLES: IInlineStyles = {
        p: {
            position: "relative",
            textAlign: "center",
            width: "100%"
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
        "Loaders",
        <Loaders/>
    ),
    new PageMaker(
        "Particles",
        <Particles/>
    ),
    new PageMaker(
        "Structures",
        <Structures/>
    ),
    new PageMaker(
        "Background",
        <Background/>
    ),
    new PageMaker(
        "Random",
        <Random/>
    )
];

export const EXPERIMENTS_PATHS: string[] = EXPERIMENTS.map(experiment => experiment.path);
export const EXPERIMENTS_DICT: IDictionary<IPage> = arrayToDictionary(EXPERIMENTS, "path");

export { Particles, PARTICLES, PARTICLES_DICT, Amygdala, MascotControls, VERTICAL_CYLINDER, NUMBER_OF_ARMS, ARM, SCREEN };
export { GrowingCircleLoader } from "./Loaders";
